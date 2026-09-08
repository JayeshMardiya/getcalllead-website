import React from "react";
import { Badge } from "@/components/ui/Badge";
import { SITE_CONFIG } from "@/lib/site-config";
import { UserPlus, Kanban, Calendar, Users, Check } from "lucide-react";

const iconMap = {
  UserPlus,
  Kanban,
  Calendar,
  Users,
};

export function CoreFeaturesBento() {
  return (
    <section className="py-20 sm:py-28 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Core CRM Architecture
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950">
              Engineered around the sales call.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm sm:text-base text-slate-600 max-w-md">
            Essential tools designed to turn rapid conversations into organized, closing sales pipelines.
          </p>
        </div>

        {/* Bento Grid Layout (12 columns) */}
        <div className="grid grid-cols-12 gap-6">
          {SITE_CONFIG.features.map((card) => {
            const Icon = iconMap[card.iconName as keyof typeof iconMap] || UserPlus;
            return (
              <div
                key={card.id}
                className={`${card.colSpan || "col-span-12 lg:col-span-6"} group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-soft-card transition-all duration-300 hover:shadow-xl hover:border-slate-300`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <Badge variant="teal">{card.badge}</Badge>
                    <span className="text-xs font-semibold text-slate-600">
                      {card.tagline}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100/80">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                      {card.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <Check className="h-3.5 w-3.5" />
                  <span>Workspace-scoped CRM capability</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
