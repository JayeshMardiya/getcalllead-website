"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/site-config";
import { Check, ChevronRight } from "lucide-react";

export function ProductWalkthrough() {
  const [activeTab, setActiveTab] = useState(0);
  const currentStep = SITE_CONFIG.walkthrough[activeTab];

  return (
    <section className="py-20 sm:py-28 bg-white border-y border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0E7C7A] bg-[#E6F3F2] px-3 py-1 rounded-full border border-teal-200">
            Interactive Product Tour
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950">
            See Call Leads in action.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Step through how a mobile sales rep captures, delegates, schedules, and tracks opportunities from end to end.
          </p>
        </div>

        {/* Tab Navigation (Keyboard accessible) */}
        <div
          role="tablist"
          aria-label="Product walkthrough tabs"
          className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-100/90 max-w-4xl mx-auto mb-12 border border-slate-200/80"
        >
          {SITE_CONFIG.walkthrough.map((step, idx) => {
            const isSelected = activeTab === idx;
            return (
              <button
                key={step.id}
                role="tab"
                id={`tab-${step.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${step.id}`}
                onClick={() => setActiveTab(idx)}
                className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-white text-slate-900 shadow-sm ring-1 ring-black/5"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                }`}
              >
                {step.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div
          role="tabpanel"
          id={`panel-${currentStep.id}`}
          aria-labelledby={`tab-${currentStep.id}`}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:p-10 lg:p-12 shadow-sm"
        >
          {/* Left: Text Explanation & Key Highlights */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0E7C7A]">
              Step {activeTab + 1} of {SITE_CONFIG.walkthrough.length}
            </span>
            <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {currentStep.title}
            </h3>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              {currentStep.summary}
            </p>

            <ul className="mt-6 space-y-3.5">
              {currentStep.details.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E6F3F2] text-[#0E7C7A] mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={() =>
                  setActiveTab((prev) => (prev > 0 ? prev - 1 : SITE_CONFIG.walkthrough.length - 1))
                }
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 bg-white shadow-xs"
              >
                Previous Step
              </button>
              <button
                onClick={() =>
                  setActiveTab((prev) => (prev + 1) % SITE_CONFIG.walkthrough.length)
                }
                className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-[#0E7C7A] hover:bg-[#0B6D6B] px-3.5 py-1.5 rounded-lg shadow-xs"
              >
                <span>Next Step</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Dynamic Real Screenshot Display */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative aspect-[9/16] w-full max-w-[320px] sm:max-w-[340px] overflow-hidden rounded-[36px] bg-slate-950 p-2.5 shadow-device ring-1 ring-slate-800">
              <div className="relative h-full w-full overflow-hidden rounded-[28px]">
                <Image
                  src={currentStep.screenshot}
                  alt={currentStep.title}
                  fill
                  sizes="(max-width: 640px) 300px, 340px"
                  className="object-cover object-top transition-opacity duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
