import React from "react";
import { Metadata } from "next";
import { PricingSection } from "@/components/marketing/PricingSection";
import { Badge } from "@/components/ui/Badge";
import { HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Plans & Pricing | GetCallLead",
  description:
    "Explore GetCallLead subscription pricing for phone-driven sales teams. Published India list price for 1 to 25 licensed team users.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  const billingFaqs = [
    {
      q: "What does GetCallLead Pro include?",
      a: "GetCallLead Pro includes lead intake, pipeline stages, follow-up scheduling, team assignment, call-outcome notes, and manager visibility for licensed organization users.",
    },
    {
      q: "How are team seats calculated and billed?",
      a: "The account owner uses the first included license (₹299/month or ₹3,499/year). Each additional sales representative or manager costs ₹149/month (or ₹1,188/year on annual billing, which works out to an effective ₹99/month). Capacity supports 1 to 25 licensed users.",
    },
    {
      q: "When do store payments take effect?",
      a: "Published amounts represent the India list price. Once verified mobile store listings go live, store checkout is authoritative for localized price, applicable taxes, renewal dates, and payment processing.",
    },
    {
      q: "Can I upgrade or change seats later?",
      a: "Yes. Capacity can be adjusted through the mobile store subscription settings. Contact our team at support@getcalllead.io if you have questions regarding team capacity planning.",
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Pricing Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="teal" size="md">
            Authoritative Pricing
          </Badge>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
            Simple, predictable pricing for phone-driven sales teams.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Everything your sales team needs to capture call activity, assign ownership, and schedule follow-ups.
          </p>
        </div>

        {/* Pricing Cards Section with Interactive Calculator */}
        <PricingSection />

        {/* Billing FAQs */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
            Billing &amp; Subscription Questions
          </h2>
          <div className="space-y-4">
            {billingFaqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs"
              >
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-emerald-600 shrink-0" />
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
