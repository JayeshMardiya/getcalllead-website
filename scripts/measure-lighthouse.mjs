import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, '../.lighthouse-reports');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
process.env.CHROME_PATH = chromePath;

const routes = [
  { name: 'Homepage', url: 'http://127.0.0.1:3009/' },
  { name: 'Pricing', url: 'http://127.0.0.1:3009/pricing' },
  { name: 'Request Demo', url: 'http://127.0.0.1:3009/book-demo' },
];

const profiles = [
  { name: 'mobile', flags: '--form-factor=mobile --screenEmulation.mobile=true' },
  { name: 'desktop', flags: '--preset=desktop' },
];

function median(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function formatRange(arr, decimals = 0) {
  const sorted = [...arr].sort((a, b) => a - b);
  const min = sorted[0].toFixed(decimals);
  const max = sorted[sorted.length - 1].toFixed(decimals);
  const med = median(sorted).toFixed(decimals);
  return { med, min, max, str: min === max ? `${med}` : `${med} (${min} - ${max})` };
}

console.log('======================================================================');
console.log('GETCALLLEAD LIGHTHOUSE AUTOMATED PERFORMANCE MEASUREMENT');
console.log('Machine: macOS (Apple Silicon), Chrome 152.0.7977.76');
console.log('Profiles: Mobile (throttled) & Desktop (unthrottled preset)');
console.log('Iterations: 3 runs per route/profile (reporting Median & Range)');
console.log('======================================================================\n');

const results = {};

for (const route of routes) {
  results[route.name] = {};

  for (const profile of profiles) {
    console.log(`\n--- Measuring: ${route.name} [Profile: ${profile.name.toUpperCase()}] ---`);
    const runs = [];

    for (let run = 1; run <= 3; run++) {
      const reportFile = path.join(
        outputDir,
        `${route.name.replace(/\s+/g, '_').toLowerCase()}_${profile.name}_run${run}.json`,
      );

      const cmd = `npx lighthouse "${route.url}" \
        --chrome-flags="--headless=new --no-sandbox --disable-gpu" \
        --output=json \
        --output-path="${reportFile}" \
        --only-categories=performance,accessibility,best-practices,seo \
        ${profile.flags} \
        --quiet`;

      process.stdout.write(`  Run ${run}/3... `);
      try {
        execSync(cmd, { stdio: 'pipe', encoding: 'utf8', env: process.env, timeout: 60000 });
        const report = JSON.parse(fs.readFileSync(reportFile, 'utf8'));

        const perf = Math.round((report.categories.performance?.score || 0) * 100);
        const a11y = Math.round((report.categories.accessibility?.score || 0) * 100);
        const bp = Math.round((report.categories['best-practices']?.score || 0) * 100);
        const seo = Math.round((report.categories.seo?.score || 0) * 100);

        const lcp = report.audits['largest-contentful-paint']?.numericValue || 0;
        const cls = report.audits['cumulative-layout-shift']?.numericValue || 0;
        const tbt = report.audits['total-blocking-time']?.numericValue || 0;
        const speedIndex = report.audits['speed-index']?.numericValue || 0;

        const totalBytes =
          report.audits['network-requests']?.details?.items?.reduce(
            (acc, req) => acc + (req.transferSize || 0),
            0,
          ) || 0;

        const jsBytes =
          report.audits['network-requests']?.details?.items?.reduce(
            (acc, req) => (req.resourceType === 'Script' ? acc + (req.transferSize || 0) : acc),
            0,
          ) || 0;

        runs.push({ perf, a11y, bp, seo, lcp, cls, tbt, speedIndex, totalBytes, jsBytes });
        console.log(`Done! (Score: Perf ${perf}, A11y ${a11y}, LCP ${(lcp / 1000).toFixed(2)}s, TBT ${Math.round(tbt)}ms)`);
      } catch (err) {
        console.error(`FAILED: ${err.message}`);
      }
    }

    results[route.name][profile.name] = {
      perf: formatRange(runs.map((r) => r.perf)),
      a11y: formatRange(runs.map((r) => r.a11y)),
      bp: formatRange(runs.map((r) => r.bp)),
      seo: formatRange(runs.map((r) => r.seo)),
      lcp: formatRange(runs.map((r) => r.lcp / 1000), 2),
      cls: formatRange(runs.map((r) => r.cls), 3),
      tbt: formatRange(runs.map((r) => r.tbt), 0),
      speedIndex: formatRange(runs.map((r) => r.speedIndex / 1000), 2),
      totalKb: formatRange(runs.map((r) => r.totalBytes / 1024), 1),
      jsKb: formatRange(runs.map((r) => r.jsBytes / 1024), 1),
      rawRuns: runs,
    };
  }
}

// Write summary JSON
fs.writeFileSync(path.join(outputDir, 'summary.json'), JSON.stringify(results, null, 2), 'utf8');

console.log('\n\n======================================================================');
console.log('FINAL LIGHTHOUSE PERFORMANCE & AUDIT MEASUREMENT SUMMARY TABLE');
console.log('======================================================================');

for (const [routeName, profData] of Object.entries(results)) {
  console.log(`\n### Route: ${routeName}`);
  for (const [profName, data] of Object.entries(profData)) {
    console.log(`  Profile: ${profName.toUpperCase()}`);
    console.log(`    - Lighthouse Performance: ${data.perf.str} / 100`);
    console.log(`    - Accessibility:          ${data.a11y.str} / 100`);
    console.log(`    - Best Practices:         ${data.bp.str} / 100`);
    console.log(`    - SEO:                    ${data.seo.str} / 100`);
    console.log(`    - LCP:                    ${data.lcp.str} s`);
    console.log(`    - CLS:                    ${data.cls.str}`);
    console.log(`    - Total Blocking Time:    ${data.tbt.str} ms`);
    console.log(`    - Speed Index:            ${data.speedIndex.str} s`);
    console.log(`    - Total Transfer Size:    ${data.totalKb.str} KB`);
    console.log(`    - JS Transfer Size:       ${data.jsKb.str} KB`);
  }
}
