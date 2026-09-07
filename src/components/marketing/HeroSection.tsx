import React from "react";
import Link from "next/link";
import { HAS_LIVE_STORE, SITE_CONFIG } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import {
  PhoneCall,
  UserCheck,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export function HeroSection() {
  const primaryCta = HAS_LIVE_STORE ? SITE_CONFIG.cta.primary : SITE_CONFIG.cta.secondary;
  const primaryHref = HAS_LIVE_STORE ? "/download" : "/book-demo";

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 lg:pt-16 lg:pb-28">
      {/* Background Subtle Gradient & Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial-gradient pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start text-left">
            {/* Category Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-teal-50/80 px-3.5 py-1.5 text-xs font-semibold text-[#0E7C7A] shadow-xs backdrop-blur-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#0E7C7A]" />
              <span>{SITE_CONFIG.hero.eyebrow}</span>
            </div>

            {/* Headline */}
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.12]">
              Turn every call into a lead you can{" "}
              <span className="text-[#0E7C7A] inline-block underline decoration-teal-300/60 decoration-wavy decoration-2">
                close.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-5 max-w-xl text-lg sm:text-xl leading-relaxed text-slate-600 font-normal">
              {SITE_CONFIG.hero.supportingText}
            </p>

            {/* Dual CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <Button
                href={primaryHref}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto shadow-md hover:shadow-lg"
              >
                <span>{primaryCta}</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
              <Button
                href={HAS_LIVE_STORE ? "/book-demo" : "/pricing"}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto border-slate-300"
              >
                {HAS_LIVE_STORE ? SITE_CONFIG.cta.secondary : "Plans & Pricing"}
              </Button>
            </div>

            {/* Trust Note */}
            <div className="mt-6 flex items-center gap-2 text-xs font-medium text-slate-500">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>{SITE_CONFIG.hero.trustNote}</span>
              <span className="text-slate-300">•</span>
              <span>
                {HAS_LIVE_STORE
                  ? "Verified store downloads available"
                  : "Download buttons appear only for verified store listings"}
              </span>
            </div>
          </div>

          {/* Right Column: Authentic Product Screenshots in Phone Frame + Surrounding Floating Context Cards */}
          <div className="lg:col-span-6 xl:col-span-5 relative flex justify-center mt-6 lg:mt-0">
            {/* Background ambient lighting */}
            <div className="absolute -inset-4 rounded-[60px] bg-gradient-to-tr from-teal-500/15 via-blue-500/10 to-slate-200/40 blur-2xl pointer-events-none" />

            <div className="relative w-full max-w-[370px]">
              {/* Device Frame with Real App Screenshot */}
              <DeviceFrame
                src="/screenshots/01-lead-overview.png"
                alt="Call Leads pipeline overview showing lead statistics and active deals"
                priority
              />

              {/* Floating Context Card 1: Incoming Lead Captured (Top Left) */}
              <div className="hidden sm:flex absolute -left-10 md:-left-16 top-10 z-20 items-center gap-3 rounded-2xl border border-slate-200/90 bg-white/95 p-3 shadow-float backdrop-blur-md transition-transform hover:-translate-y-0.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] border border-blue-100">
                  <PhoneCall className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">Lead Captured</span>
                    <span className="text-[10px] rounded-sm bg-blue-100 px-1 font-semibold text-blue-700">Call</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Rajesh Sharma • +91 98200...</p>
                </div>
              </div>

              {/* Floating Context Card 2: Lead Assigned (Top Right) */}
              <div className="hidden sm:flex absolute -right-8 md:-right-14 top-28 z-20 items-center gap-2.5 rounded-2xl border border-slate-200/90 bg-white/95 p-2.5 shadow-float backdrop-blur-md transition-transform hover:-translate-y-0.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-50 text-[#0E7C7A] border border-teal-100">
                  <UserCheck className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900">Assigned to Rep</span>
                  <p className="text-[11px] text-slate-500">Ownership: Priya Patel</p>
                </div>
              </div>

              {/* Floating Context Card 3: Follow-up Scheduled (Bottom Left) */}
              <div className="hidden sm:flex absolute -left-12 md:-left-14 bottom-24 z-20 items-center gap-3 rounded-2xl border border-slate-200/90 bg-white/95 p-3 shadow-float backdrop-blur-md transition-transform hover:-translate-y-0.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">Follow-up Due</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                  </div>
                  <p className="text-[11px] text-slate-500">Today, 3:30 PM • Proposal Review</p>
                </div>
              </div>

              {/* Floating Context Card 4: Pipeline Status Updated (Bottom Right) */}
              <div className="hidden sm:flex absolute -right-6 md:-right-12 bottom-12 z-20 items-center gap-2.5 rounded-2xl border border-slate-200/90 bg-white/95 p-2.5 shadow-float backdrop-blur-md transition-transform hover:-translate-y-0.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900">Proposal Sent</span>
                  <p className="text-[11px] font-semibold text-emerald-600">Stage Advanced</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
