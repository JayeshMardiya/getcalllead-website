"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";

export function ContactForm() {
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
    if (formData.message.trim().length < 5) {
      setError("Please enter your message or question (at least 5 characters).");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 mx-auto border border-emerald-200">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-slate-900">
          Your inquiry has been received.
        </h2>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
          Thank you, <span className="font-semibold text-slate-900">{formData.fullName}</span>. Our team has received your message and will respond to your contact channel.
        </p>
        <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-4 max-w-sm mx-auto">
          <span className="text-xs text-slate-600 font-medium">Tracking Reference:</span>
          <p className="font-mono text-base font-bold text-emerald-800 mt-0.5">
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
    );
  }

  return (
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
          <label htmlFor="contactFullName" className="block text-xs font-semibold text-slate-700 mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="contactFullName"
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="e.g. Rahul Shah"
            className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
          />
        </div>

        <div>
          <label htmlFor="contactCompanyName" className="block text-xs font-semibold text-slate-700 mb-1">
            Company Name
          </label>
          <input
            id="contactCompanyName"
            type="text"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            placeholder="e.g. Example Distribution Co."
            className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contactPhoneNumber" className="block text-xs font-semibold text-slate-700 mb-1">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <input
            id="contactPhoneNumber"
            type="tel"
            required
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            placeholder="e.g. +91 98765 43210"
            className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
          />
        </div>

        <div>
          <label htmlFor="contactWorkEmail" className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address <span className="text-slate-600 font-normal">(Optional)</span>
          </label>
          <input
            id="contactWorkEmail"
            type="email"
            value={formData.workEmail}
            onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
            placeholder="name@company.com"
            className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contactSubject" className="block text-xs font-semibold text-slate-700 mb-1">
          Inquiry Topic
        </label>
        <select
          id="contactSubject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 bg-white"
        >
          <option value="General Inquiry">General Inquiry</option>
          <option value="Product Workflow">Product Workflow &amp; Calling Demo</option>
          <option value="Subscription Pricing">Subscription &amp; Team Capacity</option>
          <option value="Technical Support">Technical Support</option>
        </select>
      </div>

      <div>
        <label htmlFor="contactMessage" className="block text-xs font-semibold text-slate-700 mb-1">
          Message
        </label>
        <textarea
          id="contactMessage"
          required
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="How can we help your team?"
          className="w-full rounded-xl border border-slate-300 p-3.5 text-sm text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
        />
      </div>

      <div className="pt-2">
        <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.consentAccepted}
            onChange={(e) => setFormData({ ...formData, consentAccepted: e.target.checked })}
            required
            className="h-4 w-4 mt-0.5 rounded border-slate-300 text-emerald-700 accent-emerald-700 shrink-0"
          />
          <span>
            I consent to GetCallLead processing my information to respond to this inquiry.{" "}
            <Link href="/privacy" className="text-emerald-800 underline hover:text-emerald-900">
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
          className="w-full justify-center bg-[#0B6D6B] hover:bg-[#095755] text-white font-semibold shadow-md"
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
  );
}
