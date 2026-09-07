import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PhoneCall, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E6F3F2] text-[#0E7C7A] mb-6">
        <PhoneCall className="h-8 w-8" />
      </div>
      <span className="text-xs font-bold uppercase tracking-wider text-[#0E7C7A]">
        404 — Page Not Found
      </span>
      <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
        We could not connect this call.
      </h1>
      <p className="mt-3 max-w-md text-sm sm:text-base text-slate-600">
        The page you are looking for has been moved, removed, or never existed. Let us get you back to the sales pipeline.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button href="/" variant="primary" size="md">
          <Home className="h-4 w-4 mr-1.5" />
          <span>Return Home</span>
        </Button>
        <Button href="/support" variant="secondary" size="md">
          <span>Contact Support</span>
        </Button>
      </div>
    </div>
  );
}
