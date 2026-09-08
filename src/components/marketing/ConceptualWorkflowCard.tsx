import React from "react";
import { PhoneCall, UserCheck, Calendar, ArrowRight, ShieldCheck } from "lucide-react";

export function ConceptualWorkflowCard() {
  return (
    <div className="relative mx-auto w-full max-w-md rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl sm:p-8">
      {/* Visual Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
            <PhoneCall className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">GetCallLead Workflow</p>
            <p className="text-[10px] text-slate-500">Phone-first lead lifecycle</p>
          </div>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">
          Conceptual Flow
        </span>
      </div>

      {/* 3 Step Interactive Visual Cards */}
      <div className="mt-6 space-y-4">
        {/* Step 1: Call Interaction */}
        <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 transition hover:border-emerald-200 hover:bg-emerald-50/30">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 font-bold text-xs">
            1
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-slate-900">Native Phone Interaction</p>
              <span className="text-[10px] font-semibold text-emerald-800">Dialler</span>
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
              Reps initiate calls using the phone dialler. Contact details are saved directly into your workspace.
            </p>
          </div>
        </div>

        {/* Step 2: Clear Assignment */}
        <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 transition hover:border-emerald-200 hover:bg-emerald-50/30">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 font-bold text-xs">
            2
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-slate-900">Team Assignment</p>
              <span className="text-[10px] font-semibold text-emerald-800">Role-Scoped</span>
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
              Owners and managers assign lead ownership to designated sales reps with zero ambiguity.
            </p>
          </div>
        </div>

        {/* Step 3: Scheduled Follow-up */}
        <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 transition hover:border-emerald-200 hover:bg-emerald-50/30">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800 font-bold text-xs">
            3
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-slate-900">Scheduled Next Action</p>
              <span className="text-[10px] font-medium text-amber-700">Reminders</span>
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
              Date and time commitments appear in rep daily schedules to ensure no promised callback is missed.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Trust Marker */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>Workspace Scoped Access</span>
        </div>
        <span>HTTPS Encrypted</span>
      </div>
    </div>
  );
}
