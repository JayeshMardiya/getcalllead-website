import React from "react";
import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { SITE_CONFIG } from "@/lib/site-config";
import { Mail, Clock } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | GetCallLead",
  description:
    "Get in touch with the GetCallLead team for product inquiries, sales questions, technical assistance, or subscription support.",
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-20 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="teal" size="md">
            Get In Touch
          </Badge>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
            Contact GetCallLead
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Have questions about GetCallLead, technical support, subscriptions, or sales onboarding?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          {/* Info Side (Static Server Rendered Shell) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft-card">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Direct Channels</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Customer Support
                    </h3>
                    <a
                      href={`mailto:${SITE_CONFIG.supportEmail}`}
                      className="text-sm font-semibold text-slate-900 hover:text-emerald-800 transition-colors"
                    >
                      {SITE_CONFIG.supportEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Operating Hours
                    </h3>
                    <p className="text-sm font-semibold text-slate-900">
                      Mon – Sat • 9:00 AM – 7:00 PM IST
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-6 text-xs text-slate-600">
                Operated by {SITE_CONFIG.company.legalName}. We process inquiries securely and never share contact information with third parties.
              </div>
            </div>
          </div>

          {/* Form Side (Client Island) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-soft-card">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
