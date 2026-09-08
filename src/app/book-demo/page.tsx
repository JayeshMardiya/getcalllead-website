import React from "react";
import { Metadata } from "next";
import { Clock, Users, ShieldCheck } from "lucide-react";
import { BookDemoForm } from "@/components/forms/BookDemoForm";

export const metadata: Metadata = {
  title: "Request a Product Demonstration | GetCallLead",
  description:
    "Schedule a live product demonstration of GetCallLead. Explore phone call tracking, lead assignment, and follow-up management for sales teams.",
};

export default function BookDemoPage() {
  return (
    <div className="py-12 sm:py-20 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column: Context & Expectations (Static Server Rendered Shell) */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200">
              Product Demonstration
            </span>
            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Request a GetCallLead Demo
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              Connect with our team to review the phone-first sales workflow, lead intake, assignment controls, and follow-up calendar for your sales reps.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-2xl bg-white border border-slate-200/90 p-4 shadow-xs">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Focused Workflow Review</h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    We demonstrate the mobile application workflow and how calls are logged into your organization workspace.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl bg-white border border-slate-200/90 p-4 shadow-xs">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Team Structure &amp; Pricing Quote</h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Plan capacity for 1 to 25 licensed users with authoritative ₹149/month additional-seat pricing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl bg-white border border-slate-200/90 p-4 shadow-xs">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Organization-Scoped Privacy</h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Role-based workspace access ensures client contact numbers and outcomes remain separated.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Client Form Island */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-soft-card">
              <BookDemoForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
