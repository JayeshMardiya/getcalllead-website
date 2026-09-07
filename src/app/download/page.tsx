import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Smartphone, QrCode, ShieldCheck, CheckCircle2, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Download Call Leads",
  description: "Download Call Leads from a verified Google Play or Apple App Store listing.",
};

export default function DownloadPage() {
  const stores = [
    SITE_CONFIG.stores.android.enabled
      ? { name: "Google Play", url: SITE_CONFIG.stores.android.url }
      : null,
    SITE_CONFIG.stores.ios.enabled
      ? { name: "App Store", url: SITE_CONFIG.stores.ios.url }
      : null,
  ].filter((store): store is { name: string; url: string } => Boolean(store));
  const qrTarget = stores.length === 1 ? stores[0].url : `${SITE_CONFIG.domain}/download`;

  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="teal" size="md">Mobile App</Badge>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
            Download Call Leads
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Manage leads, schedule follow-ups, assign ownership and track every sales conversation from your phone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-soft-card flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E6F3F2] text-[#0E7C7A]">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Call Leads Mobile App</h2>
                  <p className="text-xs text-slate-500">Flutter app for iOS and Android</p>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm text-slate-600 leading-relaxed">
                <p>
                  Call Leads supports tap-to-call, lead qualification, follow-up reminders and call-outcome logging from your phone.
                </p>
                <div className="space-y-2 pt-2">
                  {["Structured lead and follow-up history", "Organization-based access controls", "Local caching for resilient mobile workflows"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-slate-700 text-xs sm:text-sm">
                      <CheckCircle2 className="h-4 w-4 text-[#0E7C7A] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              {stores.length > 0 ? (
                <div className="flex flex-col sm:flex-row gap-3">
                  {stores.map((store, index) => (
                    <Button
                      key={store.name}
                      href={store.url}
                      external
                      variant={index === 0 ? "primary" : "secondary"}
                      size="md"
                      className="flex-1"
                    >
                      <span>{store.name}</span>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <p className="text-sm font-bold text-amber-950">No verified public store listing is available.</p>
                  <p className="mt-1 text-xs leading-relaxed text-amber-800">
                    Download buttons stay hidden until a live listing passes validation. You can still book a product demo or contact support.
                  </p>
                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <Button href="/book-demo" variant="primary" size="sm">Book a Demo</Button>
                    <Button href="/support" variant="secondary" size="sm">Support</Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-slate-50/70 p-8 sm:p-10 flex flex-col justify-between items-center text-center">
            {stores.length > 0 ? (
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-xs ring-1 ring-slate-200 mx-auto">
                  <QrCode className="h-6 w-6 text-[#0E7C7A]" />
                </div>
                <h2 className="mt-4 text-lg font-bold text-slate-900">Scan from your phone</h2>
                <p className="mt-1.5 text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                  This QR code opens {stores.length === 1 ? stores[0].name : "the smart download page"}.
                </p>
                <img
                  src={`https://quickchart.io/qr?text=${encodeURIComponent(qrTarget)}&size=220&margin=2`}
                  width={220}
                  height={220}
                  alt={`QR code for ${stores.length === 1 ? stores[0].name : "Call Leads downloads"}`}
                  className="mt-6 mx-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-xs"
                />
              </div>
            ) : (
              <div className="my-auto">
                <ShieldCheck className="h-10 w-10 text-[#0E7C7A] mx-auto" />
                <h2 className="mt-4 text-lg font-bold text-slate-900">Verified links only</h2>
                <p className="mt-2 text-xs text-slate-600 max-w-xs leading-relaxed">
                  We do not publish placeholder QR codes, private testing links or unavailable platform buttons.
                </p>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-slate-200 w-full">
              <p className="text-xs text-slate-500">
                Need team deployment assistance?{" "}
                <Link href="/book-demo" className="font-semibold text-[#0E7C7A] hover:underline">
                  Book a team demo
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
