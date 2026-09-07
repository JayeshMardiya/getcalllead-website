"use client";

import React, { useState } from "react";
import Link from "next/link";
import { calculatePricingQuote, formatInr, PRICING_POLICY } from "@/lib/pricing-policy";
import { Check, Info, Users, Sparkles } from "lucide-react";

export function InteractivePricingCalculator() {
  const [seats, setSeats] = useState<number>(5);
  const [billingCycle, setBillingCycle] = useState<"MONTHLY" | "YEARLY">("YEARLY");

  const quote = calculatePricingQuote(seats, billingCycle);

  const handleSeatsChange = (newSeats: number) => {
    const clamped = Math.min(25, Math.max(1, Math.round(newSeats)));
    setSeats(clamped);
  };

  return (
    <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-10 lg:p-12">
      {/* Top Controls: Billing Cycle Toggle & Seats Slider */}
      <div className="flex flex-col items-center justify-between gap-6 border-b border-slate-100 pb-8 sm:flex-row">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            Canonical Pricing Policy V3
          </span>
          <h3 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
            Configure Your Team Capacity
          </h3>
          <p className="text-xs text-slate-500 sm:text-sm">
            Select between 1 and 25 licensed users to view exact plan totals and savings.
          </p>
        </div>

        {/* Monthly vs Annual Toggle */}
        <div
          role="radiogroup"
          aria-label="Billing Cycle"
          className="inline-flex rounded-2xl border border-slate-200 bg-slate-100 p-1"
        >
          <button
            type="button"
            role="radio"
            aria-checked={billingCycle === "MONTHLY"}
            onClick={() => setBillingCycle("MONTHLY")}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition sm:text-sm ${
              billingCycle === "MONTHLY"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={billingCycle === "YEARLY"}
            onClick={() => setBillingCycle("YEARLY")}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition sm:text-sm ${
              billingCycle === "YEARLY"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>Annual</span>
            <span className="rounded-md bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold tracking-tight text-white">
              Save {quote.annualDiscountPercent}%
            </span>
          </button>
        </div>
      </div>

      {/* Interactive Seat Selector */}
      <div className="py-8">
        <div className="flex items-center justify-between">
          <label htmlFor="seat-slider" className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Users className="h-4 w-4 text-emerald-600" />
            Licensed Users: <span className="text-lg font-extrabold text-emerald-700">{seats}</span>
          </label>
          <span className="text-xs text-slate-400">Range: 1 to 25 seats</span>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <button
            type="button"
            aria-label="Decrease seat count"
            onClick={() => handleSeatsChange(seats - 1)}
            disabled={seats <= 1}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-slate-50 text-slate-700 font-bold hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            –
          </button>

          <input
            id="seat-slider"
            type="range"
            min="1"
            max="25"
            step="1"
            value={seats}
            onChange={(e) => handleSeatsChange(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-emerald-600"
          />

          <button
            type="button"
            aria-label="Increase seat count"
            onClick={() => handleSeatsChange(seats + 1)}
            disabled={seats >= 25}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-slate-50 text-slate-700 font-bold hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>

        {/* Quick select buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          {[1, 2, 5, 10, 15, 25].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => handleSeatsChange(preset)}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                seats === preset
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {preset} {preset === 1 ? "seat" : "seats"}
            </button>
          ))}
        </div>
      </div>

      {/* Calculation Display Grid */}
      <div className="grid gap-6 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Box 1: Plan Total */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {billingCycle === "MONTHLY" ? "Monthly Total" : "Annual Total"}
          </p>
          <p className="mt-2 text-3xl font-extrabold text-slate-900">
            {formatInr(quote.activeCycleTotalRupees)}
            <span className="text-sm font-medium text-slate-500">
              /{billingCycle === "MONTHLY" ? "month" : "year"}
            </span>
          </p>
          <p className="mt-2 text-xs text-slate-500">
            First user: {billingCycle === "MONTHLY" ? "₹299/mo" : "₹3,499/yr"}
            {seats > 1 && (
              <>
                {" "}• {seats - 1} added {seats - 1 === 1 ? "user" : "users"} @{" "}
                {billingCycle === "MONTHLY" ? "₹149/mo" : "₹1,188/yr"}
              </>
            )}
          </p>
        </div>

        {/* Box 2: Effective Monthly Rate */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Effective Monthly Rate
          </p>
          <p className="mt-2 text-3xl font-extrabold text-emerald-700">
            {formatInr(quote.effectiveAnnualMonthlyAmount)}
            <span className="text-sm font-medium text-slate-500">/mo</span>
          </p>
          <p className="mt-2 text-xs text-slate-500">
            {billingCycle === "YEARLY"
              ? "Average monthly cost when paid annually"
              : `Total 12 months if paid monthly: ${formatInr(quote.twelveMonthlyPaymentsRupees)}`}
          </p>
        </div>

        {/* Box 3: Exact Annual Savings */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5 shadow-xs sm:col-span-2 lg:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            Exact Annual Savings
          </p>
          <p className="mt-2 text-3xl font-extrabold text-emerald-800">
            {formatInr(quote.annualSavingsRupees)}
            <span className="text-sm font-medium text-emerald-700">/year</span>
          </p>
          <p className="mt-2 text-xs text-emerald-700">
            Calculated vs 12 monthly payments of {formatInr(quote.monthlyTotalRupees)} (Save {quote.annualDiscountPercent}%)
          </p>
        </div>
      </div>

      {/* Feature checklist & CTA */}
      <div className="mt-8 flex flex-col items-center justify-between gap-6 border-t border-slate-100 pt-8 sm:flex-row">
        <div className="space-y-2 text-xs text-slate-600 sm:text-sm">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-600" />
            <span>Full lead capture, calling workflows, and follow-up schedules included</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-600" />
            <span>Role-based workspace security for up to {seats} licensed users</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Info className="h-4 w-4 text-slate-400" />
            <span>Published India list price. Store checkout is authoritative for final localized tax &amp; renewal.</span>
          </div>
        </div>

        <Link
          href={`/book-demo?seats=${seats}&cycle=${billingCycle.toLowerCase()}`}
          className="w-full shrink-0 rounded-xl bg-emerald-600 px-8 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:w-auto"
        >
          Request a Demo for {seats} {seats === 1 ? "User" : "Users"}
        </Link>
      </div>
    </div>
  );
}
