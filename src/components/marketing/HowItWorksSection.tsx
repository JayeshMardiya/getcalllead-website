import React from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0E7C7A] bg-[#E6F3F2] px-3 py-1 rounded-full border border-teal-200">
            Simple 3-Step Execution
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950">
            How Call Leads Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Designed for mobile sales speed. Three seamless steps to keep every deal moving forward.
          </p>
        </div>

        {/* 3 Horizontal Steps */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {SITE_CONFIG.howItWorks.map((item, idx) => (
            <div
              key={item.step}
              className="relative flex flex-col rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:p-7 transition-all duration-200 hover:shadow-lg hover:border-slate-300"
            >
              {/* Step Header Number */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-[#0E7C7A] bg-[#E6F3F2] px-2.5 py-1 rounded-md">
                  STEP {item.step}
                </span>
                <span className="text-xl font-black text-slate-300">{item.name}</span>
              </div>

              {/* Title & Description */}
              <h3 className="mt-4 text-lg font-bold text-slate-900 leading-snug">
                {item.headline}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-grow">
                {item.description}
              </p>

              {/* Phone Screenshot Crop Container */}
              <div className="mt-6 relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-900 ring-1 ring-slate-800">
                <Image
                  src={item.screenshot}
                  alt={`${item.name} screen in Call Leads`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
