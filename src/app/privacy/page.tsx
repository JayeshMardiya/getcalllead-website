import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck, Mail, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | GetCallLead",
  description:
    "Privacy Policy for GetCallLead mobile application and services, detailing data collection, device permissions, storage, and user deletion rights.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 sm:py-20 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-slate-200 pb-8">
          <Badge variant="teal" size="md">
            Legal &amp; Compliance
          </Badge>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-950">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Effective Date: September 7, 2026 • Operated by {SITE_CONFIG.company.legalName}
          </p>
        </div>

        {/* Content Body */}
        <div className="mt-8 prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Overview and Scope</h2>
            <p>
              This Privacy Policy applies to the <strong>GetCallLead</strong> mobile applications (iOS and Android), web dashboards, APIs, and associated services operated by {SITE_CONFIG.company.legalName} (&quot;GetCallLead&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
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
                    <th className="p-3">Source &amp; Usage Purpose</th>
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
                    <td className="p-3 font-medium">Sales Leads &amp; Interactions</td>
                    <td className="p-3">Customer contact names, phone numbers, deal notes, manual call outcome tags, pipeline stage, and follow-up reminders.</td>
                    <td className="p-3">Scoped strictly to your organization workspace. Not sold to advertisers.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Device Contacts (Optional)</td>
                    <td className="p-3">Used solely when you explicitly grant contact access to resolve caller names or import leads.</td>
                    <td className="p-3">Processed locally or imported into your organization workspace upon explicit confirmation.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Device &amp; Push Notifications</td>
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

          <section className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
            <h3 className="text-base font-bold text-emerald-800 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <span>Explicit Notice Regarding Telephone Calls</span>
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-800 leading-relaxed">
              <strong>GetCallLead does not record telephone conversations or secretly intercept audio.</strong> The user taps to initiate calls via the native device dialler, and manually records the outcome, notes, and next action in GetCallLead.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Sub-Processors and Technical Infrastructure</h2>
            <p>
              We do not sell your organization’s lead data to advertisers. We share data only with technical infrastructure providers necessary to operate the service:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs sm:text-sm">
              <li><strong>Cloud Hosting &amp; Database:</strong> Managed relational database hosting with organization-scoped access controls.</li>
              <li><strong>Push Notifications:</strong> Google Firebase Cloud Messaging (FCM) for operational reminder alerts.</li>
              <li><strong>In-App Purchases:</strong> RevenueCat, Apple StoreKit, and Google Play In-App Billing for subscription entitlement verification.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Data Retention and Security Practices</h2>
            <p>
              Data is transmitted over HTTPS and access is controlled by organization roles. All customer records are scoped to the organization workspace.
            </p>
            <p className="mt-2">
              Customer data is retained while needed to provide the service and for documented legal, security, accounting, backup, or dispute-resolution purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Lawful Basis for Processing</h2>
            <p>
              We process your personal data under the following lawful bases:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs sm:text-sm">
              <li><strong>Contract Performance:</strong> Processing necessary to provide the GetCallLead CRM service as agreed when you create an account.</li>
              <li><strong>Legitimate Interest:</strong> Service analytics, infrastructure security, and fraud prevention (we do not use personal data for behavioural advertising).</li>
              <li><strong>Consent:</strong> Where required by law, such as push notification opt-in or optional contact book access.</li>
              <li><strong>Legal Obligation:</strong> Retaining financial transaction records where mandated by applicable tax or accounting regulations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Your Rights Under Applicable Data Protection Laws</h2>
            <p>
              Depending on your jurisdiction, you may have the following rights regarding your personal data:
            </p>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl">
                <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-900">
                  <tr>
                    <th className="p-3">Right</th>
                    <th className="p-3">DPDPA (India)</th>
                    <th className="p-3">GDPR (EU/EEA)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-medium">Access your data</td>
                    <td className="p-3">Section 11 — Right to information about processing</td>
                    <td className="p-3">Article 15 — Right of access</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Correct inaccurate data</td>
                    <td className="p-3">Section 12 — Right to correction and erasure</td>
                    <td className="p-3">Article 16 — Right to rectification</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Erase / delete data</td>
                    <td className="p-3">Section 12 — Right to erasure</td>
                    <td className="p-3">Article 17 — Right to erasure</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Data portability</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Article 20 — Right to data portability</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Withdraw consent</td>
                    <td className="p-3">Section 6(6) — Right to withdraw consent</td>
                    <td className="p-3">Article 7(3) — Right to withdraw consent</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Grievance redressal</td>
                    <td className="p-3">Section 13 — Right to grievance redressal via Data Protection Board</td>
                    <td className="p-3">Article 77 — Right to lodge complaint with supervisory authority</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4">
              To exercise any of these rights, contact us at <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-emerald-700 underline">{SITE_CONFIG.supportEmail}</a> or use our <Link href="/delete-account" className="text-emerald-700 underline font-medium">Account &amp; Data Deletion Portal</Link>. We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Account and Data Deletion Rights</h2>
            <p>
              GetCallLead provides a web portal for submitting account and data deletion requests. Identity verification must be completed before records are permanently removed.
            </p>
            <div className="mt-4">
              <Link
                href="/delete-account"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-slate-800"
              >
                <span>Go to Account &amp; Data Deletion Portal</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. International Data Transfers</h2>
            <p>
              GetCallLead uses cloud infrastructure that may process data outside your country of residence. Where personal data is transferred internationally, we ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) where required under GDPR, and compliance with applicable cross-border data transfer provisions under DPDPA.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. If we make material changes, we will notify you through the application or by email at least 30 days before the changes take effect. Continued use of the service after the effective date constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">10. Contact Our Support Team</h2>
            <p>
              For privacy questions or data subject inquiries, contact our team at:
            </p>
            <div className="mt-3 rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs sm:text-sm">
              <p className="font-semibold text-slate-900">{SITE_CONFIG.company.legalName}</p>
              <p className="text-slate-600">Email: <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-emerald-700 underline">{SITE_CONFIG.supportEmail}</a></p>
              <p className="text-slate-600">Domain: https://getcalllead.io</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
