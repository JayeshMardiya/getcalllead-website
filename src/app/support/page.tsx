import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Mail,
  Clock,
  ShieldAlert,
  Smartphone,
  Calendar,
  BellRing,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Support Hub & Help Center | GetCallLead",
  description:
    "Get assistance with GetCallLead. Guidelines for call logging, notification setup, calendar reminders, and organization account inquiries.",
  alternates: {
    canonical: "/support",
  },
};

export default function SupportPage() {
  const troubleshootingTopics = [
    {
      icon: BellRing,
      title: "Notification & Follow-up Reminders",
      desc: "Ensure device notifications are enabled in your mobile OS settings so you receive timely scheduled callback alerts.",
    },
    {
      icon: Calendar,
      title: "Follow-Up Agenda & Calendar",
      desc: "Learn how scheduled follow-up dates, times, and callback objectives are organized into Due Today, Upcoming, and Overdue views.",
    },
    {
      icon: Smartphone,
      title: "Call Outcome Recording",
      desc: "Understand how to record outcomes after concluding phone calls: Answered, Busy, Proposal Sent, or Follow-up Needed.",
    },
    {
      icon: ShieldAlert,
      title: "Organization Access & Roles",
      desc: "Manage sales rep roles, lead ownership delegation, and manager visibility inside your organization workspace.",
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="teal" size="md">
            Customer Support
          </Badge>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
            We are here to support your sales team.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Have a question about GetCallLead or need technical assistance with your organization workspace?
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-soft-card">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 mb-4">
              <Mail className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Email Support</h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Reach our support team for account assistance, pricing inquiries, deletion requests, or product questions.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <a
                href={`mailto:${SITE_CONFIG.supportEmail}`}
                className="text-sm font-semibold text-emerald-700 hover:underline"
              >
                {SITE_CONFIG.supportEmail}
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-soft-card">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 mb-4">
              <Clock className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Operating Hours</h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our team actively reviews customer and demo inquiries during published operating hours.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <span className="text-xs font-medium text-slate-500">
                Monday – Saturday • 9:00 AM – 7:00 PM IST
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-soft-card">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700 mb-4">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Account &amp; Privacy</h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Manage data retention, privacy questions, or submit an authenticated account deletion request.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                href="/delete-account"
                className="text-sm font-semibold text-amber-700 hover:underline inline-flex items-center gap-1"
              >
                <span>Request Data Deletion</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Common Troubleshooting Areas */}
        <div className="max-w-5xl mx-auto rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 mb-16 shadow-soft-card">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Setup &amp; Workflow Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {troubleshootingTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <div
                  key={topic.title}
                  className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{topic.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                    {topic.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legal Links */}
        <div className="max-w-2xl mx-auto text-center text-xs text-slate-500">
          <p>
            Operated by {SITE_CONFIG.company.legalName}. Need legal documentation? View our{" "}
            <Link href="/privacy" className="text-emerald-700 underline">
              Privacy Policy
            </Link>{" "}
            or{" "}
            <Link href="/terms" className="text-emerald-700 underline">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
