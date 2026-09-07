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
}

/**
 * Authoritative fallback policy (Policy Version 3).
 * Must match the backend canonical source at GET /api/v1/public/subscription-pricing.
 */
export const PRICING_POLICY: SubscriptionPricingPolicy = {
  policyVersion: 3,
  effectiveAt: "2026-09-07T00:00:00.000Z",
  currency: "INR",
  country: "IN",
  minimumSeats: 1,
  maximumSeats: 25,
  monthly: {
    firstSeat: 299,
    additionalSeat: 149,
    basePriceMinor: 29_900,
    additionalUserPriceMinor: 14_900,
  },
  annual: {
    firstSeat: 3499,
    additionalSeat: 1188,
    effectiveMonthlyAdditionalSeat: 99,
    basePriceMinor: 349_900,
    additionalUserPriceMinor: 118_800,
  },
  storeAvailability: "COMING_SOON",
  purchaseAvailability: false,
  taxDisclaimer: "Taxes determined at store checkout. Store checkout is authoritative for final localized price and billing.",
  status: "ACTIVE",
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
      signal: AbortSignal.timeout(4000),
    });

    if (!response.ok) return PRICING_POLICY;
    const body = await response.json();
    const data = body?.data ?? body;

    if (data?.policyVersion === 3 && data?.monthly?.additionalSeat === 149) {
      return data as SubscriptionPricingPolicy;
    }
  } catch {
    // Fall back safely to PRICING_POLICY
  }
  return PRICING_POLICY;
}
