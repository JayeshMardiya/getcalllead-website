import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.headers.get("host")?.toLowerCase() === "www.getcalllead.io") {
    const canonical = request.nextUrl.clone();
    canonical.protocol = "https:";
    canonical.host = "getcalllead.io";
    return NextResponse.redirect(canonical, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
