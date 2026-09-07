"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/site-config";
import { Mail, Clock, CheckCircle2, AlertCircle, Send, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    phoneNumber: "",
    workEmail: "",
    subject: "General Inquiry",
    message: "",
    consentAccepted: false,
    honeypot: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [clientRequestId] = useState(() => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `contact-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setError("Please enter your full name.");
      setLoading(false);
      return;
    }
    if (!formData.phoneNumber.trim() || formData.phoneNumber.trim().length < 7) {
      setError("Please enter a valid phone number.");
      setLoading(false);
      return;
    }
    if (!formData.consentAccepted) {
      setError("Please accept the data processing terms.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/book-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiryType: "CONTACT_REQUEST",
          fullName: formData.fullName.trim(),
          companyName: formData.companyName.trim() || "General Contact",
          phoneNumber: formData.phoneNumber.trim(),
          workEmail: formData.workEmail.trim() || undefined,
          teamSizeRange: "1-5",
          callingFlow: formData.subject,
          message: formData.message.trim() || undefined,
          sourcePage: "/contact",
          consentAccepted: true,
          consentVersion: "v2026-09-07",
          idempotencyKey: clientRequestId,
          honeypot: formData.honeypot || undefined,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send your inquiry.");
      setReferenceCode(result.reference || "REF-RECEIVED");
      setSubmitted(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to send your inquiry. Please email support@getcalllead.io.",
      );
    } finally {
      setLoading(false);
    }
  };

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
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft-card">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Direct Channels</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Customer Support
                    </h3>
                    <a
                      href={`mailto:${SITE_CONFIG.supportEmail}`}
                      className="text-sm font-semibold text-slate-900 hover:text-emerald-700 transition-colors"
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
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Operating Hours
                    </h3>
                    <p className="text-sm font-semibold text-slate-900">
                      Mon – Sat • 9:00 AM – 7:00 PM IST
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-6 text-xs text-slate-500">
                Operated by {SITE_CONFIG.company.legalName}. We process inquiries securely and never share contact information with third parties.
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-soft-card">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mx-auto border border-emerald-100">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-slate-900">
                    Your inquiry has been received.
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                    Thank you, <span className="font-semibold text-slate-900">{formData.fullName}</span>. Our team has received your message and will respond to your contact channel.
                  </p>
                  <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-4 max-w-sm mx-auto">
                    <span className="text-xs text-slate-500 font-medium">Tracking Reference:</span>
                    <p className="font-mono text-base font-bold text-emerald-700 mt-0.5">
                      {referenceCode}
                    </p>
                  </div>
                  <div className="mt-8 flex justify-center gap-3">
                    <Button href="/" variant="primary" size="md">
                      Back to Homepage
                    </Button>
                    <Button href="/support" variant="secondary" size="md">
                      Support Hub
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-xl font-bold text-slate-900">Send an Inquiry</h2>

                  {/* Honeypot */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-700 flex items-start gap-2.5"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Rahul Shah"
                        className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                      />
                    </div>

                    <div>
                      <label htmlFor="companyName" className="block text-xs font-semibold text-slate-700 mb-1">
                        Company Name
                      </label>
                      <input
                        id="companyName"
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Example Distribution Co."
                        className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phoneNumber" className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="phoneNumber"
                        type="tel"
                        required
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                      />
                    </div>

                    <div>
                      <label htmlFor="workEmail" className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        id="workEmail"
                        type="email"
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 mb-1">
                      Inquiry Topic
                    </label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 bg-white"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Product Workflow">Product Workflow &amp; Calling Demo</option>
                      <option value="Subscription Pricing">Subscription &amp; Team Capacity</option>
                      <option value="Technical Support">Technical Support</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help your team?"
                      className="w-full rounded-xl border border-slate-300 p-3.5 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consentAccepted}
                        onChange={(e) => setFormData({ ...formData, consentAccepted: e.target.checked })}
                        required
                        className="h-4 w-4 mt-0.5 rounded border-slate-300 text-emerald-600 accent-emerald-600 shrink-0"
                      />
                      <span>
                        I consent to GetCallLead processing my information to respond to this inquiry.{" "}
                        <Link href="/privacy" className="text-emerald-700 underline">
                          Privacy Policy
                        </Link>
                        . <span className="text-rose-500">*</span>
                      </span>
                    </label>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                      disabled={loading}
                    >
                      {loading ? (
                        <span>Sending Inquiry...</span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Send Contact Inquiry
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
