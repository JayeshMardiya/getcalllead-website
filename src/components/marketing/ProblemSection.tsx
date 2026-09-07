import React from "react";
import { PhoneOff, Users, CalendarClock, EyeOff, ArrowDown, CheckCircle2 } from "lucide-react";

export function ProblemSection() {
  const failures = [
    {
      icon: PhoneOff,
      title: "Details stay in individual phone logs",
      desc: "When calls end on personal phone diallers, phone numbers and notes remain locked on personal devices instead of a shared team pipeline.",
    },
    {
      icon: Users,
      title: "Nobody knows who owns the lead",
      desc: "Without visible assignment, inquiries are either duplicated by multiple reps or neglected completely as everyone assumes someone else called.",
    },
    {
      icon: CalendarClock,
      title: "Follow-ups depend on human memory",
      desc: "Promises made on a call ('I will send the quotation at 4 PM') get lost during busy calling days with no centralized calendar alerts.",
    },
    {
      icon: EyeOff,
      title: "Managers cannot see who needs attention",
      desc: "Sales leaders have no visibility into overdue follow-ups, lost accounts, or pending deals until end-of-month revenue gaps appear.",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 border border-rose-200/80 px-3 py-1 rounded-full">
            The Phone Sales Reality
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950">
            Your team is making calls. <br />
            <span className="text-slate-500 font-normal">But what happens after the call?</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Every day, sales conversations happen that never become closed revenue. Here is where deals slip through the cracks:
          </p>
        </div>

        {/* 4 Failure Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {failures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="relative rounded-2xl border border-slate-200/90 bg-white p-6 shadow-soft-card hover:border-rose-200 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4">
                  <span className="text-xs font-mono font-semibold text-rose-500">0{idx + 1} — FAILURE</span>
                  <h3 className="mt-1 text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* The Call Leads Resolution Banner */}
        <div className="mt-12 rounded-3xl border border-teal-200 bg-gradient-to-r from-teal-50/90 via-teal-100/40 to-emerald-50/90 p-6 sm:p-8 text-center max-w-4xl mx-auto shadow-sm">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0E7C7A]">
            <CheckCircle2 className="h-4 w-4" />
            <span>The Call Leads Solution</span>
          </div>
          <p className="mt-3 text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Call Leads turns every conversation into assigned, trackable sales work.
          </p>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl mx-auto">
            From the minute a call ends, your salesperson has an assigned account, a scheduled follow-up agenda, and visible pipeline movement.
          </p>
        </div>
      </div>
    </section>
  );
}
