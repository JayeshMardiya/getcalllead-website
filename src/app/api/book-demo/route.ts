import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { createServiceHmacHeaders } from "@/lib/server-hmac";
import { resolveVisitorIp, computeVisitorIpHmac } from "@/lib/visitor-ip";

const MAX_BODY_BYTES = 16 * 1024;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_PER_IP = 15;
const ipSubmissionCounters = new Map<string, { count: number; resetAt: number }>();

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

interface PublicDemoSubmission {
  fullName: string;
  companyName: string;
  phoneNumber: string;
  workEmail?: string;
  teamSizeRange: string;
  callingFlow?: string;
  message?: string;
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
  inquiryType?: "DEMO_REQUEST" | "CONTACT_REQUEST";
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type")?.toLowerCase() || "";
    if (!contentType.startsWith("application/json")) {
      return NextResponse.json(
        { error: "Content-Type must be application/json." },
        { status: 415 },
      );
    }

    const visitorIp = resolveVisitorIp(request);
    const visitorIpHmac = computeVisitorIpHmac(visitorIp);

    if (checkRateLimit(visitorIpHmac)) {
      return NextResponse.json(
        { error: "Too many requests from this network. Please try again shortly or contact support@getcalllead.io." },
        { status: 429 },
      );
    }

    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Request payload exceeds allowed limit." }, { status: 413 });
    }

    let body: PublicDemoSubmission;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Malformed JSON payload." }, { status: 400 });
    }

    // Honeypot detection: silent generic acceptance without persisting PII
    if (body.honeypot && body.honeypot.trim().length > 0) {
      return NextResponse.json(
        {
          success: true,
          reference: "REF-PROCESSED",
          message: "Your request has been received.",
        },
        { status: 201 },
      );
    }

    // Validation
    const fullName = body.fullName?.trim() || "";
    if (fullName.length < 2 || fullName.length > 120) {
      return NextResponse.json(
        { error: "Please enter your full name (2 to 120 characters)." },
        { status: 400 },
      );
    }

    const companyName = body.companyName?.trim() || "";
    if (companyName.length < 2 || companyName.length > 150) {
      return NextResponse.json(
        { error: "Please enter your company or business name." },
        { status: 400 },
      );
    }

    const phoneNumber = body.phoneNumber?.trim() || "";
    const cleanPhone = phoneNumber.replace(/[^\d+]/g, "");
    if (cleanPhone.length < 7 || cleanPhone.length > 20) {
      return NextResponse.json(
        { error: "Please provide a valid phone or WhatsApp number." },
        { status: 400 },
      );
    }

    let workEmail: string | undefined = undefined;
    if (body.workEmail && body.workEmail.trim().length > 0) {
      const email = body.workEmail.trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 191) {
        return NextResponse.json(
          { error: "Please provide a valid email address or leave it blank." },
          { status: 400 },
        );
      }
      workEmail = email;
    }

    if (!body.consentAccepted) {
      return NextResponse.json(
        { error: "Consent to receive follow-up communication is required." },
        { status: 400 },
      );
    }

    const backendUrl = process.env.BACKEND_API_URL?.replace(/\/$/, "") || "http://localhost:3000";
    const idempotencyKey = body.idempotencyKey?.trim() || randomUUID();

    const canonicalBackendPayload = {
      inquiryType: body.inquiryType || "DEMO_REQUEST",
      fullName,
      companyName,
      phoneNumber: cleanPhone,
      workEmail,
      teamSizeRange: (body.teamSizeRange || "1-5").trim().slice(0, 50),
      callingFlow: body.callingFlow ? body.callingFlow.trim().slice(0, 100) : undefined,
      message: body.message ? body.message.trim().slice(0, 1000) : undefined,
      consentAt: new Date().toISOString(),
      consentVersion: body.consentVersion || "v2026-09-07",
      consentAccepted: true,
      sourcePage: (body.sourcePage || "/book-demo").slice(0, 200),
      utmSource: body.utmSource ? body.utmSource.slice(0, 100) : undefined,
      utmMedium: body.utmMedium ? body.utmMedium.slice(0, 100) : undefined,
      utmCampaign: body.utmCampaign ? body.utmCampaign.slice(0, 100) : undefined,
      utmContent: body.utmContent ? body.utmContent.slice(0, 100) : undefined,
      utmTerm: body.utmTerm ? body.utmTerm.slice(0, 100) : undefined,
      referrerOrigin: request.headers.get("referer")?.slice(0, 255) || undefined,
      idempotencyKey,
    };

    const payloadJson = JSON.stringify(canonicalBackendPayload);
    const hmacHeaders = createServiceHmacHeaders(
      "POST",
      "/api/v1/integrations/website/inquiries",
      payloadJson,
      visitorIpHmac,
    );

    const backendResponse = await fetch(`${backendUrl}/api/v1/integrations/website/inquiries`, {
      method: "POST",
      headers: {
        ...hmacHeaders,
      },
      body: payloadJson,
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (!backendResponse.ok) {
      const errText = await backendResponse.text().catch(() => "");
      console.error(`[BACKEND INGESTION ERROR] HTTP ${backendResponse.status}: ${errText}`);
      return NextResponse.json(
        {
          error: "Inquiry service is temporarily unavailable. Please email us directly at support@getcalllead.io.",
        },
        { status: 503 },
      );
    }

    const backendResult = await backendResponse.json();
    const data = backendResult?.data ?? backendResult;

    return NextResponse.json(
      {
        success: true,
        reference: data.reference,
        inquiryType: data.inquiryType,
        message: "Your request has been received.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[INQUIRY ROUTE ERROR]", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json(
      {
        error: "Unable to submit your request at this time. Please contact support@getcalllead.io.",
      },
      { status: 503 },
    );
  }
}
