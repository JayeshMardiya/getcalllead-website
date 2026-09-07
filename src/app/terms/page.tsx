import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service governing the use of Call Leads mobile application, web services, and CRM software.",
};

export default function TermsOfServicePage() {
  return (
    <div className="py-12 sm:py-20 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-8">
          <Badge variant="teal" size="md">
            Legal Agreement
          </Badge>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-950">
            Terms of Service
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Last Updated: September 6, 2026 • Version 1.0
          </p>
        </div>

        <div className="mt-8 prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Call Leads application, website ({SITE_CONFIG.domain}), or any associated services provided by {SITE_CONFIG.company.legalName}, you agree to be bound by these Terms of Service. If you are entering into these terms on behalf of a company or organization, you represent that you have the authority to bind such entity.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Description of Service</h2>
            <p>
              Call Leads provides a mobile-first sales CRM platform designed to organize customer leads, coordinate sales team assignments, track follow-up schedules, and log manual call outcomes.
            </p>
            <p className="mt-2">
              Features are provided on an &quot;as-is&quot; and &quot;as-available&quot; basis. We may modify, enhance, or discontinue features with reasonable notice where required.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Acceptable Use and Compliance with Calling Regulations</h2>
            <p>
              You agree to use Call Leads strictly in compliance with all applicable local, national, and international laws, including telecommunications rules, national &quot;Do Not Call&quot; registries, and data privacy regulations. You agree that:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs sm:text-sm">
              <li>You will not use the service for unlawful robo-calling, harassment, deceptive marketing, or unsolicited spam.</li>
              <li>You have all required legal consents to store and process the phone numbers and contact details of prospective customers you enter into Call Leads.</li>
              <li>You are solely responsible for all sales conversations conducted through your device and the accuracy of records logged by your sales reps.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Organization Accounts & Security</h2>
            <p>
              You are responsible for safeguarding your login credentials and for all activities that occur under your organization account. You must notify us immediately at <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-[#0E7C7A] underline">{SITE_CONFIG.supportEmail}</a> upon becoming aware of any unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Subscriptions and App Store Billing</h2>
            <p>
              When subscribing through the Apple App Store or Google Play Store, payment terms, trial periods, renewals, and cancellations are governed by the respective store operator&apos;s rules and your account agreements with Apple or Google.
            </p>
            <p className="mt-2">
              Direct organization invoicing is billed according to the agreed proposal terms. Taxes (including GST/VAT where applicable) will be itemized on corresponding invoices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Termination & Deletion</h2>
            <p>
              You may terminate your account at any time. Upon termination, your rights to access the service cease immediately. For permanent deletion of personal information and workspace records, please consult our{" "}
              <Link href="/delete-account" className="text-[#0E7C7A] underline font-medium">
                Account & Data Deletion Portal
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Contact Information</h2>
            <p>
              If you have any questions regarding these Terms, contact our legal team at{" "}
              <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-[#0E7C7A] underline">
                {SITE_CONFIG.supportEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
