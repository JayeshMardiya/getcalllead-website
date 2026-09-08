import React from "react";
import Link from "next/link";
import { HAS_LIVE_STORE, SITE_CONFIG } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { ArrowRight, PhoneCall, ShieldCheck } from "lucide-react";

export function FinalCtaSection() {
  const primaryCta = HAS_LIVE_STORE ? SITE_CONFIG.cta.primary : SITE_CONFIG.cta.secondary;

  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 sm:py-28 text-white">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 bg-radial-gradient-dark pointer-events-none opacity-60" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-950/60 px-3.5 py-1.5 text-xs font-semibold text-teal-300">
          <PhoneCall className="h-3.5 w-3.5" />
          <span>Stop Losing Customer Touchpoints</span>
        </div>

        {/* Headline */}
        <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          The next sale should not disappear <br className="hidden sm:inline" />
          in your call history.
        </h2>

        {/* Supporting Line */}
        <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-slate-300">
          Organize your calls, follow up on time, and move every lead forward with the CRM designed for your phone.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            href="/book-demo"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto shadow-lg shadow-emerald-950/40 bg-emerald-700 hover:bg-emerald-800 text-white"
          >
            <span>Request a Demo</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
          <Button
            href="/support"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto bg-slate-900 text-white border-slate-700 hover:bg-slate-800"
          >
            Contact Support
          </Button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-300">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Organization-scoped access controls • Data transmitted over HTTPS</span>
        </div>
      </div>
    </section>
  );
}
