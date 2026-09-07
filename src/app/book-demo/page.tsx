"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Calendar,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  Clock,
  ShieldCheck,
  Building,
  Users,
} from "lucide-react";

export default function BookDemoPage() {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    workEmail: "",
    phone: "",
    teamSize: "1-5",
    businessType: "Inside Sales",
    message: "",
    consentAccepted: true,
    honeypot: "",
  });

  const [utmParams, setUtmParams] = useState({
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
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
      });
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

    // Client-side quick checks
    if (!formData.name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!formData.workEmail.trim()) {
      setErrorMessage("Please enter a valid work email address.");
      return;
    }
    if (!formData.consentAccepted) {
      setErrorMessage("Please accept the data processing terms to proceed.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/book-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...utmParams,
          sourcePage: "/book-demo",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit demo request.");
      }

      setReferenceCode(result.reference || "DEMO-CONFIRMED");
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Network error. Please check your connection or email support@getcalllead.io.");
      }
    }
  };

  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column: Context & Expectations */}
          <div className="lg:col-span-5">
            <Badge variant="teal" size="md">
              Live Product Demonstration
            </Badge>
            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              See how Call Leads stops missed sales callbacks.
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              Schedule a 20-minute live demonstration tailored to your team’s calling volume. We will walk you through lead intake, assignment rules, calendar alerts, and manager reporting.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-2xl bg-white border border-slate-200/90 p-4 shadow-xs">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E6F3F2] text-[#0E7C7A]">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">20-Minute Focused Walkthrough</h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    No high-pressure sales pitch. We show you the actual mobile app workflow.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl bg-white border border-slate-200/90 p-4 shadow-xs">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E6F3F2] text-[#0E7C7A]">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Team Structure Review</h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Configure rep assignments, manager visibility, and stage workflows for your business.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl bg-white border border-slate-200/90 p-4 shadow-xs">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E6F3F2] text-[#0E7C7A]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Dedicated Tenant Privacy</h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Organization access controls keep tenant records separated from other customers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-soft-card">
              {status === "success" ? (
                <div className="text-center py-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mx-auto border border-emerald-100">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <Badge variant="success" size="sm" className="mt-4">
                    Inquiry Received
                  </Badge>
                  <h2 className="mt-3 text-2xl font-bold text-slate-900">
                    Your request has been received
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Our team will review the request and contact you at <span className="font-semibold text-slate-900">{formData.workEmail}</span>. We typically respond within one business day.
                  </p>

                  <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-4 max-w-sm mx-auto">
                    <span className="text-xs text-slate-500 font-medium">Tracking Reference:</span>
                    <p className="font-mono text-sm font-bold text-[#0E7C7A] mt-0.5">
                      {referenceCode}
                    </p>
                  </div>

                  <div className="mt-8 flex justify-center gap-3">
                    <Button href="/" variant="primary" size="md">
                      Back to Homepage
                    </Button>
                    <Button href="/download" variant="secondary" size="md">
                      Download the App
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Book Your Demo</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Fill out the details below to connect with a product specialist.
                    </p>
                  </div>

                  {/* Honeypot field (hidden from users, traps bots) */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

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
                      <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-[#0E7C7A] focus:ring-2 focus:ring-[#0E7C7A]/20"
                      />
                    </div>

                    <div>
                      <label htmlFor="workEmail" className="block text-xs font-semibold text-slate-700 mb-1">
                        Work Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="workEmail"
                        name="workEmail"
                        type="email"
                        required
                        value={formData.workEmail}
                        onChange={handleChange}
                        placeholder="sarah@company.com"
                        className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-[#0E7C7A] focus:ring-2 focus:ring-[#0E7C7A]/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="companyName" className="block text-xs font-semibold text-slate-700 mb-1">
                        Company Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Acme Sales Corp"
                        className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-[#0E7C7A] focus:ring-2 focus:ring-[#0E7C7A]/20"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-[#0E7C7A] focus:ring-2 focus:ring-[#0E7C7A]/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="teamSize" className="block text-xs font-semibold text-slate-700 mb-1">
                        Sales Team Size
                      </label>
                      <select
                        id="teamSize"
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleChange}
                        className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-[#0E7C7A] focus:ring-2 focus:ring-[#0E7C7A]/20 bg-white"
                      >
                        <option value="1-5">1 - 5 Sales Reps</option>
                        <option value="6-15">6 - 15 Sales Reps</option>
                        <option value="16-50">16 - 50 Sales Reps</option>
                        <option value="50+">50+ Enterprise Reps</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="businessType" className="block text-xs font-semibold text-slate-700 mb-1">
                        Primary Calling Flow
                      </label>
                      <select
                        id="businessType"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-[#0E7C7A] focus:ring-2 focus:ring-[#0E7C7A]/20 bg-white"
                      >
                        <option value="Inside Sales">Inbound & Inside Sales</option>
                        <option value="Field Sales">Field Sales & Site Visits</option>
                        <option value="Small Business">Direct Service / Appointments</option>
                        <option value="Other">Other Sales Model</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1">
                      Specific Questions or Follow-up Challenges
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your current call tracking or CRM setup..."
                      className="w-full rounded-xl border border-slate-300 p-3 text-sm text-slate-900 outline-none focus:border-[#0E7C7A] focus:ring-2 focus:ring-[#0E7C7A]/20"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        name="consentAccepted"
                        checked={formData.consentAccepted}
                        onChange={handleChange}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0E7C7A] focus:ring-[#0E7C7A]"
                      />
                      <span>
                        I agree to have Call Leads store and process my business inquiry according to the{" "}
                        <Link href="/privacy" className="text-[#0E7C7A] underline">
                          Privacy Policy
                        </Link>
                        . No marketing spam.
                      </span>
                    </label>
                  </div>

                  <div className="pt-3">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={status === "submitting"}
                      className="w-full font-semibold shadow-md"
                    >
                      {status === "submitting" ? "Processing Request..." : "Request Product Demo"}
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
