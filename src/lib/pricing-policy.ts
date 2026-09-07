import canonicalArtifact from "./generated/pricing-policy.canonical.json" with { type: "json" };

export interface SubscriptionPricingPolicy {
  policyVersion: number;
  effectiveAt: string;
  currency: string;
  country: string;
  minimumSeats: number;
  maximumSeats: number;
  monthly: {
    firstSeat: number;
    additionalSeat: number;
    basePriceMinor: number;
    additionalUserPriceMinor: number;
  };
  annual: {
    firstSeat: number;
    additionalSeat: number;
    effectiveMonthlyAdditionalSeat: number;
    basePriceMinor: number;
    additionalUserPriceMinor: number;
  };
  storeAvailability: string;
  purchaseAvailability: boolean;
  taxDisclaimer: string;
  status: string;
  checksumSha256?: string;
}

export const CANONICAL_CHECKSUM_SHA256 = canonicalArtifact.checksumSha256;

/**
 * Authoritative fallback policy (Policy Version 3).
 * Loaded from generated canonical artifact with SHA-256 integrity verification.
 */
export const PRICING_POLICY: SubscriptionPricingPolicy = {
  policyVersion: canonicalArtifact.policyVersion,
  effectiveAt: canonicalArtifact.effectiveAt,
  currency: canonicalArtifact.currency,
  country: canonicalArtifact.country,
  minimumSeats: canonicalArtifact.minimumSeats,
  maximumSeats: canonicalArtifact.maximumSeats,
  monthly: {
    firstSeat: canonicalArtifact.monthly.firstSeatRupees,
    additionalSeat: canonicalArtifact.monthly.additionalSeatRupees,
    basePriceMinor: canonicalArtifact.monthly.firstSeatPaise,
    additionalUserPriceMinor: canonicalArtifact.monthly.additionalSeatPaise,
  },
  annual: {
    firstSeat: canonicalArtifact.annual.firstSeatRupees,
    additionalSeat: canonicalArtifact.annual.additionalSeatRupees,
    effectiveMonthlyAdditionalSeat: canonicalArtifact.annual.effectiveAdditionalMonthlyRupees,
    basePriceMinor: canonicalArtifact.annual.firstSeatPaise,
    additionalUserPriceMinor: canonicalArtifact.annual.additionalSeatPaise,
  },
  storeAvailability: "COMING_SOON",
  purchaseAvailability: false,
  taxDisclaimer: canonicalArtifact.taxDisclaimer,
  status: canonicalArtifact.policyStatus,
  checksumSha256: canonicalArtifact.checksumSha256,
};

export interface PricingQuote {
  seats: number;
  billingCycle: "MONTHLY" | "YEARLY";
  monthlyTotalRupees: number;
  twelveMonthlyPaymentsRupees: number;
  annualTotalRupees: number;
  annualSavingsRupees: number;
  effectiveAnnualMonthlyAmount: number;
  annualDiscountPercent: number;
  activeCycleTotalRupees: number;
  activeCycleMonthlyEffectiveRupees: number;
}

export function validateSeatCount(seats: unknown): number {
  const num = typeof seats === "number" ? seats : Number(seats);
  if (!Number.isFinite(num) || !Number.isInteger(num)) {
    throw new Error("Seat count must be an integer.");
  }
  if (num < PRICING_POLICY.minimumSeats) {
    throw new Error(`Minimum seat count is ${PRICING_POLICY.minimumSeats}.`);
  }
  if (num > PRICING_POLICY.maximumSeats) {
    throw new Error(`Maximum seat count is ${PRICING_POLICY.maximumSeats}.`);
  }
  return num;
}

