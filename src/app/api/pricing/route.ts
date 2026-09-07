import { NextResponse } from "next/server";
import { PRICING_POLICY } from "@/lib/pricing-policy";

export function GET() {
  return NextResponse.json(PRICING_POLICY, {
    headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate=3600" },
  });
}
