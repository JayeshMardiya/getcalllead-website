import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Users, PhoneCall, KeyRound, Database } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Security & Architecture | GetCallLead",
  description:
    "Learn about GetCallLead security architecture, workspace isolation, role-based access controls, and data protection practices.",
  alternates: {
    canonical: "/security",
  },
};

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* Skip to main content landmark */}
      <a
        href="#security-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-emerald-500 focus:px-4 focus:py-2 focus:text-slate-950 focus:font-semibold"
      >
        Skip to security overview
      </a>

      {/* Hero Header */}
      <header className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Verified Security Architecture
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Security, Workspace Isolation & Data Practices
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            GetCallLead is built around explicit, verified architecture principles. We state only what our systems actually implement.
          </p>
        </div>
      </header>

      {/* Content Section */}
      <div id="security-content" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2">
          {/* Card 1: Workspace Scoping */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <Users className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-white">Organization-Scoped Access</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Every customer organization operates in its own logical workspace. All queries, lead updates, user assignments, and follow-up schedules are strictly partitioned by organization ID at the backend database layer.
            </p>
          </div>

          {/* Card 2: Transport Security */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <Lock className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-white">Encryption in Transit</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              All communications between mobile applications, web dashboards, and our backend APIs are transmitted strictly over modern HTTPS with TLS 1.3 / TLS 1.2 cipher suites. Plain HTTP requests are rejected.
            </p>
          </div>

          {/* Card 3: Dialler & Call Privacy */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <PhoneCall className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-white">Native Dialler & No Audio Recording</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              GetCallLead initiates phone calls through your device’s native phone dialler. GetCallLead does not secretly record, intercept, or store phone audio. Call outcomes, notes, and callbacks are entered manually by sales reps.
            </p>
          </div>

          {/* Card 4: Service Authentication */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <KeyRound className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-white">HMAC Signed Service Integration</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Public marketing inquiries are forwarded through authenticated server-to-server channels using HMAC-SHA256 signatures, nonce replay protection, and strict timestamp drift validation. Direct client ingestion is prohibited.
            </p>
          </div>

          {/* Card 5: Role-Based Authorization */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-white">Role-Based Access Control (RBAC)</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Workspaces enforce strict privilege boundaries: Owner, Manager, and Staff. Staff members only access leads assigned to them; managers view team-wide schedules; owners retain commercial and seat administration rights.
            </p>
          </div>

          {/* Card 6: Data Privacy Commitment */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <Database className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-white">No Advertising Data Sales</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              We do not sell your organization’s lead records, client phone numbers, or conversation notes to advertising networks or data brokers. Your business records remain exclusively yours.
            </p>
          </div>
        </div>

        {/* Responsible Disclosure & Contact */}
        <div className="mt-16 rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-white">Questions or Security Reports?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300">
            If you have questions regarding our security controls or wish to report a security observation, please email our team at{" "}
            <a href={`mailto:${SITE_CONFIG.company.securityEmail}`} className="font-semibold text-emerald-400 hover:underline">
              {SITE_CONFIG.company.securityEmail}
            </a>.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/book-demo"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Request a Demo
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              View Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
