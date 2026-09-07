import React from "react";
import Image from "next/image";
import { ShieldCheck, Smartphone, Cloud, CheckCircle2 } from "lucide-react";

export function ProductProofSection() {
  const proofBadges = [
    {
      icon: Smartphone,
      title: "Android & iOS Native",
      description: "Fast, responsive mobile app experience for calling and updates.",
    },
    {
      icon: Cloud,
      title: "Encrypted Cloud Sync",
      description: "Real-time updates sync instantly between mobile reps and team records.",
    },
    {
      icon: ShieldCheck,
      title: "Isolated Tenant Storage",
      description: "Zero data sharing. Your customer leads and logs remain private to your team.",
    },
  ];

  const workflowScreenshots = [
    {
      title: "Lead Intake & Qualification",
      caption: "Turn phone calls into structured deals with tags and ownership.",
      src: "/screenshots/03-lead-capture.png",
    },
    {
      title: "Calendar & Follow-up Agenda",
      caption: "Never forget a callback commitment with date/time scheduling.",
      src: "/screenshots/05-follow-up-calendar.png",
    },
    {
      title: "Team Roster & Ownership",
      caption: "Distribute accounts across sales reps with zero lead collision.",
      src: "/screenshots/06-team-management.png",
    },
  ];

  return (
    <section className="border-y border-slate-200/80 bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Technical & Architectural Proof Bar */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
          {proofBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.title}
                className={`flex items-start gap-4 ${idx > 0 ? "pt-6 sm:pt-0 sm:pl-6" : ""}`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E6F3F2] text-[#0E7C7A]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{badge.title}</h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real Screenshot Strip */}
        <div className="mt-16 sm:mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0E7C7A]">
              Authentic Mobile Experience
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Real product workflows. No fabricated UI.
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              What you see is what your team uses on their phone every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workflowScreenshots.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-4 transition-all duration-200 hover:shadow-lg hover:border-slate-300"
              >
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-slate-900 ring-1 ring-black/5">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="mt-4 px-1 pb-1">
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