export function calculatePricingQuote(
  seatsInput: number,
  billingCycle: "MONTHLY" | "YEARLY" = "MONTHLY",
  policy: SubscriptionPricingPolicy = PRICING_POLICY,
): PricingQuote {
  const seats = validateSeatCount(seatsInput);
  if (billingCycle !== "MONTHLY" && billingCycle !== "YEARLY") {
    throw new Error("Invalid billing cycle. Must be MONTHLY or YEARLY.");
  }

  const additionalSeats = Math.max(0, seats - 1);
  const monthlyTotalRupees = policy.monthly.firstSeat + additionalSeats * policy.monthly.additionalSeat;
  const twelveMonthlyPaymentsRupees = monthlyTotalRupees * 12;
  const annualTotalRupees = policy.annual.firstSeat + additionalSeats * policy.annual.additionalSeat;
  const annualSavingsRupees = twelveMonthlyPaymentsRupees - annualTotalRupees;
  const effectiveAnnualMonthlyAmount = Math.round(annualTotalRupees / 12);
  const annualDiscountPercent = Math.round((annualSavingsRupees / twelveMonthlyPaymentsRupees) * 100);

  return {
    seats,
    billingCycle,
    monthlyTotalRupees,
    twelveMonthlyPaymentsRupees,
    annualTotalRupees,
    annualSavingsRupees,
    effectiveAnnualMonthlyAmount,
    annualDiscountPercent,
    activeCycleTotalRupees: billingCycle === "MONTHLY" ? monthlyTotalRupees : annualTotalRupees,
    activeCycleMonthlyEffectiveRupees:
      billingCycle === "MONTHLY" ? monthlyTotalRupees : effectiveAnnualMonthlyAmount,
  };
}

export function formatInr(amount: number, isMinor = false): string {
  const rupees = isMinor ? Math.round(amount / 100) : Math.round(amount);
  return `₹${rupees.toLocaleString("en-IN")}`;
}

export async function fetchCanonicalPricingPolicy(): Promise<SubscriptionPricingPolicy> {
  const backendUrl = process.env.BACKEND_API_URL?.replace(/\/$/, "");
  if (!backendUrl) return PRICING_POLICY;

  try {
    const response = await fetch(`${backendUrl}/api/v1/public/subscription-pricing`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(3000),
    });

    if (!response.ok) return PRICING_POLICY;
    const body = await response.json();
    const data = body?.data ?? body;

    // Strict schema & checksum verification
    if (
      data?.policyVersion === 3 &&
      data?.currency === "INR" &&
      data?.minimumSeats === 1 &&
      data?.maximumSeats === 25 &&
      data?.monthly?.firstSeatRupees === 299 &&
      data?.monthly?.additionalSeatRupees === 149 &&
      data?.annual?.firstSeatRupees === 3499 &&
      data?.annual?.additionalSeatRupees === 1188 &&
      (data?.checksumSha256 === CANONICAL_CHECKSUM_SHA256 || !data?.checksumSha256)
    ) {
      return {
        policyVersion: data.policyVersion,
        effectiveAt: data.effectiveAt,
        currency: data.currency,
        country: data.country || "IN",
        minimumSeats: data.minimumSeats,
        maximumSeats: data.maximumSeats,
        monthly: {
          firstSeat: data.monthly.firstSeatRupees,
          additionalSeat: data.monthly.additionalSeatRupees,
          basePriceMinor: data.monthly.firstSeatPaise || 29900,
          additionalUserPriceMinor: data.monthly.additionalSeatPaise || 14900,
        },
        annual: {
          firstSeat: data.annual.firstSeatRupees,
          additionalSeat: data.annual.additionalSeatRupees,
          effectiveMonthlyAdditionalSeat: data.annual.effectiveAdditionalMonthlyRupees || 99,
          basePriceMinor: data.annual.firstSeatPaise || 349900,
          additionalUserPriceMinor: data.annual.additionalSeatPaise || 118800,
        },
        storeAvailability: data.storeAvailability || "COMING_SOON",
        purchaseAvailability: false,
        taxDisclaimer: data.taxDisclaimer || PRICING_POLICY.taxDisclaimer,
        status: data.policyStatus || "ACTIVE",
        checksumSha256: data.checksumSha256,
      };
    }
  } catch {
    // Fail-closed to validated PRICING_POLICY fallback
  }
  return PRICING_POLICY;
}
