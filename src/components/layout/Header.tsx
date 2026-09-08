"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HAS_LIVE_STORE, SITE_CONFIG } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { PhoneCall, Menu, X, ArrowRight } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const primaryCtaText = HAS_LIVE_STORE ? SITE_CONFIG.cta.primary : SITE_CONFIG.cta.secondary;
  const primaryCtaHref = HAS_LIVE_STORE ? "/download" : "/book-demo";

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? "border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 focus-visible:outline-none"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0E7C7A] to-[#0A5D5B] text-white shadow-sm ring-1 ring-black/5 group-hover:scale-[1.02] transition-transform">
            <PhoneCall className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-950">
              {SITE_CONFIG.name}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-[#0E7C7A]">
              Mobile Sales CRM
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 rounded-full border border-slate-200/70 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-sm"
        >
          {SITE_CONFIG.nav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            href={HAS_LIVE_STORE ? "/book-demo" : "/support"}
            variant="ghost"
            size="sm"
            className="text-slate-700 hover:text-slate-900"
          >
            {HAS_LIVE_STORE ? "Book a Demo" : "Support"}
          </Button>
          <Button
            href={primaryCtaHref}
            variant="primary"
            size="sm"
            className="font-semibold shadow-sm hover:shadow"
          >
            <span>{primaryCtaText}</span>
            <ArrowRight className="h-4 w-4 ml-0.5" />
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            href={primaryCtaHref}
            variant="primary"
            size="sm"
            className="text-xs px-3 py-1.5 h-9"
          >
            {primaryCtaText}
          </Button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 shadow-sm hover:bg-slate-50"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Slide-down Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/95 px-4 pt-3 pb-6 shadow-xl backdrop-blur-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {SITE_CONFIG.nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-slate-800 hover:bg-slate-50"
              >
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <Button href={HAS_LIVE_STORE ? "/book-demo" : "/pricing"} variant="secondary" size="md" className="w-full">
                {HAS_LIVE_STORE ? "Book a Demo" : "Plans & Pricing"}
              </Button>
              <Button href={primaryCtaHref} variant="primary" size="md" className="w-full">
                {primaryCtaText}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
