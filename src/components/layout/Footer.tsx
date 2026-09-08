import React from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";
import { PhoneCall, ShieldCheck, Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 pb-12 border-b border-slate-200/80">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 flex flex-col justify-between space-y-4">
            <div>
              <Link href="/" className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <PhoneCall className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold tracking-tight text-slate-900">
                  {SITE_CONFIG.name}
                </span>
              </Link>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 max-w-sm">
                The mobile sales CRM engineered for phone-driven teams. Capture calls as actionable leads, schedule timely follow-ups, and keep every sales rep accountable.
              </p>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <span>Inquiries &amp; support active</span>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Operated by {SITE_CONFIG.company.legalName} • Domain: <code className="font-mono text-slate-700">getcalllead.io</code>
              </p>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Product
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/features" className="text-slate-600 hover:text-emerald-700 transition-colors">
                  Features &amp; Workflow
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-slate-600 hover:text-emerald-700 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-slate-600 hover:text-emerald-700 transition-colors">
                  Plans &amp; Pricing
                </Link>
              </li>
              <li>
                <Link href="/book-demo" className="text-slate-600 hover:text-emerald-700 transition-colors">
                  Request a Demo
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-slate-600 hover:text-emerald-700 transition-colors">
                  Security Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Support &amp; Help
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/support" className="text-slate-600 hover:text-emerald-700 transition-colors">
                  Support Center
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-slate-600 hover:text-emerald-700 transition-colors">
                  Common Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-emerald-700 transition-colors">
                  Contact Inquiries
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.supportEmail}`}
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-emerald-700 transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>{SITE_CONFIG.supportEmail}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Compliance & Store Policies */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Compliance &amp; Legal
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/privacy" className="text-slate-600 hover:text-emerald-700 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-600 hover:text-emerald-700 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-slate-600 hover:text-emerald-700 transition-colors">
                  Security Overview
                </Link>
              </li>
              <li>
                <Link
                  href="/delete-account"
                  className="inline-flex items-center gap-1 font-medium text-amber-700 hover:text-amber-900 transition-colors"
                >
                  <span>Data Deletion Request</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Attribution */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            GetCallLead is operated by Invention Hill. © {currentYear} Invention Hill. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Organization-Scoped Workspace Security</span>
            </span>
            <span className="text-slate-300">•</span>
            <span>Mobile store listings in review</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
