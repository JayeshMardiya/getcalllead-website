import React from "react";
import { Metadata } from "next";
import { PricingSection } from "@/components/marketing/PricingSection";
import { Badge } from "@/components/ui/Badge";
import { HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Plans & Pricing",
  description:
    "Explore Call Leads subscription pricing for phone-driven sales teams, including monthly, annual, and sales-assisted options.",
};

export default function PricingPage() {
  const billingFaqs = [
    {
      q: "What does Call Leads Pro include?",
      a: "Call Leads Pro includes lead capture, pipeline stages, follow-up scheduling, team assignment, call-outcome notes, and manager visibility for licensed organization users.",
    },
    {
      q: "How are subscriptions billed?",
      a: "Verified purchase options are presented through the applicable mobile store. The store checkout is authoritative for localized price, taxes, renewal date, trial eligibility, and payment terms.",
    },
    {
      q: "Are there per-user or per-organization limits?",
      a: "The current production pricing policy supports 1 to 25 licensed organization users. Contact Sales if your rollout needs a different structure.",
    },
    {
      q: "Can I cancel or change plans anytime?",
      a: "Plan changes and cancellation are handled through the store account used for purchase and take effect under that store's displayed terms. Contact support for organization-access questions before changing capacity.",
    },
  ];

  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Pricing Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="teal" size="md">
            Transparent Tiering
          </Badge>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
            Simple, predictable plans for phone-driven sales teams.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            No surprise add-ons or locked core features. Everything your team needs to capture and follow up on customer leads.
          </p>
        </div>

        {/* Pricing Cards Section */}
        <PricingSection />

        {/* Billing FAQs */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
            Billing & Subscription Questions
          </h2>
          <div className="space-y-6">
            {billingFaqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs"
              >
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-[#0E7C7A]" />
                  <span>{faq.q}</span>
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
