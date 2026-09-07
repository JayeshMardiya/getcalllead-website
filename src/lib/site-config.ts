import { formatInr, PRICING_POLICY } from "@/lib/pricing-policy";

export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureCard {
  id: string;
  title: string;
  tagline: string;
  description: string;
  screenshot: string;
  badge: string;
  colSpan?: string;
}

export interface WalkthroughStep {
  id: string;
  tabLabel: string;
  title: string;
  summary: string;
  details: string[];
  screenshot: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  description: string;
  priceNote: string;
  billingFrequency: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
}

export interface StoreConfig {
  enabled: boolean;
  url: string;
}

function validateStoreUrl(platform: "android" | "ios", config: StoreConfig) {
  if (!config.enabled) return config;

  let url: URL;
  try {
    url = new URL(config.url);
  } catch {
    throw new Error(`Enabled ${platform} store URL must be an absolute HTTPS URL.`);
  }

  const invalidValue =
    url.protocol !== "https:" ||
    /localhost|127\.0\.0\.1|example\.(com|org)|placeholder/i.test(url.href) ||
    /testflight\.apple\.com/i.test(url.hostname) ||
    /id0+$/.test(url.pathname);
  const validListing =
    platform === "android"
      ? url.hostname === "play.google.com" &&
        url.pathname === "/store/apps/details" &&
        /^com\.[a-z0-9._]+$/i.test(url.searchParams.get("id") ?? "")
      : url.hostname === "apps.apple.com" &&
        /\/app\/(?:[^/]+\/)?id\d{6,}$/.test(url.pathname);

  if (invalidValue || !validListing) {
    throw new Error(
      `Enabled ${platform} store URL must point to a real Google Play or Apple App Store listing.`,
    );
  }
  return config;
}

const stores = {
  android: validateStoreUrl("android", {
    enabled: process.env.NEXT_PUBLIC_ANDROID_STORE_ENABLED === "true",
    url: process.env.NEXT_PUBLIC_PLAY_STORE_URL?.trim() ?? "",
  }),
  ios: validateStoreUrl("ios", {
    enabled: process.env.NEXT_PUBLIC_IOS_STORE_ENABLED === "true",
    url: process.env.NEXT_PUBLIC_APP_STORE_URL?.trim() ?? "",
  }),
} as const;

