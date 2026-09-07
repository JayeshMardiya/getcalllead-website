import { createHash, createHmac, randomUUID } from "node:crypto";

export interface HmacHeaders {
  "x-getcalllead-key-id": string;
  "x-getcalllead-timestamp": string;
  "x-getcalllead-nonce": string;
  "x-getcalllead-signature": string;
  "Content-Type": string;
}

export function createServiceHmacHeaders(
  method: string,
  canonicalPath: string,
  bodyString: string,
  keyId = "website-v1",
): HmacHeaders {
  const secret =
    process.env.WEBSITE_HMAC_SECRET ||
    process.env.JWT_SECRET ||
    "getcalllead-local-development-secret";

  const timestamp = Date.now().toString();
  const nonce = randomUUID();
  const bodyHash = createHash("sha256").update(bodyString, "utf8").digest("hex");
  const signPayload = `${method.toUpperCase()}\n${canonicalPath}\n${timestamp}\n${nonce}\n${bodyHash}`;
  const signature = createHmac("sha256", secret).update(signPayload, "utf8").digest("hex");

  return {
    "x-getcalllead-key-id": keyId,
    "x-getcalllead-timestamp": timestamp,
    "x-getcalllead-nonce": nonce,
    "x-getcalllead-signature": signature,
    "Content-Type": "application/json",
  };
}
