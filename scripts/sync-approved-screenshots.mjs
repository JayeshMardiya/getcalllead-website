import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.resolve(__dirname, '../../../qa/evidence/captures');
const targetDir = path.resolve(__dirname, '../public/screenshots/authentic');

console.log('=== SYNCHRONIZING APPROVED CAPTURES TO WEBSITE ===');
console.log(`Source: ${sourceDir}`);
console.log(`Target: ${targetDir}`);

if (!fs.existsSync(sourceDir)) {
  console.error(`Source directory does not exist: ${sourceDir}`);
  process.exit(1);
}

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.png'));

for (const file of files) {
  const srcPath = path.join(sourceDir, file);
  const dstPath = path.join(targetDir, file);
  const content = fs.readFileSync(srcPath);
  const hash = crypto.createHash('sha256').update(content).digest('hex');
  fs.writeFileSync(dstPath, content);
  console.log(`✓ Copied ${file} [SHA-256: ${hash.slice(0, 16)}...]`);
}

console.log(`Synchronized ${files.length} authentic screenshots successfully.`);
