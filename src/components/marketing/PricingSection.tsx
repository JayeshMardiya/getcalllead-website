import React from "react";
import { InteractivePricingCalculator } from "@/components/marketing/InteractivePricingCalculator";

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Published Subscription Pricing
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950">
            Transparent Pricing for Growing Sales Teams
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            One base license for the account owner, plus ₹149/month (or effective ₹99/month on annual billing) for each additional sales representative.
          </p>
        </div>

        <InteractivePricingCalculator />
      </div>
    </section>
  );
}
