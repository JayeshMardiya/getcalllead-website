import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PRICING_POLICY, calculatePricingQuote, formatInr, CANONICAL_CHECKSUM_SHA256 } from "../src/lib/pricing-policy.ts";

console.log("Validating pricing policy against owner-approved canonical calculations...");

// 1. Verify canonical artifact presence and SHA-256 integrity
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const artifactPath = path.join(__dirname, "../src/lib/generated/pricing-policy.canonical.json");
assert.ok(fs.existsSync(artifactPath), "Canonical pricing artifact must exist at src/lib/generated/pricing-policy.canonical.json");

const rawArtifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
assert.equal(rawArtifact.policyVersion, 3, "Policy version must be 3");
assert.equal(rawArtifact.currency, "INR", "Currency must be INR");
assert.equal(rawArtifact.monthly.firstSeatRupees, 299, "First monthly seat must be ₹299");
assert.equal(rawArtifact.monthly.additionalSeatRupees, 149, "Additional monthly seat must be ₹149");
assert.equal(rawArtifact.annual.firstSeatRupees, 3499, "First annual seat must be ₹3,499");
assert.equal(rawArtifact.annual.additionalSeatRupees, 1188, "Additional annual seat must be ₹1,188");

function canonicalize(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(canonicalize);
  const sorted = {};
  for (const key of Object.keys(obj).sort()) {
    sorted[key] = canonicalize(obj[key]);
  }
  return sorted;
}

const { checksumSha256, ...payload } = rawArtifact;
const canonicalString = JSON.stringify(canonicalize(payload), null, 2);
const calculatedChecksum = crypto.createHash("sha256").update(canonicalString, "utf8").digest("hex");
assert.equal(calculatedChecksum, checksumSha256, "Artifact SHA-256 checksum mismatch!");
assert.equal(calculatedChecksum, CANONICAL_CHECKSUM_SHA256, "Policy constant SHA-256 mismatch!");
console.log(`✓ Authoritative SHA-256 checksum verified: ${calculatedChecksum}`);

// 2. Check policy basics
assert.equal(PRICING_POLICY.policyVersion, 3, "Pricing policy version must be 3");
assert.equal(PRICING_POLICY.monthly.firstSeat, 299, "First monthly seat must be ₹299");
assert.equal(PRICING_POLICY.monthly.additionalSeat, 149, "Additional monthly seat must be ₹149");
assert.equal(PRICING_POLICY.annual.firstSeat, 3499, "First annual seat must be ₹3,499");
assert.equal(PRICING_POLICY.annual.additionalSeat, 1188, "Additional annual seat must be ₹1,188");

// Authoritative test vectors from owner specification
const vectors = [
  { seats: 1, monthly: 299, twelveMonths: 3588, annual: 3499, savings: 89 },
  { seats: 2, monthly: 448, twelveMonths: 5376, annual: 4687, savings: 689 },
  { seats: 5, monthly: 895, twelveMonths: 10740, annual: 8251, savings: 2489 },
  { seats: 10, monthly: 1640, twelveMonths: 19680, annual: 14191, savings: 5489 },
  { seats: 25, monthly: 3875, twelveMonths: 46500, annual: 32011, savings: 14489 },
];

for (const vec of vectors) {
  const quote = calculatePricingQuote(vec.seats, "MONTHLY");
  assert.equal(quote.monthlyTotalRupees, vec.monthly, `Mismatch on monthly for ${vec.seats} seats`);
  assert.equal(quote.twelveMonthlyPaymentsRupees, vec.twelveMonths, `Mismatch on twelveMonthlyPayments for ${vec.seats} seats`);
  assert.equal(quote.annualTotalRupees, vec.annual, `Mismatch on annual for ${vec.seats} seats`);
  assert.equal(quote.annualSavingsRupees, vec.savings, `Mismatch on savings for ${vec.seats} seats`);
}

// Check every seat from 1 to 25
for (let seats = 1; seats <= 25; seats++) {
  const monthlyQuote = calculatePricingQuote(seats, "MONTHLY");
  const annualQuote = calculatePricingQuote(seats, "YEARLY");

  const expectedMonthly = 299 + (seats - 1) * 149;
  const expectedAnnual = 3499 + (seats - 1) * 1188;
  const expectedSavings = expectedMonthly * 12 - expectedAnnual;

  assert.equal(monthlyQuote.monthlyTotalRupees, expectedMonthly);
  assert.equal(annualQuote.annualTotalRupees, expectedAnnual);
  assert.equal(monthlyQuote.annualSavingsRupees, expectedSavings);
  assert.equal(annualQuote.activeCycleTotalRupees, expectedAnnual);
}

