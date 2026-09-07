import React from "react";
import { SITE_CONFIG } from "@/lib/site-config";
import { Badge } from "@/components/ui/Badge";
import { Check } from "lucide-react";

export function UseCasesSection() {
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0E7C7A] bg-[#E6F3F2] px-3 py-1 rounded-full border border-teal-200">
            Tailored Applications
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950">
            Where Call Leads delivers immediate impact.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Engineered specifically for operations where customer acquisition happens through verbal conversations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SITE_CONFIG.useCases.map((uc) => (
            <div
              key={uc.title}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/70 p-7 transition-all duration-200 hover:shadow-lg hover:border-slate-300"
            >
              <div>
                <Badge variant="blue" size="sm" className="mb-4">
                  {uc.badge}
                </Badge>
                <h3 className="text-xl font-bold text-slate-900">{uc.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {uc.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Key Advantages
                </span>
                <ul className="mt-3 space-y-2">
                  {uc.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#0E7C7A]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
