import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface DeviceFrameProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  badge?: string;
}

export function DeviceFrame({
  src,
  alt,
  priority = false,
  className,
  badge,
}: DeviceFrameProps) {
  return (
    <div
      className={cn(
        "relative mx-auto max-w-[320px] sm:max-w-[340px] md:max-w-[360px] select-none",
        className
      )}
    >
      {/* Outer Glow / Shadow */}
      <div className="absolute -inset-2 rounded-[52px] bg-gradient-to-b from-teal-500/20 via-blue-500/10 to-transparent blur-xl opacity-70 pointer-events-none" />

      {/* Phone Body Frame */}
      <div className="relative rounded-[48px] bg-slate-900 p-[10px] shadow-device ring-1 ring-slate-800/80">
        {/* Antenna / Button Accents */}
        <div className="absolute -left-[2px] top-[100px] h-[36px] w-[3px] rounded-l-sm bg-slate-700" />
        <div className="absolute -left-[2px] top-[148px] h-[48px] w-[3px] rounded-l-sm bg-slate-700" />
        <div className="absolute -left-[2px] top-[204px] h-[48px] w-[3px] rounded-l-sm bg-slate-700" />
        <div className="absolute -right-[2px] top-[130px] h-[64px] w-[3px] rounded-r-sm bg-slate-700" />

        {/* Inner Bezel */}
        <div className="relative overflow-hidden rounded-[38px] bg-black ring-1 ring-white/10">
          {/* Dynamic Island / Speaker Pill */}
          <div className="absolute left-1/2 top-2.5 z-20 h-[22px] w-[88px] -translate-x-1/2 rounded-full bg-black/90 ring-1 ring-white/10 flex items-center justify-between px-2.5">
            <div className="h-2 w-2 rounded-full bg-slate-900 ring-1 ring-slate-800" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#0E7C7A]/40 ring-1 ring-[#0E7C7A]/80 flex items-center justify-center">
              <div className="h-1 w-1 rounded-full bg-emerald-400" />
            </div>
          </div>

          {/* Screenshot Container */}
          <div className="relative aspect-[9/19.5] w-full overflow-hidden bg-slate-950">
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes="(max-width: 640px) 320px, (max-width: 1024px) 360px, 400px"
              className="object-cover object-top"
            />
            {/* Subtle Glass Glare */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15" />
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="absolute bottom-1.5 left-1/2 z-20 h-1 w-28 -translate-x-1/2 rounded-full bg-slate-300/60" />
        </div>
      </div>

      {badge && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 px-3.5 py-1 text-xs font-semibold text-white shadow-md border border-slate-700/80 whitespace-nowrap">
          {badge}
        </div>
      )}
    </div>
  );
}
