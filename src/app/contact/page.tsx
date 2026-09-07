"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/site-config";
import { Mail, Clock, MapPin, CheckCircle2, ShieldAlert } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/book-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          companyName: "Not provided",
          workEmail: formData.email,
          phone: "",
          teamSize: "Not provided",
          businessType: formData.subject,
          message: formData.message,
          sourcePage: "/contact",
          consentAccepted: true,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send your inquiry.");
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
    <div className="py-12 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="teal" size="md">
            Get In Touch
          </Badge>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
            Contact Call Leads
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Have questions about the product, support, subscriptions, partnerships, or a team deployment?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Direct Channels</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E6F3F2] text-[#0E7C7A]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Customer Support
                    </h3>
                    <a
                      href={`mailto:${SITE_CONFIG.supportEmail}`}
                      className="text-sm font-semibold text-slate-900 hover:text-[#0E7C7A] transition-colors"
                    >
                      {SITE_CONFIG.supportEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Operating Hours
                    </h3>
                    <p className="text-sm text-slate-800">
                      Monday – Saturday • 9:00 AM – 7:00 PM IST
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">We typically respond within one business day.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Company Information
                    </h3>
                    <p className="text-sm text-slate-800 font-medium">
                      {SITE_CONFIG.company.legalName}
                    </p>
                    {SITE_CONFIG.company.address && (
                      <p className="text-xs text-slate-500 mt-0.5">{SITE_CONFIG.company.address}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-700">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Security Escalation</h3>
                    <a href={`mailto:${SITE_CONFIG.company.securityEmail}?subject=Security%20report`} className="text-sm font-semibold text-slate-900 hover:text-[#0E7C7A] transition-colors">
                      Report a security issue
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-soft-card">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mx-auto">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-slate-900">Your request has been received</h3>
                  <p className="mt-2 text-sm text-slate-600 max-w-sm mx-auto">
                    Thank you for reaching out. We will review your message and reply to {formData.email} shortly.
                  </p>
                  <div className="mt-6">
                    <Button variant="primary" size="md" onClick={() => setSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-xl font-bold text-slate-900">Send an Inquiry</h2>

                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-[#0E7C7A] focus:ring-2 focus:ring-[#0E7C7A]/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-[#0E7C7A] focus:ring-2 focus:ring-[#0E7C7A]/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-[#0E7C7A] focus:ring-2 focus:ring-[#0E7C7A]/20 bg-white"
                    >
                      <option value="General Inquiry">General Product Inquiry</option>
                      <option value="Subscription Help">Subscription Help</option>
                      <option value="Team Deployment">Team Deployment</option>
                      <option value="Partnership">Partnership or Reseller</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can our team help your sales operation?"
                      className="w-full rounded-xl border border-slate-300 p-3 text-sm text-slate-900 outline-none focus:border-[#0E7C7A] focus:ring-2 focus:ring-[#0E7C7A]/20"
                    />
                  </div>

                  <div className="pt-2">
                    {error && <p role="alert" className="mb-3 text-sm text-rose-700">{error}</p>}
                    <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full font-semibold">
                      {loading ? "Sending…" : "Send Message"}
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
