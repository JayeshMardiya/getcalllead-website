import { createHash, randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

const MAX_BODY_BYTES = 16 * 1024;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT = 8;
const counters = new Map<string, { count: number; resetAt: number }>();

interface LeadSubmission {
  name: string;
  companyName: string;
  workEmail: string;
  phone: string;
  teamSize: string;
  businessType: string;
  message?: string;
  sourcePage?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  consentAccepted: boolean;
  honeypot?: string;
}

function rateLimitKey(request: NextRequest) {
  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  return createHash("sha256").update(address).digest("hex");
}

function isRateLimited(request: NextRequest) {
  const now = Date.now();
  const key = rateLimitKey(request);
  const current = counters.get(key);
  if (!current || current.resetAt <= now) {
    if (counters.size > 10_000) {
      for (const [storedKey, counter] of counters) {
        if (counter.resetAt <= now) counters.delete(storedKey);
      }
    }
    counters.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > RATE_LIMIT;
}

function genericReference() {
  return `DEMO-${randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase()}`;
}

export async function POST(request: NextRequest) {
  try {
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
      return NextResponse.json({ error: "Content-Type must be application/json." }, { status: 415 });
    }
    if (isRateLimited(request)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Request body is too large." }, { status: 413 });
    }
    const body = JSON.parse(rawBody) as LeadSubmission;

    if (body.honeypot?.trim()) {
      return NextResponse.json(
        { success: true, reference: genericReference(), message: "Your request has been received." },
        { status: 201 },
      );
    }
    if (!body.name || body.name.trim().length < 2) {
      return NextResponse.json({ error: "Please enter a valid full name." }, { status: 400 });
    }
    const workEmail = body.workEmail?.trim().toLowerCase();
    if (!workEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail)) {
      return NextResponse.json({ error: "Please provide a valid work email address." }, { status: 400 });
    }
    if (!body.consentAccepted) {
      return NextResponse.json({ error: "Consent to process inquiry data is required." }, { status: 400 });
    }

    const backendUrl = process.env.BACKEND_API_URL?.replace(/\/$/, "");
    if (!backendUrl) {
      return NextResponse.json(
        { error: "Demo requests are temporarily unavailable. Please email sales@getcalllead.io." },
        { status: 503 },
      );
    }

    const dedupeWindow = Math.floor(Date.now() / (10 * 60 * 1000));
    const idempotencyKey = createHash("sha256")
      .update(`${workEmail}|${body.phone || ""}|${body.sourcePage || "/book-demo"}|${dedupeWindow}`)
      .digest("hex");
    const payload = {
      name: body.name.trim().slice(0, 100),
      companyName: (body.companyName || "Not specified").trim().slice(0, 100),
      workEmail,
      phone: (body.phone || "").replace(/[^\d+()\s-]/g, "").slice(0, 30),
      teamSize: (body.teamSize || "Not specified").slice(0, 50),
      businessType: (body.businessType || "General").slice(0, 50),
      message: (body.message || "").trim().slice(0, 1000),
      sourcePage: (body.sourcePage || "/book-demo").slice(0, 200),
      utmSource: (body.utmSource || "").slice(0, 100),
      utmMedium: (body.utmMedium || "").slice(0, 100),
      utmCampaign: (body.utmCampaign || "").slice(0, 100),
      consentAt: new Date().toISOString(),
    };

    const response = await fetch(`${backendUrl}/api/v1/public/website-leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Idempotency-Key": idempotencyKey },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`Lead service returned ${response.status}`);
    const result = await response.json();
    const data = result?.data ?? result;

    return NextResponse.json(
      {
        success: true,
        reference: data.reference,
        message: "Your request has been received.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[PUBLIC LEAD SUBMISSION FAILED]", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json(
      { error: "We could not record your request. Please email sales@getcalllead.io." },
      { status: 503 },
    );
  }
}
