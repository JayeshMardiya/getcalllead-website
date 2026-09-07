import React from "react";
import { ArrowRight, UserPlus, PhoneCall, CalendarCheck, Check } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

const stepIcons = [UserPlus, PhoneCall, CalendarCheck];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Three-Step Sales Execution
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950">
            How GetCallLead Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Built for phone-first sales speed. Three clear steps to keep every deal moving forward.
          </p>
        </div>

        {/* 3 Horizontal Steps */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {SITE_CONFIG.howItWorks.map((item, idx) => {
            const Icon = stepIcons[idx] || UserPlus;
            return (
              <div
                key={item.stepNumber}
                className="relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 transition-all duration-200 hover:shadow-lg hover:border-slate-300"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold tracking-widest text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md">
                      STEP {item.stepNumber}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-xs border border-slate-200">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="mt-6 text-xl font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {item.summary}
                  </p>

                  {/* Structured Details */}
                  <div className="mt-6 space-y-3 border-t border-slate-200/80 pt-6">
                    {item.details.map((detail) => (
                      <div key={detail} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                        <span className="leading-normal">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub-label */}
                <div className="mt-8 pt-4 border-t border-slate-200/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Phase {item.stepNumber} of 03
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
