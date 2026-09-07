"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./Button";
import { Cookie, X } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("callleads_cookie_consent");
      if (!consent) {
        setIsVisible(true);
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("callleads_cookie_consent", "accepted");
    } catch {}
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem("callleads_cookie_consent", "declined");
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 right-4 left-4 z-50 mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white/95 p-4 sm:p-5 shadow-float backdrop-blur-md transition-all"
    >
      <div className="flex items-start gap-3.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E6F3F2] text-[#0E7C7A]">
          <Cookie className="h-5 w-5" />
        </div>
        <div className="flex-1 text-sm text-slate-600">
          <p className="font-semibold text-slate-900 mb-1">We value your privacy</p>
          <p className="text-xs sm:text-sm leading-relaxed">
            We use essential cookies to provide our services and understand website performance. No personal marketing profiles or third-party ad tracking are used. Read our{" "}
            <Link
              href="/privacy"
              className="font-medium text-[#0E7C7A] underline hover:text-[#0B6D6B]"
            >
              Privacy Policy
            </Link>
            .
          </p>
          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            <Button size="sm" variant="primary" onClick={handleAccept}>
              Accept Essential
            </Button>
            <Button size="sm" variant="outline" onClick={handleDecline}>
              Decline Non-Essential
            </Button>
          </div>
        </div>
        <button
          onClick={handleDecline}
          aria-label="Close cookie banner"
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
