import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Terms of Service | GetCallLead",
  description:
    "Terms of Service governing the use of GetCallLead mobile application, web services, and CRM software.",
  alternates: {
    canonical: "/terms",
  },
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
            Last Updated: September 7, 2026 • Operated by {SITE_CONFIG.company.legalName}
          </p>
        </div>

        <div className="mt-8 prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the GetCallLead application, website ({SITE_CONFIG.domain}), or any associated services provided by {SITE_CONFIG.company.legalName}, you agree to be bound by these Terms of Service. If you are entering into these terms on behalf of a company or organization, you represent that you have the authority to bind such entity.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Description of Service</h2>
            <p>
              GetCallLead provides a mobile sales CRM platform designed to organize customer leads, coordinate sales team assignments, track follow-up schedules, and log manual call outcomes.
            </p>
            <p className="mt-2">
              Features are provided on an &quot;as-is&quot; and &quot;as-available&quot; basis. We may modify, enhance, or discontinue features with reasonable notice where required.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Acceptable Use and Compliance with Calling Regulations</h2>
            <p>
              You agree to use GetCallLead strictly in compliance with all applicable local, national, and international laws, including telecommunications rules, national &quot;Do Not Call&quot; registries, and data privacy regulations. You agree that:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs sm:text-sm">
              <li>You will not use the service for unlawful robo-calling, harassment, deceptive marketing, or unsolicited spam.</li>
              <li>You have all required legal consents to store and process the phone numbers and contact details of prospective customers you enter into GetCallLead.</li>
              <li>You are solely responsible for all sales conversations conducted through your device and the accuracy of records logged by your sales reps.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Organization Accounts &amp; Security</h2>
            <p>
              You are responsible for safeguarding your login credentials and for all activities that occur under your organization account. You must notify us immediately at <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-emerald-700 underline">{SITE_CONFIG.supportEmail}</a> upon becoming aware of any unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Subscriptions and Store Billing</h2>
            <p>
              When subscribing through the Apple App Store or Google Play Store, payment terms, trial periods, renewals, and cancellations are governed by the respective store operator&apos;s rules and your account agreements with Apple or Google.
            </p>
            <p className="mt-2">
              Published website prices represent the published India list price. Exact checkout amounts and applicable taxes are determined by the relevant app store at checkout.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Termination &amp; Deletion</h2>
            <p>
              You may terminate your account at any time. Upon termination, your rights to access the service cease immediately. For permanent deletion of personal information and workspace records, please consult our{" "}
              <Link href="/delete-account" className="text-emerald-700 underline font-medium">
                Account &amp; Data Deletion Portal
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Intellectual Property</h2>
            <p>
              All content, trademarks, logos, software code, user interface designs, and documentation comprising the GetCallLead service are owned by {SITE_CONFIG.company.legalName} and are protected under applicable intellectual property laws. You may not copy, modify, distribute, reverse-engineer, or create derivative works from the service without prior written permission.
            </p>
            <p className="mt-2">
              You retain ownership of all customer data you input into the service. By using GetCallLead, you grant us a limited, non-exclusive licence to process your data solely for the purpose of providing the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, {SITE_CONFIG.company.legalName} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, business opportunities, or goodwill, arising from or related to your use of the service.
            </p>
            <p className="mt-2">
              Our total aggregate liability for all claims related to the service shall not exceed the amount you paid to us in the 12 months preceding the event giving rise to the claim, or ₹5,000 (INR), whichever is greater.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless {SITE_CONFIG.company.legalName}, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, costs, or expenses (including reasonable legal fees) arising from your use of the service, violation of these Terms, or infringement of any third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">10. Governing Law &amp; Dispute Resolution</h2>
            <p>
              These Terms are governed by the laws of India. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Ahmedabad, Gujarat, India.
            </p>
            <p className="mt-2">
              Before initiating formal proceedings, both parties agree to attempt resolution through good-faith negotiation for a period of 30 days from written notice of the dispute.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">11. Changes to These Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. If we make material changes, we will notify you via email or through in-app notification at least 30 days before the changes take effect. Your continued use of the service after the effective date constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">12. Contact Information</h2>
            <p>
              If you have any questions regarding these Terms, contact our legal team at{" "}
              <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-emerald-700 underline">
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
