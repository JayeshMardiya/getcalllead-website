export const PRICING_POLICY = {
  version: 2,
  currency: "INR",
  licensedUsers: { minimum: 1, maximum: 25 },
  trial: { days: 0, eligibility: "Purchase required after registration" },
  taxTreatment: "STORE_DETERMINED",
  monthly: {
    basePriceMinor: 29_900,
    additionalUserPriceMinor: 19_900,
  },
  annual: {
    basePriceMinor: 349_900,
    additionalUserPriceMinor: 118_800,
  },
} as const;

export function formatInr(priceMinor: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: PRICING_POLICY.currency,
    maximumFractionDigits: 0,
  }).format(priceMinor / 100);
}
