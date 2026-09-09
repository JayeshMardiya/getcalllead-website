"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

export function BookDemoForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    phoneNumber: "",
    workEmail: "",
    teamSizeRange: "1-5",
    callingFlow: "outbound-callbacks",
    message: "",
    consentAccepted: false,
    whatsappConsent: false,
    honeypot: "",
  });

  const [utmParams, setUtmParams] = useState({
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    utmContent: "",
    utmTerm: "",
  });

  const [clientRequestId] = useState(() => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `req-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [referenceCode, setReferenceCode] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      setUtmParams({
        utmSource: urlParams.get("utm_source") || "",
        utmMedium: urlParams.get("utm_medium") || "",
        utmCampaign: urlParams.get("utm_campaign") || "",
        utmContent: urlParams.get("utm_content") || "",
        utmTerm: urlParams.get("utm_term") || "",
      });

      const seatsParam = urlParams.get("seats");
      if (seatsParam) {
        const parsed = Number(seatsParam);
        if (parsed >= 1 && parsed <= 25) {
          setFormData((prev) => ({
            ...prev,
            teamSizeRange: parsed === 1 ? "1" : `${parsed}`,
          }));
        }
      }
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validation
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setErrorMessage("Please enter your full name (minimum 2 characters).");
      return;
    }
    if (!formData.companyName.trim() || formData.companyName.trim().length < 2) {
      setErrorMessage("Please enter your business or company name.");
      return;
    }
    const cleanPhone = formData.phoneNumber.replace(/[^\d+]/g, "");
    if (cleanPhone.length < 7 || cleanPhone.length > 20) {
      setErrorMessage("Please enter a valid mobile or WhatsApp number.");
      return;
    }
    if (!formData.consentAccepted) {
      setErrorMessage("Consent to process and respond to this inquiry is required.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/book-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          companyName: formData.companyName.trim(),
          phoneNumber: cleanPhone,
          workEmail: formData.workEmail.trim() || undefined,
          teamSizeRange: formData.teamSizeRange,
          callingFlow: formData.callingFlow,
          message: formData.message.trim() || undefined,
          consentAccepted: true,
          consentVersion: "v2026-09-07",
          idempotencyKey: clientRequestId,
          honeypot: formData.honeypot || undefined,
          inquiryType: "DEMO_REQUEST",
          sourcePage: "/book-demo",
          ...utmParams,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit demo request.");
      }

      setReferenceCode(result.reference);
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage(
          "We could not record your request at this time. Please email us at support@getcalllead.io.",
        );
      }
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 mx-auto border border-emerald-200">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <span className="mt-4 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
          Inquiry Received
        </span>
        <h2 className="mt-3 text-2xl font-bold text-slate-900">
          Your request has been received.
        </h2>
        <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Thank you, <span className="font-semibold text-slate-900">{formData.fullName}</span>. We have recorded your demo request for <span className="font-semibold text-slate-900">{formData.companyName}</span> ({formData.teamSizeRange} team seats).
        </p>

        <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-4 max-w-sm mx-auto">
          <span className="text-xs text-slate-600 font-medium">Tracking Reference:</span>
          <p className="font-mono text-base font-bold text-emerald-800 mt-0.5">
            {referenceCode}
          </p>
          <p className="mt-1 text-[11px] text-slate-600">
            Save this reference code for correspondence with our sales team.
          </p>
        </div>

        <div className="mt-6 text-xs text-slate-600">
          Verified support channel:{" "}
          <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="font-semibold text-emerald-800 hover:underline">
            {SITE_CONFIG.supportEmail}
          </a>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <Button href="/" variant="primary" size="md">
            Back to Homepage
          </Button>
          <Button href="/pricing" variant="secondary" size="md">
            View Pricing
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Request a GetCallLead Demo</h2>
        <p className="text-xs text-slate-600 mt-0.5">
          Provide your details to connect with our product team.
        </p>
      </div>

      {/* Honeypot field (hidden from keyboard and screen readers) */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-700 flex items-start gap-2.5"
        >
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700 mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Rahul Shah"
            className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
          />
        </div>

        <div>
          <label htmlFor="companyName" className="block text-xs font-semibold text-slate-700 mb-1">
            Company / Business Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            required
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g. Example Distribution Co."
            className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phoneNumber" className="block text-xs font-semibold text-slate-700 mb-1">
            Phone or WhatsApp Number <span className="text-rose-500">*</span>
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="e.g. +1 415 555 0123"
            className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
          />
        </div>

        <div>
          <label htmlFor="workEmail" className="block text-xs font-semibold text-slate-700 mb-1">
            Work Email <span className="text-slate-600 font-normal">(Optional)</span>
          </label>
          <input
            id="workEmail"
            name="workEmail"
            type="email"
            value={formData.workEmail}
            onChange={handleChange}
            placeholder="name@company.com"
            className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="teamSizeRange" className="block text-xs font-semibold text-slate-700 mb-1">
            Sales Team Capacity <span className="text-rose-500">*</span>
          </label>
          <select
            id="teamSizeRange"
            name="teamSizeRange"
            value={formData.teamSizeRange}
            onChange={handleChange}
            className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 bg-white"
          >
            <option value="1">1 user (Owner base plan)</option>
            <option value="2-5">2 to 5 users</option>
            <option value="6-10">6 to 10 users</option>
            <option value="11-20">11 to 20 users</option>
            <option value="21-25">21 to 25 users (Maximum capacity)</option>
          </select>
        </div>

        <div>
          <label htmlFor="callingFlow" className="block text-xs font-semibold text-slate-700 mb-1">
            Primary Calling Workflow
          </label>
          <select
            id="callingFlow"
            name="callingFlow"
            value={formData.callingFlow}
            onChange={handleChange}
            className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 bg-white"
          >
            <option value="outbound-callbacks">Outbound Follow-ups &amp; Callbacks</option>
            <option value="inbound-qualification">Inbound Inquiry Qualification</option>
            <option value="field-sales">Field Sales &amp; Client Visits</option>
            <option value="general-telecalling">General Telecalling &amp; CRM</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1">
          Additional Message <span className="text-slate-600 font-normal">(Optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          placeholder="Describe your calling challenges or specific requirements..."
          className="w-full rounded-xl border border-slate-300 p-3.5 text-sm text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
        />
      </div>

      {/* Consents */}
      <div className="pt-2 space-y-2.5">
        <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
          <input
            type="checkbox"
            name="consentAccepted"
            checked={formData.consentAccepted}
            onChange={handleChange}
            required
            className="h-4 w-4 mt-0.5 rounded border-slate-300 text-emerald-700 accent-emerald-700 shrink-0"
          />
          <span>
            I consent to GetCallLead processing my inquiry data to contact me regarding the demo request.{" "}
            <Link href="/privacy" className="text-emerald-800 underline hover:text-emerald-900">
              Privacy Policy
            </Link>
            . <span className="text-rose-500">*</span>
          </span>
        </label>

        <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
          <input
            type="checkbox"
            name="whatsappConsent"
            checked={formData.whatsappConsent}
            onChange={handleChange}
            className="h-4 w-4 mt-0.5 rounded border-slate-300 text-emerald-700 accent-emerald-700 shrink-0"
          />
          <span>
            I agree to receive demo confirmation and scheduling details via WhatsApp. (Optional)
          </span>
        </label>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full justify-center bg-[#0B6D6B] hover:bg-[#095755] text-white font-semibold shadow-md"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <span>Submitting Request...</span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Send Demo Request
            </span>
          )}
        </Button>
      </div>

      <p className="text-center text-[11px] text-slate-600">
        We do not sell customer contact data. Submissions are encrypted and processed securely.
      </p>
    </form>
  );
}
