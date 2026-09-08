import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { createServiceHmacHeaders } from "@/lib/server-hmac";
import { resolveVisitorIp, computeVisitorIpHmac } from "@/lib/visitor-ip";

const MAX_BODY_BYTES = 16 * 1024;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_PER_IP = 15;
const ipSubmissionCounters = new Map<string, { count: number; resetAt: number }>();

interface PublicContactSubmission {
  fullName: string;
  companyName: string;
  phoneNumber: string;
  workEmail?: string;
  subject?: string;
  message: string;
  sourcePage?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  consentAccepted: boolean;
  consentVersion?: string;
  idempotencyKey?: string;
  honeypot?: string;
}

function checkRateLimit(visitorIpHmac: string): boolean {
  const now = Date.now();
  const current = ipSubmissionCounters.get(visitorIpHmac);

  if (!current || current.resetAt <= now) {
    if (ipSubmissionCounters.size > 10_000) {
      for (const [key, val] of ipSubmissionCounters.entries()) {
        if (val.resetAt <= now) ipSubmissionCounters.delete(key);
      }
    }
    ipSubmissionCounters.set(visitorIpHmac, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_PER_IP;
}

export async function POST(request: NextRequest) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: "Payload exceeds allowed size limit (16KB)." },
        { status: 413 },
      );
    }

    const visitorIp = resolveVisitorIp(request);
    const visitorIpHmac = computeVisitorIpHmac(visitorIp);

    if (checkRateLimit(visitorIpHmac)) {
      return NextResponse.json(
        { error: "Too many contact requests from this connection. Please retry later." },
        { status: 429 },
      );
    }

    const rawBody = await request.text();
    let body: PublicContactSubmission;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid JSON submission format." }, { status: 400 });
    }

    // Bot trap
    if (body.honeypot && body.honeypot.trim().length > 0) {
      return NextResponse.json({
        success: true,
        reference: "CON-TRAP-BOT-FILTERED",
      });
    }

    if (!body.fullName || body.fullName.trim().length < 2) {
      return NextResponse.json({ error: "Full name is required (at least 2 characters)." }, { status: 400 });
    }
    if (!body.phoneNumber || body.phoneNumber.trim().length < 7) {
      return NextResponse.json({ error: "A valid phone number is required." }, { status: 400 });
    }
    if (!body.message || body.message.trim().length < 5) {
      return NextResponse.json({ error: "Please enter your message or question (at least 5 characters)." }, { status: 400 });
    }
    if (!body.consentAccepted) {
      return NextResponse.json({ error: "Consent to data processing is required." }, { status: 400 });
    }

    const backendUrl = (process.env.BACKEND_API_URL || "http://127.0.0.1:8005").replace(/\/$/, "");
    const idempotencyKey = body.idempotencyKey || randomUUID();

    const normalizedBackendPayload = {
      inquiryType: "CONTACT_REQUEST",
      fullName: body.fullName.trim(),
      companyName: body.companyName?.trim() || "General Contact",
      phoneNumber: body.phoneNumber.trim(),
      workEmail: body.workEmail?.trim() || undefined,
      teamSizeRange: "1-5",
      callingFlow: body.subject?.trim() || "General Inquiry",
      message: body.message.trim(),
      sourcePage: body.sourcePage || "/contact",
      utmSource: body.utmSource?.trim() || undefined,
      utmMedium: body.utmMedium?.trim() || undefined,
      utmCampaign: body.utmCampaign?.trim() || undefined,
      utmContent: body.utmContent?.trim() || undefined,
      utmTerm: body.utmTerm?.trim() || undefined,
      consentAccepted: true,
      consentVersion: body.consentVersion || "v2026-09-07",
      idempotencyKey,
      honeypot: body.honeypot || undefined,
    };

    const backendPayloadString = JSON.stringify(normalizedBackendPayload);
    const hmacHeaders = createServiceHmacHeaders(
      "POST",
      "/api/v1/integrations/website/inquiries",
      backendPayloadString,
      visitorIpHmac,
    );

    const backendResponse = await fetch(
      `${backendUrl}/api/v1/integrations/website/inquiries`,
      {
        method: "POST",
        headers: {
          ...hmacHeaders,
        },
        body: backendPayloadString,
        signal: AbortSignal.timeout(8000),
      },
    );

    const backendResult = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: backendResult.message || "Failed to persist contact inquiry." },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(
      {
        success: true,
        reference: backendResult.data?.reference || backendResult.reference,
      },
      { status: 201 },
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your contact request." },
      { status: 500 },
    );
  }
}
