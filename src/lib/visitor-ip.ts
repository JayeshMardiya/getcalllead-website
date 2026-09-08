import { createHmac, timingSafeEqual } from "node:crypto";
import { isIP } from "node:net";
import { NextRequest } from "next/server";

export const TRUSTED_VISITOR_IP_HEADER = "x-getcalllead-trusted-client-ip";
export const TRUSTED_PROXY_AUTH_HEADER = "x-getcalllead-proxy-auth";

function secretsMatch(actual: string, expected: string): boolean {
  const actualBuffer = Buffer.from(actual, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

/**
 * Normalizes IPv4, IPv6, and IPv4-mapped IPv6 strings into a canonical representation.
 */
export function normalizeIp(rawIp: string): string {
  if (!rawIp || typeof rawIp !== "string") {
    return "127.0.0.1";
  }

  let ip = rawIp.trim();

  // Strip brackets if IPv6 with port or enclosed e.g. [::1]:8080 or [::1]
  if (ip.startsWith("[") && ip.includes("]")) {
    const endBracket = ip.indexOf("]");
    ip = ip.substring(1, endBracket);
  } else if (ip.includes(":") && !ip.includes("::") && ip.split(":").length === 2) {
    // IPv4 with port: 192.168.1.1:8080
    ip = ip.split(":")[0];
  }

  // IPv4-mapped IPv6 e.g. ::ffff:192.0.2.128 -> 192.0.2.128
  const ipv4MappedPrefix = "::ffff:";
  if (ip.toLowerCase().startsWith(ipv4MappedPrefix)) {
    const potentialIpv4 = ip.slice(ipv4MappedPrefix.length);
    if (isIP(potentialIpv4) === 4) {
      return potentialIpv4;
    }
  }

  // Check valid IP
  const ipVersion = isIP(ip);
  if (ipVersion === 0) {
    return "unknown";
  }

  // Normalize IPv6 to lowercase
  if (ipVersion === 6) {
    return ip.toLowerCase();
  }

  return ip;
}

/**
 * Resolves visitor IP strictly according to proxy architecture.
 * Browser-supplied headers (x-forwarded-for, x-real-ip) are untrusted and must NOT be used
 * as authenticated client IP when behind our trusted Apache reverse proxy.
 */
export function resolveVisitorIp(request: NextRequest): string {
  const isProd = process.env.NODE_ENV === "production" || (process.env.NODE_ENV as string) === "staging";

  // In production, only headers authenticated and overwritten by the reverse proxy are accepted.
  const trustedHeaderIp = request.headers.get(TRUSTED_VISITOR_IP_HEADER);
  const proxyAuth = request.headers.get(TRUSTED_PROXY_AUTH_HEADER);
  const proxySecret = process.env.TRUSTED_PROXY_HEADER_SECRET || "";
  if (
    trustedHeaderIp &&
    proxyAuth &&
    proxySecret.length >= 32 &&
    secretsMatch(proxyAuth, proxySecret)
  ) {
    return normalizeIp(trustedHeaderIp);
  }

  if (isProd) {
    throw new Error("Authenticated trusted-proxy client IP headers are required in production.");
  }

  // Local development fallback: allow x-forwarded-for or localhost
  const devIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";
  return normalizeIp(devIp);
}

/**
 * Computes deterministic HMAC of the normalized visitor IP.
 * The raw IP is never exposed to external services or downstream APIs.
 */
export function computeVisitorIpHmac(normalizedIp: string, customSecret?: string): string {
  const isProd = process.env.NODE_ENV === "production" || (process.env.NODE_ENV as string) === "staging";
  const secret =
    customSecret ||
    process.env.IP_RATE_LIMIT_SECRET ||
    (!isProd ? process.env.WEBSITE_HMAC_SECRET || "dev-visitor-ip-hmac-salt-32chars" : "");

  if (!secret || secret.trim().length < 32) {
    if (isProd) {
      throw new Error("IP_RATE_LIMIT_SECRET must be configured with at least 32 chars in production/staging.");
    }
    return createHmac("sha256", "dev-visitor-ip-hmac-salt-32chars").update(normalizedIp, "utf8").digest("hex");
  }

  return createHmac("sha256", secret).update(normalizedIp, "utf8").digest("hex");
}
