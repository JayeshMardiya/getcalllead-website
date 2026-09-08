import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PRICING_POLICY, calculatePricingQuote, formatInr } from "../src/lib/pricing-policy.ts";
import { createServiceHmacHeaders } from "../src/lib/server-hmac.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

console.log("=== RUNNING GETCALLLEAD WEBSITE TEST SUITE ===");

// ----------------------------------------------------
// 1. Authoritative Pricing Policy Tests (1-25 seats)
// ----------------------------------------------------
console.log("\n[1] Authoritative Pricing Policy (Canonical Policy V3)");
assert.equal(PRICING_POLICY.policyVersion, 3, "Policy version must be 3");
assert.equal(PRICING_POLICY.monthly.additionalSeat, 149, "Monthly additional seat must be ₹149");
assert.equal(PRICING_POLICY.annual.additionalSeat, 1188, "Annual additional seat must be ₹1,188");
assert.equal(PRICING_POLICY.annual.effectiveMonthlyAdditionalSeat, 99, "Effective annual additional seat rate must be ₹99/month");

const benchmarks = [
  { seats: 1, monthly: 299, twelveMonths: 3588, annual: 3499, savings: 89 },
  { seats: 2, monthly: 448, twelveMonths: 5376, annual: 4687, savings: 689 },
  { seats: 5, monthly: 895, twelveMonths: 10740, annual: 8251, savings: 2489 },
  { seats: 10, monthly: 1640, twelveMonths: 19680, annual: 14191, savings: 5489 },
  { seats: 25, monthly: 3875, twelveMonths: 46500, annual: 32011, savings: 14489 },
];

for (const b of benchmarks) {
  const q = calculatePricingQuote(b.seats, "MONTHLY");
  assert.equal(q.monthlyTotalRupees, b.monthly, `Monthly total for ${b.seats} seats`);
  assert.equal(q.twelveMonthlyPaymentsRupees, b.twelveMonths, `Twelve payments for ${b.seats} seats`);
  assert.equal(q.annualTotalRupees, b.annual, `Annual total for ${b.seats} seats`);
  assert.equal(q.annualSavingsRupees, b.savings, `Annual savings for ${b.seats} seats`);
}

for (let s = 1; s <= 25; s++) {
  const m = calculatePricingQuote(s, "MONTHLY");
  const a = calculatePricingQuote(s, "YEARLY");
  const expectedMonthly = 299 + (s - 1) * 149;
  const expectedAnnual = 3499 + (s - 1) * 1188;
  assert.equal(m.monthlyTotalRupees, expectedMonthly, `Seat ${s} monthly`);
  assert.equal(a.annualTotalRupees, expectedAnnual, `Seat ${s} annual`);
  assert.equal(m.annualSavingsRupees, expectedMonthly * 12 - expectedAnnual, `Seat ${s} savings`);
}

// Boundaries
assert.throws(() => calculatePricingQuote(0), /Minimum seat count is 1/);
assert.throws(() => calculatePricingQuote(-5), /Minimum seat count is 1/);
assert.throws(() => calculatePricingQuote(26), /Maximum seat count is 25/);
assert.throws(() => calculatePricingQuote(2.5), /Seat count must be an integer/);
assert.throws(() => calculatePricingQuote(1, "BIMONTHLY"), /Invalid billing cycle/);

// Formatting
assert.equal(formatInr(299), "₹299");
assert.equal(formatInr(3499), "₹3,499");
assert.equal(formatInr(32011), "₹32,011");
console.log("  ✓ All 25 seat benchmarks, boundaries, and formatting validated.");

// ----------------------------------------------------
// 2. HMAC Service Signature Generation
// ----------------------------------------------------
console.log("\n[2] HMAC Service Signature Verification");
const previousKeyId = process.env.WEBSITE_KEY_ID;
const previousHmacSecret = process.env.WEBSITE_HMAC_SECRET;
process.env.WEBSITE_KEY_ID = "website-rotation-test";
process.env.WEBSITE_HMAC_SECRET = "website-test-secret-at-least-32-characters";
const samplePayload = JSON.stringify({ test: "inquiry", timestamp: Date.now() });
const hmacHeaders = createServiceHmacHeaders("POST", "/api/v1/integrations/website/inquiries", samplePayload);
assert.equal(hmacHeaders["x-getcalllead-key-id"], "website-rotation-test", "Configured key ID header present");
assert.ok(hmacHeaders["x-getcalllead-timestamp"], "Timestamp header present");
assert.ok(hmacHeaders["x-getcalllead-nonce"], "Nonce header present");
assert.ok(hmacHeaders["x-getcalllead-signature"], "Signature header present");
assert.equal(hmacHeaders["x-getcalllead-signature"].length, 64, "Signature is 64-char SHA256 hex");
if (previousKeyId === undefined) delete process.env.WEBSITE_KEY_ID;
else process.env.WEBSITE_KEY_ID = previousKeyId;
if (previousHmacSecret === undefined) delete process.env.WEBSITE_HMAC_SECRET;
else process.env.WEBSITE_HMAC_SECRET = previousHmacSecret;
console.log("  ✓ Server-to-server HMAC signing generated valid 64-char hex digest.");

