import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck, Mail, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Call Leads mobile application and services, detailing data collection, device permissions, storage, and user deletion rights.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 sm:py-20 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-slate-200 pb-8">
          <Badge variant="teal" size="md">
            Legal & Compliance
          </Badge>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-950">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Effective Date: September 6, 2026 • Version 1.0
          </p>
        </div>

        {/* Content Body */}
        <div className="mt-8 prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Overview and Scope</h2>
            <p>
              This Privacy Policy applies to the <strong>Call Leads</strong> mobile applications (iOS and Android), web dashboards, APIs, and associated services operated by {SITE_CONFIG.company.legalName} (&quot;Call Leads&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
            </p>
            <p className="mt-2">
              Our core service helps sales professionals and business teams organize leads, schedule follow-ups, and record call outcomes. Organization identifiers are used to separate customer workspaces in the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Data We Collect and Why</h2>
            <p>We only collect information necessary to provide and secure our mobile sales CRM services:</p>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl">
                <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-900">
                  <tr>
                    <th className="p-3">Data Category</th>
                    <th className="p-3">Source & Usage Purpose</th>
                    <th className="p-3">Tracking / Retention</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-medium">Account Identifiers</td>
                    <td className="p-3">Name, work email, phone number, organization name. Used for staff authentication and workspace identity.</td>
                    <td className="p-3">Linked to organization. Retained during active subscription.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Sales Leads & Interactions</td>
                    <td className="p-3">Customer contact names, phone numbers, deal notes, manual call outcome tags, pipeline stage, and follow-up reminders.</td>
                    <td className="p-3">Scoped strictly to your organization tenant. Not shared with advertisers.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Device Contacts (Optional)</td>
                    <td className="p-3">Used solely when you explicitly grant contact access to resolve caller names or import leads.</td>
                    <td className="p-3">Processed locally or imported into your organization workspace upon explicit confirmation.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Speech-to-Text (Optional)</td>
                    <td className="p-3">Used solely when dictating notes on mobile leads.</td>
                    <td className="p-3">Processed into text notes. Raw audio is not retained for advertising or marketing.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Device & Push Notifications</td>
                    <td className="p-3">Firebase Cloud Messaging (FCM) tokens and installation IDs to deliver follow-up alerts and task assignments.</td>
                    <td className="p-3">Invalidated automatically on logout. No advertising tracking.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Purchase History</td>
                    <td className="p-3">Subscription status and App Store / Google Play transaction receipts handled via RevenueCat / StoreKit / Play Billing.</td>
                    <td className="p-3">Retained as required by applicable tax, accounting, and financial laws.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border border-teal-200 bg-[#E6F3F2]/40 p-5">
            <h3 className="text-base font-bold text-[#0E7C7A] flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              <span>Explicit Notice Regarding Telephone Calls</span>
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-800 leading-relaxed">
              <strong>Call Leads does not record telephone conversations or secretly intercept audio.</strong> In this release, the app does not automatically scrape your phone system dialler history without your action. The user taps to initiate calls via the native device dialler, and manually records the outcome, notes, and next action in Call Leads.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Sub-Processors and Third Parties</h2>
            <p>
              We do not sell, rent, or trade your organization data or customer lead lists to any third party. We share data only with trusted technical infrastructure providers necessary to operate the application:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs sm:text-sm">
              <li><strong>Cloud Hosting & Database:</strong> Encrypted multi-tenant relational storage in certified cloud data centers.</li>
              <li><strong>Push Notifications:</strong> Google Firebase Cloud Messaging (FCM) for operational reminder alerts.</li>
              <li><strong>In-App Purchases:</strong> RevenueCat, Apple StoreKit, and Google Play In-App Billing for subscription entitlement verification.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Data Retention and Security Practices</h2>
            <p>
              We use HTTPS for data in transit, access controls, and organization scoping intended to prevent cross-organization access.
            </p>
            <p className="mt-2">
              Customer data is retained while needed to provide the service and for documented legal, security, accounting, backup, or dispute-resolution purposes. The applicable deletion or anonymization treatment depends on account ownership and whether records are shared with an active organization.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Account and Data Deletion Rights</h2>
            <p>
              Call Leads provides a web route for starting an account and data deletion request. Identity verification and the applicable organization-data rules must be completed before deletion is performed.
            </p>
            <p className="mt-3">
              You can initiate a permanent account and data deletion request directly through our web portal:
            </p>
            <div className="mt-4">
              <Link
                href="/delete-account"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-slate-800"
              >
                <span>Go to Account & Data Deletion Portal</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Contact Our Privacy Office</h2>
            <p>
              For questions regarding this policy, data subject requests under GDPR, CCPA, or DPDP Act, contact our dedicated privacy officer at:
            </p>
            <div className="mt-3 rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs sm:text-sm">
              <p className="font-semibold text-slate-900">{SITE_CONFIG.company.legalName}</p>
              <p className="text-slate-600">Email: <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-[#0E7C7A] underline">{SITE_CONFIG.supportEmail}</a></p>
              <p className="text-slate-600">Domain: https://getcalllead.io</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
