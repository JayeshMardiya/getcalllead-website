import { NextRequest, NextResponse } from "next/server";

const MAX_BODY_BYTES = 8 * 1024;

export async function POST(request: NextRequest) {
  try {
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
      return NextResponse.json({ error: "Content-Type must be application/json." }, { status: 415 });
    }
    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Request body is too large." }, { status: 413 });
    }
    const body = JSON.parse(rawBody);
    const identity = body.identity?.trim();
    if (!identity || identity.length < 5 || identity.length > 191) {
      return NextResponse.json(
        { error: "Please provide a valid registered email address or phone number." },
        { status: 400 },
      );
    }
    if (!body.confirmationCheckbox) {
      return NextResponse.json({ error: "You must confirm the deletion terms." }, { status: 400 });
    }

    const backendUrl = process.env.BACKEND_API_URL?.replace(/\/$/, "");
    if (!backendUrl) {
      return NextResponse.json(
        { error: "Deletion requests are temporarily unavailable. Please email support@getcalllead.io." },
        { status: 503 },
      );
    }
    const response = await fetch(`${backendUrl}/api/v1/public/account-deletion-requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identity,
        accountType: String(body.accountType || "User").slice(0, 50),
        reason: String(body.reason || "").slice(0, 500),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`Deletion service returned ${response.status}`);
    const result = await response.json();
    const data = result?.data ?? result;

    return NextResponse.json({
      success: true,
      reference: data.reference,
      message:
        "If the information matches an account, verification and next-step instructions will be sent through the registered contact channel.",
    });
  } catch (error) {
    console.error("[DELETION REQUEST FAILED]", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json(
      { error: "We could not record the request. Please email support@getcalllead.io." },
      { status: 503 },
    );
  }
}