// ----------------------------------------------------
// 3. Public-Content Negative Oracles
// ----------------------------------------------------
console.log("\n[3] Public-Content Negative Oracles");

const prohibitedStrings = [
  "Call Leads Ltd",
  "GETCALLLEAD STORE REVIEW",
  "Review Administrator",
  "Zero data sharing",
  "Encrypted Cloud Sync",
  "Encrypted multi-tenant relational storage",
  "certified cloud data centers",
  "Automatic Call Capture",
  "zero lead collision",
  "zero lost leads",
  "+1 (555)",
  "+1 202 555",
  "Sarah Jenkins",
  "v1.0.0",
];

function scanDirectory(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === "node_modules" || file === ".next" || file === ".git") continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDirectory(fullPath, fileList);
    } else if (/\.(tsx|ts|js|mjs|json|html|md)$/.test(file)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const sourceFiles = scanDirectory(path.join(rootDir, "src"));
let violationsFound = 0;

for (const filePath of sourceFiles) {
  const content = fs.readFileSync(filePath, "utf8");
  for (const prohibited of prohibitedStrings) {
    if (content.includes(prohibited)) {
      console.error(`  ❌ Prohibited string "${prohibited}" found in ${path.relative(rootDir, filePath)}`);
      violationsFound++;
    }
  }
}

assert.equal(violationsFound, 0, `Negative oracle violations found in source code: ${violationsFound}`);
console.log(`  ✓ All ${sourceFiles.length} source files checked: 0 prohibited claims or stale artifacts found.`);

// ----------------------------------------------------
// 4. Verification that Contaminated Screenshots are Physically Removed
// ----------------------------------------------------
console.log("\n[4] Screenshot Authenticity & Physical Asset Removal Verification");
const contaminatedScreenshots = [
  "01-lead-overview.png",
  "02-lead-list.png",
  "03-lead-capture.png",
  "04-lead-details.png",
  "05-follow-up-calendar.png",
  "06-team-management.png",
];

// A. Assert physical files do NOT exist in public directory
for (const shot of contaminatedScreenshots) {
  const diskPath = path.join(rootDir, "public/screenshots", shot);
  assert.ok(!fs.existsSync(diskPath), `Contaminated asset must not exist on disk: ${diskPath}`);
}
console.log("  ✓ Physical disk files confirmed deleted from public/screenshots/.");

// B. Assert source code references are 0
let screenshotRefsFound = 0;
for (const filePath of sourceFiles) {
  const content = fs.readFileSync(filePath, "utf8");
  for (const shot of contaminatedScreenshots) {
    if (content.includes(shot)) {
      console.error(`  ❌ Contaminated screenshot "${shot}" referenced in ${path.relative(rootDir, filePath)}`);
      screenshotRefsFound++;
    }
  }
}

assert.equal(screenshotRefsFound, 0, `Contaminated screenshot references found in source code: ${screenshotRefsFound}`);
console.log("  ✓ 0 contaminated store-review screenshots referenced in active UI.");

// ----------------------------------------------------
// 5. Store Gating & Status Route Verification
// ----------------------------------------------------
console.log("\n[5] Store Gating Verification");
const downloadPageContent = fs.readFileSync(path.join(rootDir, "src/app/download/page.tsx"), "utf8");
assert.ok(downloadPageContent.includes("index: false"), "Download page must have index: false");
assert.ok(downloadPageContent.includes("follow: true"), "Download page must have follow: true");
assert.ok(downloadPageContent.includes("GetCallLead is being prepared for public mobile-store release"), "Accurate truthful status wording required");

const sitemapContent = fs.readFileSync(path.join(rootDir, "src/app/sitemap.ts"), "utf8");
assert.ok(sitemapContent.includes("HAS_LIVE_STORE"), "Sitemap must gate /download behind HAS_LIVE_STORE");
console.log("  ✓ Store gating properly configured: /download has noindex, follow; omitted from sitemap when unreleased.");

console.log("\n=======================================================");
console.log("🎉 ALL WEBSITE AUTOMATED VERIFICATION CHECKS PASSED!");
console.log("=======================================================\n");
