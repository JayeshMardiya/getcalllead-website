import { createHash, createHmac, randomUUID } from "node:crypto";

export interface HmacHeaders {
  "x-getcalllead-key-id": string;
  "x-getcalllead-timestamp": string;
  "x-getcalllead-nonce": string;
  "x-getcalllead-visitor-ip-hmac": string;
  "x-getcalllead-signature": string;
  "Content-Type": string;
}

export function createServiceHmacHeaders(
  method: string,
  canonicalPath: string,
  bodyString: string,
  visitorIpHmac: string = createHash("sha256").update("127.0.0.1").digest("hex"),
  keyId = process.env.WEBSITE_KEY_ID || "website-v1",
): HmacHeaders {
  const isProd = process.env.NODE_ENV === "production" || (process.env.NODE_ENV as string) === "staging" || process.env.APP_ENV === "staging";
  const secret = process.env.WEBSITE_HMAC_SECRET || (!isProd ? process.env.JWT_SECRET || "getcalllead-local-development-secret" : "");

  if (!secret || secret.trim().length < 32) {
    if (isProd) {
      throw new Error("WEBSITE_HMAC_SECRET is required and must be at least 32 characters in production/staging.");
    }
    throw new Error("WEBSITE_HMAC_SECRET is not configured.");
  }

  const timestamp = Date.now().toString();
  const nonce = randomUUID();
  const bodyHash = createHash("sha256").update(bodyString, "utf8").digest("hex");
  const signPayload = `${method.toUpperCase()}\n${canonicalPath}\n${timestamp}\n${nonce}\n${visitorIpHmac}\n${bodyHash}`;
  const signature = createHmac("sha256", secret).update(signPayload, "utf8").digest("hex");

  return {
    "x-getcalllead-key-id": keyId,
    "x-getcalllead-timestamp": timestamp,
    "x-getcalllead-nonce": nonce,
    "x-getcalllead-visitor-ip-hmac": visitorIpHmac,
    "x-getcalllead-signature": signature,
    "Content-Type": "application/json",
  };
}
