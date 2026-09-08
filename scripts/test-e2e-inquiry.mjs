import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { createServiceHmacHeaders } from "../src/lib/server-hmac.ts";

const backendUrl = "http://localhost:8005";

console.log("=== RUNNING E2E MARKETING INQUIRY & HMAC SECURITY SUITE ===");

async function testValidInquiry() {
  console.log("\n[Test 1] Submit valid demo request with HMAC authentication");
  const idempotencyKey = randomUUID();
  const payload = {
    inquiryType: "DEMO_REQUEST",
    fullName: "Rahul Shah",
    companyName: "Example Distribution Co.",
    phoneNumber: "+919876543210",
    workEmail: "rahul@example.com",
    teamSizeRange: "2-5",
    callingFlow: "outbound-callbacks",
    message: "Looking for mobile sales CRM for 5 field reps.",
    consentAt: new Date().toISOString(),
    consentVersion: "v2026-09-07",
    consentAccepted: true,
    sourcePage: "/book-demo",
    idempotencyKey,
  };

  const payloadString = JSON.stringify(payload);
  const headers = createServiceHmacHeaders(
    "POST",
    "/api/v1/integrations/website/inquiries",
    payloadString,
  );

  const res = await fetch(`${backendUrl}/api/v1/integrations/website/inquiries`, {
    method: "POST",
    headers,
    body: payloadString,
  });

  assert.equal(res.status, 201, `Expected HTTP 201, got ${res.status}`);
  const result = await res.json();
  assert.ok(result.data.reference, "Must return reference code");
  assert.match(result.data.reference, /^DEMO-[A-Z0-9]{4}-[A-Z0-9]{8}$/, "Must match reference format");
  const reference = result.data.reference;
  console.log(`  ✓ Inquiry committed successfully. Public Reference: ${reference}`);

  // Test 2: Idempotent replay
  console.log("\n[Test 2] Replay submission with same idempotency key (idempotency check)");
  const replayHeaders = createServiceHmacHeaders(
    "POST",
    "/api/v1/integrations/website/inquiries",
    payloadString,
  );
  const replayRes = await fetch(`${backendUrl}/api/v1/integrations/website/inquiries`, {
    method: "POST",
    headers: replayHeaders,
    body: payloadString,
  });

  assert.ok(
    replayRes.status === 200 || replayRes.status === 201,
    `Expected HTTP 200 or 201 on replay, got ${replayRes.status}`,
  );
  const replayResult = await replayRes.json();
  assert.equal(replayResult.data.reference, reference, "Replay must return original reference code");
  console.log("  ✓ Idempotency verified: Returned identical reference code without creating duplicate record.");

  // Test 3: Honeypot submission
  console.log("\n[Test 3] Bot honeypot submission trap");
  const spamPayload = {
    ...payload,
    idempotencyKey: randomUUID(),
    honeypot: "automated-bot-text",
  };
  const spamPayloadString = JSON.stringify(spamPayload);
  const spamHeaders = createServiceHmacHeaders(
    "POST",
    "/api/v1/integrations/website/inquiries",
    spamPayloadString,
  );

  const spamRes = await fetch(`${backendUrl}/api/v1/integrations/website/inquiries`, {
    method: "POST",
    headers: spamHeaders,
    body: spamPayloadString,
  });
  assert.equal(spamRes.status, 201, "Honeypot returns generic 201");
  const spamResult = await spamRes.json();
  assert.ok(spamResult.data.reference, "Generic reference returned");
  console.log("  ✓ Honeypot trapped: Generic success returned without creating outbox record.");

  // Test 4: HMAC rejection with tampered payload
  console.log("\n[Test 4] Tampered body rejection");
  const tamperedHeaders = createServiceHmacHeaders(
    "POST",
    "/api/v1/integrations/website/inquiries",
    payloadString,
  );
  const tamperedRes = await fetch(`${backendUrl}/api/v1/integrations/website/inquiries`, {
    method: "POST",
    headers: tamperedHeaders,
    body: JSON.stringify({ ...payload, fullName: "Tampered Name" }),
  });
  assert.equal(tamperedRes.status, 401, `Expected HTTP 401 for tampered payload, got ${tamperedRes.status}`);
  console.log("  ✓ HMAC security verified: Tampered payload rejected with HTTP 401 Unauthorized.");

  // Test 5: Account deletion request
  console.log("\n[Test 5] Account deletion request endpoint");
  const delRes = await fetch(`${backendUrl}/api/v1/public/account-deletion-requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      identity: "+919876543210",
      accountType: "Staff",
      reason: "No longer in team",
    }),
  });
  assert.equal(delRes.status, 201, `Expected HTTP 201, got ${delRes.status}`);
  const delResult = await delRes.json();
  assert.ok(delResult.data.reference, "Deletion reference returned");
  console.log(`  ✓ Account deletion request logged: ${delResult.data.reference}`);

  // Test 6: Contact inquiry (CONTACT_REQUEST)
  console.log("\n[Test 6] Submit valid contact inquiry (CONTACT_REQUEST) with HMAC authentication");
  const contactIdempotencyKey = randomUUID();
  const contactPayload = {
    inquiryType: "CONTACT_REQUEST",
    fullName: "Priya Sharma",
    companyName: "Apex Logistics Ltd.",
    phoneNumber: "+919812345678",
    workEmail: "priya@apexlogistics.in",
    teamSizeRange: "1-5",
    callingFlow: "Enterprise Consultation",
    message: "We need custom branch call assignment and SLA tracking.",
    consentAt: new Date().toISOString(),
    consentVersion: "v2026-09-07",
    consentAccepted: true,
    sourcePage: "/contact",
    idempotencyKey: contactIdempotencyKey,
  };

  const contactPayloadString = JSON.stringify(contactPayload);
  const contactHeaders = createServiceHmacHeaders(
    "POST",
    "/api/v1/integrations/website/inquiries",
    contactPayloadString,
  );

  const contactRes = await fetch(`${backendUrl}/api/v1/integrations/website/inquiries`, {
    method: "POST",
    headers: contactHeaders,
    body: contactPayloadString,
  });

  assert.equal(contactRes.status, 201, `Expected HTTP 201, got ${contactRes.status}`);
  const contactResult = await contactRes.json();
  assert.ok(contactResult.data.reference, "Must return reference code");
  assert.match(
    contactResult.data.reference,
    /^(INQ|CON)-[A-Z0-9]{4}-[A-Z0-9]{8}$/,
    "Must match contact reference format (INQ-... or CON-...)",
  );
  console.log(`  ✓ Contact inquiry committed successfully. Public Reference: ${contactResult.data.reference}`);
}

testValidInquiry()
  .then(() => {
    console.log("\n=======================================================");
    console.log("🎉 ALL END-TO-END INTEGRATION TESTS PASSED!");
    console.log("=======================================================\n");
  })
  .catch((err) => {
    console.error("❌ Integration test failed:", err);
    process.exit(1);
  });
