import React from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";
import { ConceptualWorkflowCard } from "@/components/marketing/ConceptualWorkflowCard";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 lg:pt-16 lg:pb-28">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Category Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>{SITE_CONFIG.hero.eyebrow}</span>
            </div>

            {/* Headline */}
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.12]">
              Turn phone calls into assigned leads and{" "}
              <span className="text-emerald-700 inline-block underline decoration-emerald-300/60 decoration-wavy decoration-2">
                closed deals.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-5 max-w-xl text-lg sm:text-xl leading-relaxed text-slate-600 font-normal">
              {SITE_CONFIG.hero.supportingText}
            </p>

            {/* Dual CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <Button
                href="/book-demo"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto shadow-md hover:shadow-lg bg-emerald-600 hover:bg-emerald-500 text-white"
              >
                <span>Request a Demo</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
              <Button
                href="#how-it-works"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto border-slate-300"
              >
                See How It Works
              </Button>
            </div>

            {/* Trust Note */}
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>{SITE_CONFIG.hero.trustNote}</span>
              <span className="text-slate-300">•</span>
              <span>Mobile store release in progress</span>
            </div>
          </div>

          {/* Right Column: Conceptual Workflow Illustration */}
          <div className="lg:col-span-5 relative flex justify-center mt-6 lg:mt-0">
            <ConceptualWorkflowCard />
          </div>
        </div>
      </div>
    </section>
  );
}
