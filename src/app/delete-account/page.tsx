"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ShieldAlert,
  CheckCircle2,
  Trash2,
  AlertTriangle,
  FileText,
  Lock,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export default function DeleteAccountPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [identity, setIdentity] = useState("");
  const [accountType, setAccountType] = useState("Staff Member / Sales Rep");
  const [reason, setReason] = useState("No longer using service");
  const [confirmationCheckbox, setConfirmationCheckbox] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [error, setError] = useState("");

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!identity.trim() || identity.length < 5) {
      setError("Please enter a valid registered email or phone number.");
      return;
    }
    setStep(2);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!confirmationCheckbox) {
      setError("You must acknowledge the permanent deletion warning.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/delete-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identity,
          accountType,
          reason,
          confirmationCheckbox,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to process deletion request.");
      }

      setTicketId(data.reference || "REQUEST-RECEIVED");
      setStep(3);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Network error. Please try again or contact support directly.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 sm:py-20 bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge variant="warning" size="md">
            Data Subject Rights
          </Badge>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-950">
            Account & Data Deletion Portal
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Use this page to start an account and data deletion request. Verification is required before any account action is taken.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 mb-10 text-xs font-semibold">
          <div
            className={`flex items-center gap-2 ${
              step >= 1 ? "text-[#0E7C7A]" : "text-slate-600"
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                step >= 1 ? "bg-[#0E7C7A] text-white" : "bg-slate-200 text-slate-700"
              }`}
            >
              1
            </span>
            <span>Identify Account</span>
          </div>
          <div className="h-0.5 w-8 bg-slate-200" />
          <div
            className={`flex items-center gap-2 ${
              step >= 2 ? "text-[#0E7C7A]" : "text-slate-600"
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                step >= 2 ? "bg-[#0E7C7A] text-white" : "bg-slate-200 text-slate-700"
              }`}
            >
              2
            </span>
            <span>Review Scope</span>
          </div>
          <div className="h-0.5 w-8 bg-slate-200" />
          <div
            className={`flex items-center gap-2 ${
              step === 3 ? "text-emerald-600" : "text-slate-600"
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                step === 3 ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"
              }`}
            >
              3
            </span>
            <span>Confirmed</span>
          </div>
        </div>

        {/* Step 1: Input Identity */}
        {step === 1 && (
          <form
            onSubmit={handleStep1Next}
            className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 sm:p-10 shadow-soft-card space-y-6"
          >
            <div>
              <h2 className="text-xl font-bold text-slate-900">Step 1: Enter Account Details</h2>
              <p className="mt-1 text-xs text-slate-500">
                Enter the email or phone number used to register your GetCallLead account.
              </p>
            </div>

            {error && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-700">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="identity"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Registered Email or Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                id="identity"
                type="text"
                required
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                placeholder="name@company.com or +1 415 555 0123"
                className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-[#0E7C7A] focus:ring-2 focus:ring-[#0E7C7A]/20 bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="accountType"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Account Role
                </label>
                <select
                  id="accountType"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                  className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-[#0E7C7A] focus:ring-2 focus:ring-[#0E7C7A]/20 bg-white"
                >
                  <option value="Staff Member / Sales Rep">Staff Member / Sales Rep</option>
                  <option value="Organization Admin">Organization Admin</option>
                  <option value="Individual User">Individual User</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="reason"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Reason for Deletion
                </label>
                <select
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full min-h-[44px] rounded-xl border border-slate-300 px-3.5 text-sm text-slate-900 outline-none focus:border-[#0E7C7A] focus:ring-2 focus:ring-[#0E7C7A]/20 bg-white"
                >
                  <option value="No longer using service">No longer using the service</option>
                  <option value="Switching CRM">Switching to another system</option>
                  <option value="Privacy concerns">Privacy or data concerns</option>
                  <option value="Organization closing">Organization shut down</option>
                  <option value="Other">Other reason</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit" variant="primary" size="md">
                <span>Continue to Data Review</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </form>
        )}

        {/* Step 2: Review Deletion Scope */}
        {step === 2 && (
          <form
            onSubmit={handleFinalSubmit}
            className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 sm:p-10 shadow-soft-card space-y-6"
          >
            <div>
              <h2 className="text-xl font-bold text-slate-900">Step 2: Review Data Erasure Scope</h2>
              <p className="mt-1 text-xs text-slate-500">
                Please carefully review what data will be deleted and what is legally retained.
              </p>
            </div>

            {error && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-700">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* What will be permanently deleted */}
              <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-5">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-sm mb-3">
                  <Trash2 className="h-4 w-4" />
                  <span>Data reviewed for deletion</span>
                </div>
                <ul className="text-xs text-slate-700 space-y-2">
                  <li>• Your user profile, credentials, sessions and notification tokens</li>
                  <li>• Personal preferences and user-specific reminders</li>
                  <li>• Organization membership and access rights</li>
                  <li>• Organization data where you are the verified owner and no retention duty applies</li>
                </ul>
              </div>

              {/* What is legally retained */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-sm mb-3">
                  <Lock className="h-4 w-4" />
                  <span>Records that may be retained</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li>• Financial records retained for applicable accounting or tax obligations</li>
                  <li>• Minimal audit evidence showing that the request was completed</li>
                  <li>• Shared business records owned by an active organization</li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900">
                  <p className="font-semibold">Important Warning</p>
                  <p className="mt-0.5 leading-relaxed">
                    Account deletion is permanent. Once processed, you will lose all access to your assigned leads, calendar follow-ups, and organization workspace.
                  </p>
                  <p className="mt-2 leading-relaxed">
                    Deleting your GetCallLead account does not automatically cancel a subscription billed by Apple or Google. Cancel it separately in your App Store or Google Play subscription settings to prevent future renewal charges.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={confirmationCheckbox}
                  onChange={(e) => setConfirmationCheckbox(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                />
                <span className="font-medium">
                  I understand that this action will permanently delete account records associated with <strong className="text-slate-900">{identity}</strong>.
                </span>
              </label>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-200">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => setStep(1)}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>Back</span>
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={submitting}
                className="bg-rose-600 hover:bg-rose-700 text-white"
              >
                {submitting ? "Submitting Request..." : "Submit Deletion Request"}
              </Button>
            </div>
          </form>
        )}

        {/* Step 3: Success Confirmation with Traceable Reference */}
        {step === 3 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 text-center shadow-soft-card">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mx-auto border border-emerald-100">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <Badge variant="success" size="md" className="mt-4">
              Request Received
            </Badge>

            <h2 className="mt-3 text-2xl font-bold text-slate-900">
              Deletion request received.
            </h2>

            <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              If the information matches an account, verification and next-step instructions will be sent through the registered contact channel.
            </p>

            <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-4 max-w-xs mx-auto">
              <span className="text-xs text-slate-500 font-medium">Traceable Ticket Reference:</span>
              <p className="font-mono text-base font-bold text-[#0E7C7A] mt-1">
                {ticketId}
              </p>
            </div>

            <p className="mt-4 text-xs text-slate-500 max-w-sm mx-auto">
              Retain this reference for support. Processing time depends on verification, organization ownership, shared records, and applicable retention duties.
            </p>

            <div className="mt-8 flex justify-center gap-3">
              <Button href="/" variant="primary" size="md">
                Return to Homepage
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
