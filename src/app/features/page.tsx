import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  PhoneCall,
  Calendar,
  UsersRound,
  History,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features & Workflow",
  description:
    "Explore Call Leads' mobile-first CRM features: lead capture from calls, stage pipelines, follow-up scheduling, team assignment, and manager visibility.",
};

export default function FeaturesPage() {
  const comparisonItems = [
    {
      capability: "Lead Information Storage",
      traditional: "Trapped in individual rep's personal phone dialler",
      callLeads: "Instantly saved into team's centralized mobile CRM",
    },
    {
      capability: "Lead Ownership & Assignment",
      traditional: "Unclear; leads get duplicated or forgotten",
      callLeads: "Definite single-tap assignment to designated salesperson",
    },
    {
      capability: "Follow-up Reminders",
      traditional: "Dependent on handwritten notes or memory",
      callLeads: "Calendar-synchronized notifications with Due Today/Overdue tags",
    },
    {
      capability: "Call Outcome Logging",
      traditional: "No record of conversation or next required action",
      callLeads: "Instant post-call outcome tags and timestamped history",
    },
    {
      capability: "Manager Oversight",
      traditional: "Blind until end-of-month missed revenue surprises",
      callLeads: "Live roster visibility into pending callbacks and deal velocity",
    },
    {
      capability: "Data Isolation & Security",
      traditional: "Risk of contact loss when reps change devices",
      callLeads: "Encrypted multi-tenant cloud storage with role security",
    },
  ];

  return (
    <div className="py-12 sm:py-20">
      {/* Hero Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="teal" size="md">
            Product Capabilities
          </Badge>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
            Mobile-first CRM built around every sales conversation.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Engineered for sales teams whose revenue depends on phone interactions. Every feature eliminates friction between making a call and closing a deal.
          </p>
        </div>

        {/* Deep Dive Features */}
        <div className="mt-20 space-y-24">
          {SITE_CONFIG.features.map((feature, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={feature.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                  isReversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div
                  className={`lg:col-span-6 ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <Badge variant="teal" size="sm" className="mb-3">
                    {feature.badge}
                  </Badge>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {feature.title}
                  </h2>
                  <p className="mt-4 text-base text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200/80 p-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Why it matters
                    </span>
                    <p className="mt-1 text-sm font-medium text-slate-800">
                      Eliminates the gap between making a phone call and keeping the deal alive in your sales pipeline.
                    </p>
                  </div>
                </div>

                {/* Real UI Crop Visual */}
                <div
                  className={`lg:col-span-6 flex justify-center ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="relative aspect-[9/16] w-full max-w-[320px] sm:max-w-[340px] overflow-hidden rounded-[36px] bg-slate-950 p-2 shadow-device ring-1 ring-slate-800">
                    <div className="relative h-full w-full overflow-hidden rounded-[28px]">
                      <Image
                        src={feature.screenshot}
                        alt={feature.title}
                        fill
                        sizes="(max-width: 640px) 300px, 340px"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-28 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-soft-card">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0E7C7A]">
              Clear Differentiation
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Traditional Phone Sales vs. Call Leads
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-4 px-4">Sales Capability</th>
                  <th className="py-4 px-4 text-rose-600">Manual / Personal Dialler</th>
                  <th className="py-4 px-4 text-[#0E7C7A]">Call Leads Mobile CRM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {comparisonItems.map((row) => (
                  <tr key={row.capability} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-4 font-semibold text-slate-900">
                      {row.capability}
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      <div className="flex items-start gap-2 text-rose-700">
                        <XCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-800">
                      <div className="flex items-start gap-2 text-[#0E7C7A] font-medium">
                        <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{row.callLeads}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Conversion Banner */}
        <div className="mt-20 rounded-3xl bg-slate-900 text-white p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Ready to upgrade your team’s call workflow?
          </h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
            See how Call Leads gives phone-driven sales teams a clear next action after every conversation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/download" variant="primary" size="lg">
              <span>Get Call Leads</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
            <Button href="/book-demo" variant="secondary" size="lg" className="bg-white text-slate-900">
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
