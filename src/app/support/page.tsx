import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Mail,
  Clock,
  HelpCircle,
  ShieldAlert,
  Smartphone,
  Calendar,
  BellRing,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Support Hub & Help Center",
  description:
    "Get assistance with Call Leads. Troubleshooting guides for call logging, notification setup, calendar sync, and account inquiries.",
};

export default function SupportPage() {
  const troubleshootingTopics = [
    {
      icon: BellRing,
      title: "Notification & Follow-up Alerts",
      desc: "Ensure background push notifications are enabled on your Android or iOS device so you never miss a scheduled callback reminder.",
    },
    {
      icon: Calendar,
      title: "Calendar Sync & Reminders",
      desc: "Connect your mobile device calendar with Call Leads follow-up agenda. Learn how callback times and due alerts are configured.",
    },
    {
      icon: Smartphone,
      title: "Call Outcome Logging",
      desc: "Understand how to record outcomes immediately after concluding a call using tags: Answered, Busy, Proposal Sent, or Follow-up Needed.",
    },
    {
      icon: ShieldAlert,
      title: "Organization Access & Permissions",
      desc: "Managing sales rep roles, lead ownership delegation, and manager pipeline permissions inside your team workspace.",
    },
  ];

  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="teal" size="md">
            Help & Customer Care
          </Badge>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
            We are here to keep your team closing.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Have a question about Call Leads or need technical assistance with your mobile deployment?
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-soft-card">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E6F3F2] text-[#0E7C7A] mb-4">
              <Mail className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Email Support</h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Contact customer support for account access, subscriptions, deletion requests, or product questions.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <a
                href={`mailto:${SITE_CONFIG.supportEmail}`}
                className="text-sm font-semibold text-[#0E7C7A] hover:underline"
              >
                {SITE_CONFIG.supportEmail}
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-soft-card">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] mb-4">
              <Clock className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Response Times</h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              We typically respond within one business day during our published operating hours.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <span className="text-xs font-medium text-slate-500">
                Monday – Saturday • 9 AM – 7 PM IST
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-soft-card">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 mb-4">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Account Rights & Privacy</h2>
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
        <div className="max-w-5xl mx-auto rounded-3xl border border-slate-200 bg-slate-50/70 p-8 sm:p-12 mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Common Setup & Troubleshooting Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {troubleshootingTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <div
                  key={topic.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E6F3F2] text-[#0E7C7A]">
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

        {/* Version Guidance */}
        <div className="max-w-2xl mx-auto text-center text-xs text-slate-500">
          <p>
            Current Mobile Release: <code className="font-mono text-slate-700 font-semibold">v1.0.0</code> (Flutter Native iOS / Android).
          </p>
          <p className="mt-1">
            Need legal documentation? View our{" "}
            <Link href="/privacy" className="text-[#0E7C7A] underline">
              Privacy Policy
            </Link>{" "}
            or{" "}
            <Link href="/terms" className="text-[#0E7C7A] underline">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
