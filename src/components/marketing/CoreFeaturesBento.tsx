import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { SITE_CONFIG } from "@/lib/site-config";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function CoreFeaturesBento() {
  return (
    <section className="py-20 sm:py-28 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0E7C7A] bg-[#E6F3F2] px-3 py-1 rounded-full border border-teal-200">
              Core CRM Architecture
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950">
              Engineered around the sales call.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm sm:text-base text-slate-600 max-w-md">
            Six essential tools designed to turn rapid conversations into organized, closing sales pipelines.
          </p>
        </div>

        {/* Bento Grid Layout (12 columns) */}
        <div className="grid grid-cols-12 gap-6">
          {SITE_CONFIG.features.map((card) => (
            <div
              key={card.id}
              className={`${card.colSpan || "col-span-12 lg:col-span-6"} group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-soft-card transition-all duration-300 hover:shadow-xl hover:border-slate-300`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between">
                  <Badge variant="teal">{card.badge}</Badge>
                  <span className="text-xs font-semibold text-slate-400">
                    {card.tagline}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900 tracking-tight">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-xl">
                  {card.description}
                </p>
              </div>

              {/* Real UI Crop Container */}
              <div className="mt-6 relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-950 ring-1 ring-slate-800/80">
                <Image
                  src={card.screenshot}
                  alt={`${card.title} in Call Leads mobile app`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
                {/* Subtle gradient vignette on bottom of image for sleek CRM aesthetic */}
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
