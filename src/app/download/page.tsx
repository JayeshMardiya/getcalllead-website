import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Smartphone, ShieldCheck, CheckCircle2, ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Mobile App Status | GetCallLead",
  description:
    "GetCallLead is being prepared for public mobile-store release. Request a demo to review the current product workflow.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/download",
  },
};

export default function DownloadPage() {
  const stores = [
    SITE_CONFIG.stores.android.enabled
      ? { name: "Google Play", url: SITE_CONFIG.stores.android.url }
      : null,
    SITE_CONFIG.stores.ios.enabled
      ? { name: "App Store", url: SITE_CONFIG.stores.ios.url }
      : null,
  ].filter((store): store is { name: string; url: string } => Boolean(store));

  return (
    <div className="py-12 sm:py-20 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="teal" size="md">
            Mobile Release Status
          </Badge>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
            GetCallLead Mobile Application
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            GetCallLead is being prepared for public mobile-store release. Request a demo to review the current product workflow.
          </p>
        </div>

        <div className="max-w-3xl mx-auto rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-soft-card">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <Smartphone className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Store Availability Status</h2>
              <p className="text-xs text-slate-500">Android &amp; iOS in review</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/70 p-6">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-amber-950">
                  Application Listings in Pre-Release Review
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-amber-800 leading-relaxed">
                  Download links remain disabled on the public website until verified production store listings are confirmed live on Google Play and the Apple App Store.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              What You Can Do Today
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Request a product demonstration</strong> to review the mobile calling workflow, lead assignment, and follow-up calendar with our team.
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Review published subscription pricing</strong> for 1 to 25 licensed team users with authoritative ₹149/month additional-seat pricing.
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Inspect our security architecture</strong> and workspace-scoped data access controls.
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 border-t border-slate-100 pt-8">
            <Button
              href="/book-demo"
              variant="primary"
              size="lg"
              className="flex-1 justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
            >
              <span>Request a Demo</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
            <Button
              href="/pricing"
              variant="secondary"
              size="lg"
              className="flex-1 justify-center"
            >
              View Pricing
            </Button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Organization-scoped workspace security • Operated by Invention Hill</span>
          </div>
        </div>
      </div>
    </div>
  );
}