export const SITE_CONFIG = {
  name: "Call Leads",
  seoTitle: "Call Leads – Sales CRM | Mobile CRM Built for Every Call",
  tagline: "Call. Follow up. Close.",
  description:
    "Mobile sales CRM built around every call. Turn call activity into assigned leads, schedule follow-ups, and keep your sales team focused on the next action.",
  domain: "https://getcalllead.io",
  category: "Mobile sales CRM",
  supportEmail: "support@getcalllead.io",
  company: {
    legalName: process.env.NEXT_PUBLIC_LEGAL_NAME?.trim() || "Invention Hill",
    address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS?.trim() || "",
    contactEmail: "support@getcalllead.io",
    salesEmail: "sales@getcalllead.io",
    securityEmail: "support@getcalllead.io",
  },
  productStatus: "production",
  stores,
  cta: {
    primary: "Download Call Leads",
    secondary: "Book a Demo",
  },
  nav: [
    { label: "Features", href: "/features" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Support", href: "/support" },
  ] as NavItem[],
  quickLinks: [
    { label: "Features", href: "/features" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Download App", href: "/download" },
    { label: "Book a Demo", href: "/book-demo" },
    { label: "Support Hub", href: "/support" },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Account & Data Deletion", href: "/delete-account" },
    { label: "Contact Us", href: "/contact" },
  ],
  hero: {
    eyebrow: "Mobile sales CRM built around every call",
    headline: "Turn every call into a lead you can close.",
    supportingText:
      "Capture call activity, assign leads, schedule follow-ups, and keep your sales team focused on the next action.",
    primaryCta: {
      label: "Download Call Leads",
      href: "/download",
    },
    secondaryCta: {
      label: "Book a Demo",
      href: "/book-demo",
    },
    trustNote: "Built for sales teams that work through calls",
  },
  problems: [
    {
      title: "Call details stay in personal call logs",
      description:
        "When reps make sales calls from personal diallers, client contact info and notes stay isolated on private devices, creating dark holes in customer records.",
      icon: "PhoneOff",
    },
    {
      title: "Nobody knows who owns the lead",
      description:
        "Inquiries arrive without unambiguous assignment. Multiple salespeople duplicate work, or leads bounce between team members until they go cold.",
      icon: "UsersRound",
    },
    {
      title: "Follow-ups depend on human memory",
      description:
        "Without strict calendar reminders linked directly to the contact, promised callbacks get forgotten during busy calling hours.",
      icon: "CalendarClock",
    },
    {
      title: "Managers have zero pipeline visibility",
      description:
        "Leaders cannot view call outcomes, pending follow-ups, or neglected leads until end-of-quarter revenue misses occur.",
      icon: "EyeOff",
    },
  ],
  howItWorks: [
    {
      step: "01",
      name: "Capture",
      headline: "Turn calls and caller details into organized leads",
      description:
        "Quickly record incoming or outgoing prospects with structured contact info, organization tags, and instant context right on your phone.",
      screenshot: "/screenshots/03-lead-capture.png",
    },
    {
      step: "02",
      name: "Follow up",
      headline: "Assign ownership, schedule the next call, and log outcomes",
      description:
        "Assign every deal to a designated salesperson. Schedule the next follow-up with calendar alerts, record outcome notes, and update lead stages.",
      screenshot: "/screenshots/04-lead-details.png",
    },
    {
      step: "03",
      name: "Close",
      headline: "Track progress, prevent forgotten leads, and stay accountable",
      description:
        "Move prospects through qualified, proposal sent, converted, and won stages. Give managers complete oversight of team activity and overdue tasks.",
      screenshot: "/screenshots/01-lead-overview.png",
    },
  ],
  features: [
    {
      id: "capture",
      title: "Lead Capture from Calls",
      tagline: "Never lose a number",
      description:
        "Keep caller information connected to the sales workflow. Create and qualify leads right from call interactions with structured fields.",
      screenshot: "/screenshots/03-lead-capture.png",
      badge: "Fast Capture",
      colSpan: "col-span-12 lg:col-span-7",
    },
    {
      id: "pipeline",
      title: "Visual Lead Pipeline",
      tagline: "Stage-by-stage clarity",
      description:
        "Organize leads by stage, status, and priority. Track deals from initial contact to proposal sent and final conversion.",
      screenshot: "/screenshots/01-lead-overview.png",
      badge: "Pipeline",
      colSpan: "col-span-12 lg:col-span-5",
    },
    {
      id: "calendar",
      title: "Follow-Up Scheduling",
      tagline: "Actionable calendar reminders",
      description:
        "Create clear next actions and calendar reminders. Filter follow-ups due today, upcoming, or overdue to ensure zero lost leads.",
      screenshot: "/screenshots/05-follow-up-calendar.png",
      badge: "Schedule",
      colSpan: "col-span-12 lg:col-span-5",
    },
    {
      id: "assignment",
      title: "Team Assignment & Ownership",
      tagline: "Definite responsibility",
      description:
        "Assign every lead to the correct team member. Prevent lead collision and clarify accountability across all field and desk reps.",
      screenshot: "/screenshots/06-team-management.png",
      badge: "Delegation",
      colSpan: "col-span-12 lg:col-span-7",
    },
    {
      id: "history",
      title: "Call Schedule & Outcome History",
      tagline: "Audit trail of every touchpoint",
      description:
        "View upcoming follow-ups, historical call outcomes, and timestamped notes in a chronological activity timeline.",
      screenshot: "/screenshots/04-lead-details.png",
      badge: "Activity",
      colSpan: "col-span-12 lg:col-span-7",
    },
    {
      id: "manager-view",
      title: "Manager Visibility & Reporting",
      tagline: "Executive oversight",
      description:
        "Understand ownership, pending work, and team calling cadence without micromanaging daily sales activities.",
      screenshot: "/screenshots/02-lead-list.png",
      badge: "Governance",
      colSpan: "col-span-12 lg:col-span-5",
    },
  ] as FeatureCard[],
  walkthrough: [
    {
      id: "capture-lead",
      tabLabel: "1. Capture a Lead",
      title: "Instant Mobile Lead Intake",
      summary: "Transform incoming conversations into actionable records in seconds.",
      details: [
        "Capture name, phone number, and company without heavy data entry.",
        "Add initial discussion context and tag the inquiry category.",
        "Ensure leads immediately enter the team's shared pipeline.",
      ],
      screenshot: "/screenshots/03-lead-capture.png",
    },
    {
      id: "assign-ownership",
      tabLabel: "2. Assign Ownership",
      title: "Clear Responsibility for Every Account",
      summary: "Direct leads to the right rep with single-tap delegation.",
      details: [
        "Assign sales ownership to prevent duplicate calls or forgotten prospects.",
        "Maintain role-based security across your organization.",
        "Reps receive instant in-app alerts when new leads are assigned.",
      ],
      screenshot: "/screenshots/06-team-management.png",
    },
    {
      id: "schedule-followup",
      tabLabel: "3. Schedule Follow-up",
      title: "Actionable Reminders & Agenda",
      summary: "Lock in callback commitments before ending the conversation.",
      details: [
        "Pick exact date, time, and specific callback objective.",
        "Categorize follow-ups by urgency: Due Today, Upcoming, or Overdue.",
        "Syncs with calendar workflow so scheduled calls are never missed.",
      ],
      screenshot: "/screenshots/05-follow-up-calendar.png",
    },
    {
      id: "review-history",
      tabLabel: "4. Review Call History",
      title: "Complete Context for Every Touchpoint",
      summary: "View chronological interaction notes before dialing.",
      details: [
        "Log outcomes: Answered, Busy, Proposal Requested, or Follow-up Needed.",
        "Speech dictation support for fast mobile note-taking.",
        "Review previous objections and promises before each conversation.",
      ],
      screenshot: "/screenshots/04-lead-details.png",
    },
    {
      id: "track-pipeline",
      tabLabel: "5. Track Pipeline Progress",
      title: "Visual Sales Velocity",
      summary: "Watch deals advance from qualified prospect to closed business.",
      details: [
        "Monitor stage progression: Qualified, Proposal Sent, Converted, Lost.",
        "Instant filtering by sales representative, date range, or status tag.",
        "Identify stalled deals early and re-engage dormant accounts.",
      ],
      screenshot: "/screenshots/01-lead-overview.png",
    },
  ] as WalkthroughStep[],
  roles: {
    reps: {
      title: "For Sales Representatives",
      subtitle: "Focus on closing conversations, not wrestling complicated desktop CRMs.",
      points: [
        "Know exactly who to call next with prioritized daily task lists.",
        "Keep all contact details, previous notes, and deal history on your phone.",
        "Avoid embarrassing forgotten follow-ups with automated agenda alerts.",
        "Update lead status and log call outcomes in seconds after hanging up.",
      ],
    },
    managers: {
      title: "For Sales Managers",
      subtitle: "Get complete operational clarity on team execution without chasing reps.",
      points: [
        "See lead ownership clearly with no orphaned or unassigned contacts.",
        "Review pending, completed, and overdue follow-ups across the entire roster.",
        "Monitor lead movement through pipeline stages in real time.",
        "Identify neglected leads immediately to redistribute to active reps.",
      ],
    },
  },
  useCases: [
    {
      title: "Inside Sales Teams",
      badge: "High-Volume Calling",
      description:
        "Handle inbound inquiries and scheduled outbound follow-ups with fast outcome logging and zero lost context.",
      benefits: ["Rapid lead assignment", "Call outcome notes", "Follow-up calendar synchronization"],
    },
    {
      title: "Field Sales Teams",
      badge: "On-the-Go Mobility",
      description:
        "Log updates from customer visits and mobile calls immediately from the road without waiting to sit at a desk.",
      benefits: ["Mobile-first interface", "Dictate notes on the move", "Offline-resilient data handling"],
    },
    {
      title: "Phone-Driven Small Businesses",
      badge: "Contractors, Clinics & Agencies",
      description:
        "Ensure every phone consultation turns into an assigned appointment and quote follow-up rather than a forgotten call log.",
      benefits: ["Zero enterprise bloat", "Simple 3-step workflow", "Immediate team accountability"],
    },
  ],
  pricingTiers: [
    {
      id: "pro-monthly",
      name: "Call Leads Pro — Monthly",
      description: "Flexible monthly billing for teams of up to 25 licensed users.",
      priceNote: `${formatInr(PRICING_POLICY.monthly.basePriceMinor)} for 1 user`,
      billingFrequency: `+ ${formatInr(PRICING_POLICY.monthly.additionalUserPriceMinor)} per additional licensed user, billed monthly`,
      features: [
        "1–25 licensed users",
        "Lead capture and pipeline stages",
        "Follow-up scheduling and reminders",
        "Team assignment and manager visibility",
        "Subscription managed through the mobile store",
      ],
      ctaLabel: "Download the App",
      ctaHref: "/download",
      highlighted: false,
    },
    {
      id: "pro-annual",
      name: "Call Leads Pro — Annual",
      badge: "Best Value",
      description: "Annual billing for teams that want one predictable renewal.",
      priceNote: `${formatInr(PRICING_POLICY.annual.basePriceMinor)} for 1 user`,
      billingFrequency: `+ ${formatInr(PRICING_POLICY.annual.additionalUserPriceMinor)} per additional licensed user, billed annually`,
      features: [
        "1–25 licensed users",
        "All Call Leads Pro capabilities",
        "Seven-day trial for eligible self-registrations",
        "Upgrade and downgrade through store subscription controls",
        "Taxes are determined by the applicable app store",
      ],
      ctaLabel: "Download the App",
      ctaHref: "/download",
      highlighted: true,
    },
    {
      id: "sales-assisted",
      name: "Sales-Assisted",
      description: "For organizations that need rollout guidance or custom commercial terms.",
      priceNote: "Contact Sales",
      billingFrequency: "Quoted for the agreed organization scope",
      features: [
        "Guided organization setup",
        "Seat and workflow planning",
        "Commercial terms documented before purchase",
        "Tax treatment shown on the applicable invoice",
      ],
      ctaLabel: "Contact Sales",
      ctaHref: "/contact?subject=sales-assisted",
      highlighted: false,
    },
  ] as PricingPlan[],
  faqs: [
    {
      question: "What is Call Leads?",
      answer:
        "Call Leads is a mobile sales CRM built for teams whose primary sales activity happens over the phone. It turns caller details and phone inquiries into assigned leads with visible next actions and scheduled follow-ups.",
    },
    {
      question: "How does it help with sales calls?",
      answer:
        "Call Leads bridges the gap between phone conversations and CRM updates. You tap to call a lead directly, and immediately record the call outcome, notes, and scheduled callback time so no opportunity is forgotten in a private call log.",
    },
    {
      question: "Can leads be assigned to different team members?",
      answer:
        "Yes. Managers and authorized team members can assign any lead to a specific salesperson. That salesperson receives immediate ownership, and the lead appears in their personal follow-up schedule.",
    },
    {
      question: "Can I schedule follow-up calls?",
      answer:
        "Yes. Call Leads includes a dedicated follow-up scheduler and calendar. You can set specific callback dates and times, view tasks categorized as Due Today, Upcoming, or Overdue, and receive timely reminder notifications.",
    },
    {
      question: "Can managers see team activity?",
      answer:
        "Yes. The management overview displays all organization leads, who owns which account, upcoming callbacks, and overdue actions. This allows managers to identify stalled deals and maintain team accountability.",
    },
    {
      question: "Is Call Leads available for Android and iPhone?",
      answer:
        "Call Leads is built with Flutter for Android and iOS. The download page displays only verified, publicly available store listings for each platform.",
    },
    {
      question: "Can I import existing leads?",
      answer:
        "Yes. Call Leads supports importing existing contact lists through standard CSV formats, as well as integrating with device contacts when granted permission.",
    },
    {
      question: "Is my business data shared with other organizations?",
      answer:
        "Never. Call Leads enforces strict multi-tenant isolation. Your leads, notes, customer phone numbers, and team activity are completely segregated and encrypted. We do not sell data or share lead info with advertisers or third parties.",
    },
    {
      question: "How do I request account deletion?",
      answer:
        "Use the Account & Data Deletion page at /delete-account to start a request, or contact support. Submission does not by itself confirm identity or complete deletion; verification and status instructions are provided through the registered contact channel.",
    },
    {
      question: "How can I contact support?",
      answer:
        "Our support team is available at support@getcalllead.io and through the Support Hub at /support. We typically respond within one business day during published operating hours.",
    },
  ] as FaqItem[],
};

export const HAS_LIVE_STORE =
  SITE_CONFIG.stores.android.enabled || SITE_CONFIG.stores.ios.enabled;
