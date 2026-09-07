import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  UserPlus,
  Kanban,
  Calendar,
  Users,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features & Workflow | GetCallLead",
  description:
    "Explore GetCallLead's mobile-first sales CRM capabilities: structured lead intake, stage pipelines, follow-up scheduling, and team assignment.",
  alternates: {
    canonical: "/features",
  },
};

const featureDetails = [
  {
    id: "intake",
    icon: UserPlus,
    badge: "Intake",
    title: "Structured Lead Intake from Phone Conversations",
    description:
      "When phone inquiries arrive, capture caller name, mobile number, company name, and discussion notes in structured CRM records immediately on your phone.",
    benefit:
      "Prevents important caller numbers and interaction context from disappearing in private device call logs.",
  },
  {
    id: "pipeline",
    icon: Kanban,
    badge: "Pipeline",
    title: "Visual Deal Stages & Status Tracking",
    description:
      "Move deals through defined progression stages: New, Qualified, Proposal Sent, and Converted. Keep reps focused on active prospects.",
    benefit:
      "Gives reps and managers immediate clarity on deal momentum across every account in the organization.",
  },
  {
    id: "schedule",
    icon: Calendar,
    badge: "Scheduling",
    title: "Follow-Up Agenda & Callback Commitments",
    description:
      "Never end a call without locking in the next action. Set callback dates, exact times, and specific discussion objectives.",
    benefit:
      "Daily task views group callbacks into Due Today, Upcoming, and Overdue so reps execute commitments reliably.",
  },
  {
    id: "assignment",
    icon: Users,
    badge: "Team",
    title: "Team Assignment & Clear Ownership",
    description:
      "Assign every lead to an authorized sales representative. Maintain strict accountability without duplicate calling.",
    benefit:
      "Salespeople know exactly which accounts they own, while managers review team-wide distribution from one dashboard.",
  },
];

const comparisonItems = [
  {
    capability: "Lead Contact Storage",
    traditional: "Trapped in individual rep's personal phone dialler",
    getCallLead: "Saved directly into your organization workspace",
  },
  {
    capability: "Lead Ownership & Assignment",
    traditional: "Unclear ownership; duplicate outreach or forgotten prospects",
    getCallLead: "Unambiguous assignment to a designated sales rep",
  },
  {
    capability: "Follow-up Reminders",
    traditional: "Dependent on personal notes or memory",
    getCallLead: "Structured callback schedule with Due Today and Overdue filters",
  },
  {
    capability: "Call Outcome Recording",
    traditional: "No record of discussion notes or agreed next action",
    getCallLead: "Manual outcome notes and timestamped activity history",
  },
  {
    capability: "Manager Visibility",
    traditional: "No insight until end-of-month revenue gaps occur",
    getCallLead: "Operational overview of pending follow-ups and team activity",
  },
  {
    capability: "Data Protection & Access",
    traditional: "Risk of complete customer loss when reps leave",
    getCallLead: "Organization-scoped workspace security with role permissions",
  },
];

export default function FeaturesPage() {
  return (
    <div className="py-12 sm:py-20 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="teal" size="md">
            Product Capabilities
          </Badge>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
            CRM built around every sales call.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            GetCallLead connects phone conversations directly to structured sales workflow. Capture leads, assign ownership, schedule follow-ups, and keep reps accountable.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {featureDetails.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-soft-card transition hover:border-slate-300 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <Badge variant="teal" size="sm">
                      {feat.badge}
                    </Badge>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h2 className="mt-5 text-xl font-bold text-slate-900 tracking-tight">
                    {feat.title}
                  </h2>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-100 p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Why it matters
                  </span>
                  <p className="mt-1 text-xs font-semibold text-slate-800 leading-relaxed">
                    {feat.benefit}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="mt-24 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-soft-card max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Clear Differentiation
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Manual Calling vs. GetCallLead
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-4 px-4">Sales Capability</th>
                  <th className="py-4 px-4 text-rose-600">Manual Dialling</th>
                  <th className="py-4 px-4 text-emerald-800">GetCallLead Workspace</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {comparisonItems.map((row) => (
                  <tr key={row.capability} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-4 font-semibold text-slate-900">
                      {row.capability}
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      <div className="flex items-start gap-2 text-rose-700">
                        <XCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-800">
                      <div className="flex items-start gap-2 text-emerald-800 font-medium">
                        <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{row.getCallLead}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Box */}
        <div className="mt-20 rounded-3xl bg-slate-900 text-white p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Upgrade your team’s calling workflow
          </h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            See how GetCallLead gives phone-driven sales teams a clear next action after every conversation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              href="/book-demo"
              variant="primary"
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              <span>Request a Demo</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
            <Button
              href="/pricing"
              variant="secondary"
              size="lg"
              className="bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
