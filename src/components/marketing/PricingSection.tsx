import React from "react";
import { SITE_CONFIG } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Check, HelpCircle } from "lucide-react";

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0E7C7A] bg-[#E6F3F2] px-3 py-1 rounded-full border border-teal-200">
            Plans &amp; Pricing
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950">
            Simple pricing for sales teams
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Choose the billing period and licensed-user capacity that matches your team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {SITE_CONFIG.pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ${
                tier.highlighted
                  ? "border-2 border-[#0E7C7A] bg-white shadow-xl ring-4 ring-teal-500/10 scale-[1.02]"
                  : "border border-slate-200/90 bg-white shadow-soft-card hover:border-slate-300"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge variant="teal" size="md" className="shadow-xs">
                    {tier.badge}
                  </Badge>
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed min-h-[40px]">
                  {tier.description}
                </p>
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="text-2xl font-extrabold text-slate-900">{tier.priceNote}</div>
                  <p className="mt-1 text-xs text-slate-500">{tier.billingFrequency}</p>
                </div>
                <div className="mt-8 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Included capabilities
                  </span>
                  <ul className="space-y-2.5">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <Check className="h-4 w-4 shrink-0 text-[#0E7C7A] mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100">
                <Button
                  href={tier.ctaHref}
                  variant={tier.highlighted ? "primary" : "secondary"}
                  size="md"
                  className="w-full font-semibold"
                >
                  {tier.ctaLabel}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700">
            <HelpCircle className="h-4 w-4 text-[#0E7C7A]" />
            <span>Store checkout is authoritative for localized price, tax, eligibility, and renewal terms.</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Published prices use the current version-1 backend pricing policy. Purchase options appear only after the matching store and RevenueCat products are verified.
          </p>
        </div>
      </div>
    </section>
  );
}