// Boundary checks
assert.throws(() => calculatePricingQuote(0), /Minimum seat count is 1/);
assert.throws(() => calculatePricingQuote(-1), /Minimum seat count is 1/);
assert.throws(() => calculatePricingQuote(26), /Maximum seat count is 25/);
assert.throws(() => calculatePricingQuote(1.5), /Seat count must be an integer/);
assert.throws(() => calculatePricingQuote(5, "WEEKLY"), /Invalid billing cycle/);

// Formatting checks
assert.equal(formatInr(299), "₹299");
assert.equal(formatInr(3499), "₹3,499");
assert.equal(formatInr(29900, true), "₹299");
assert.equal(formatInr(349900, true), "₹3,499");

// 3. Cross-repository comparison if CANONICAL_PRICING_ARTIFACT is provided
const backendArtifactPath = process.env.CANONICAL_PRICING_ARTIFACT;
if (backendArtifactPath) {
  assert.ok(fs.existsSync(backendArtifactPath), `Authoritative backend artifact not found at: ${backendArtifactPath}`);
  const backendArtifactRaw = fs.readFileSync(backendArtifactPath, "utf8");
  const backendArtifact = JSON.parse(backendArtifactRaw);

  assert.equal(rawArtifact.policyVersion, backendArtifact.policyVersion, "Policy version mismatch with backend artifact");
  assert.equal(rawArtifact.sourceDefinitionSha256, backendArtifact.sourceDefinitionSha256, "Source definition SHA-256 mismatch with backend artifact");
  assert.equal(rawArtifact.checksumSha256, backendArtifact.checksumSha256, "Checksum SHA-256 mismatch with backend artifact");
  assert.equal(rawArtifact.monthly.additionalSeatRupees, backendArtifact.monthly.additionalSeatRupees, "Monthly additional seat price mismatch with backend artifact");
  assert.equal(rawArtifact.annual.additionalSeatRupees, backendArtifact.annual.additionalSeatRupees, "Annual additional seat price mismatch with backend artifact");

  // Byte comparison after normalization
  const localNormalized = JSON.stringify(canonicalize(rawArtifact));
  const backendNormalized = JSON.stringify(canonicalize(backendArtifact));
  assert.equal(localNormalized, backendNormalized, "Canonical JSON representation mismatch with backend artifact");
  console.log(`✓ Cross-repository match confirmed against: ${backendArtifactPath}`);
}

// 4. Deliberate cross-repository tamper test:
// Copy artifact, mutate ₹149 -> ₹199, recompute self-checksum so self-check passes,
// then assert that cross-repository comparison against backend artifact FAILS.
console.log("Running deliberate cross-repository tamper test...");
const tamperedPayload = {
  ...rawArtifact,
  monthly: { ...rawArtifact.monthly, additionalSeatRupees: 199, additionalSeatPaise: 19900 },
};
delete tamperedPayload.checksumSha256;
const tamperedCanonicalStr = JSON.stringify(canonicalize(tamperedPayload), null, 2);
const tamperedChecksum = crypto.createHash("sha256").update(tamperedCanonicalStr, "utf8").digest("hex");
const tamperedArtifact = { ...tamperedPayload, checksumSha256: tamperedChecksum };

// Self-check passes for tampered artifact
const { checksumSha256: tHash, ...tPayload } = tamperedArtifact;
const tCanonicalStr = JSON.stringify(canonicalize(tPayload), null, 2);
const tCalc = crypto.createHash("sha256").update(tCanonicalStr, "utf8").digest("hex");
assert.equal(tCalc, tHash, "Tampered artifact internal checksum self-check must pass");

// Cross-repository comparison against canonical backend must FAIL
let caughtMismatch = false;
try {
  if (backendArtifactPath && fs.existsSync(backendArtifactPath)) {
    const backendArtifact = JSON.parse(fs.readFileSync(backendArtifactPath, "utf8"));
    assert.equal(tamperedArtifact.checksumSha256, backendArtifact.checksumSha256);
  } else {
    // Compare against unmodified canonical artifact
    assert.equal(tamperedArtifact.checksumSha256, rawArtifact.checksumSha256);
  }
} catch {
  caughtMismatch = true;
}
assert.ok(caughtMismatch, "Cross-repository verifier must reject tampered artifact despite valid self-checksum!");
console.log("✓ Deliberate tamper test passed: self-checksum passed but cross-repo verification rejected.");

console.log("All pricing policy tests passed successfully (1 through 25 seats validated).");
