import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetFile = path.resolve(__dirname, '../src/lib/generated/pricing-policy.canonical.json');

function canonicalizeJson(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(canonicalizeJson);
  const sorted = {};
  for (const key of Object.keys(obj).sort()) {
    sorted[key] = canonicalizeJson(obj[key]);
  }
  return sorted;
}

function computeArtifactChecksum(artifact) {
  const { checksumSha256, ...payload } = artifact;
  const canonicalString = JSON.stringify(canonicalizeJson(payload), null, 2);
  return crypto.createHash('sha256').update(canonicalString, 'utf8').digest('hex');
}

function main() {
  const sourcePath = process.argv[2];
  if (!sourcePath || !path.isAbsolute(sourcePath)) {
    console.error('Error: Must supply absolute path to authoritative backend artifact.');
    console.error('Usage: node scripts/sync-pricing-artifact.mjs <absolute-path-to-canonical-json>');
    process.exit(1);
  }

  if (!fs.existsSync(sourcePath)) {
    console.error(`Error: Source file does not exist: ${sourcePath}`);
    process.exit(1);
  }

  // Refuse dirty target worktree (except targetFile if already modified)
  try {
    const status = execSync('git status --porcelain=v2', {
      cwd: path.resolve(__dirname, '..'),
      encoding: 'utf8',
    }).trim();
    const otherDirty = status.split('\n').filter(line => line && !line.includes('pricing-policy.canonical.json') && !line.includes('sync-pricing-artifact'));
    if (otherDirty.length > 0) {
      console.error('Error: Refusing to sync into dirty worktree:\n' + otherDirty.join('\n'));
      process.exit(1);
    }
  } catch (err) {
    console.error('Error checking git status:', err.message);
    process.exit(1);
  }

  const sourceRaw = fs.readFileSync(sourcePath, 'utf8');
  const parsed = JSON.parse(sourceRaw);
  const expectedChecksum = computeArtifactChecksum(parsed);

  if (parsed.checksumSha256 !== expectedChecksum) {
    console.error(`Error: Source artifact checksum mismatch. Claimed ${parsed.checksumSha256}, calculated ${expectedChecksum}`);
    process.exit(1);
  }

  const targetDir = path.dirname(targetFile);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.writeFileSync(targetFile, sourceRaw, 'utf8');
  console.log(`✓ Synchronized pricing artifact: ${targetFile}`);
  console.log(`  Policy Version: ${parsed.policyVersion}`);
  console.log(`  Source Definition SHA-256: ${parsed.sourceDefinitionSha256}`);
  console.log(`  Checksum SHA-256: ${parsed.checksumSha256}`);
}

main();
