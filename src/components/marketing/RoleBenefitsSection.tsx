"use client";

import React, { useState } from "react";
import { SITE_CONFIG } from "@/lib/site-config";
import { User, Briefcase, CheckCircle2 } from "lucide-react";

export function RoleBenefitsSection() {
  const [activeRole, setActiveRole] = useState<"reps" | "managers">("reps");
  const roleData = SITE_CONFIG.roles[activeRole];

  return (
    <section className="py-20 sm:py-28 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0E7C7A] bg-[#E6F3F2] px-3 py-1 rounded-full border border-teal-200">
            Role-Based Value
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950">
            Built for how your team actually works.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Whether you are on the phones making callbacks or managing a sales department, GetCallLead delivers focused clarity.
          </p>

          {/* Toggle Button */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300/80">
            <button
              onClick={() => setActiveRole("reps")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                activeRole === "reps"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <User className="h-4 w-4 text-[#0E7C7A]" />
              <span>For Sales Reps</span>
            </button>
            <button
              onClick={() => setActiveRole("managers")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                activeRole === "managers"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Briefcase className="h-4 w-4 text-[#2563EB]" />
              <span>For Sales Managers</span>
            </button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-soft-card">
          <div className="mb-8 pb-6 border-b border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900">{roleData.title}</h3>
            <p className="mt-2 text-base text-slate-600">{roleData.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roleData.points.map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#E6F3F2] text-[#0E7C7A]">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium text-slate-800 leading-relaxed pt-0.5">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
