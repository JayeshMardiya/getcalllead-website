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
  badge: string;
  iconName: string;
  colSpan?: string;
}

export interface WalkthroughStep {
  id: string;
  stepNumber: string;
  title: string;
  summary: string;
  details: string[];
  iconName: string;
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

export const HAS_LIVE_STORE =
  stores.android.enabled || stores.ios.enabled;

export const SITE_CONFIG = {
  name: "GetCallLead",
  seoTitle: "GetCallLead – Mobile Sales CRM for Phone-First Teams",
  tagline: "Call. Follow up. Close.",
  description:
    "Mobile sales CRM built around phone-first workflows. Assign incoming call leads, schedule follow-ups, and keep reps accountable.",
  domain: "https://getcalllead.io",
  category: "Mobile sales CRM",
  supportEmail: "support@getcalllead.io",
  company: {
    legalName: "Invention Hill",
    operatorText: "GetCallLead is operated by Invention Hill",
    contactEmail: "support@getcalllead.io",
    salesEmail: "support@getcalllead.io",
    securityEmail: "support@getcalllead.io",
  },
  productStatus: "pre-release-evaluation",
  stores,
  cta: {
    primary: "Request a Demo",
    secondary: "See How It Works",
  },
  nav: [
    { label: "Features", href: "/features" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Security", href: "/security" },
    { label: "Support", href: "/support" },
  ] as NavItem[],
  quickLinks: [
    { label: "Features", href: "/features" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Request a Demo", href: "/book-demo" },
    { label: "Security", href: "/security" },
    { label: "Support Hub", href: "/support" },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Security", href: "/security" },
    { label: "Account & Data Deletion", href: "/delete-account" },
    { label: "Contact Us", href: "/contact" },
  ],
  hero: {
    eyebrow: "Phone-first sales CRM",
    headline: "Turn phone calls into assigned leads and closed deals.",
    supportingText:
      "GetCallLead helps sales teams capture call activity, assign ownership, schedule follow-up reminders, and keep managers informed.",
    primaryCta: {
      label: "Request a Demo",
      href: "/book-demo",
    },
    secondaryCta: {
      label: "See How It Works",
      href: "/#how-it-works",
    },
    trustNote: "Designed for phone-driven sales teams across India",
  },
  problems: [
    {
      title: "Call details remain in personal call logs",
      description:
        "When reps make sales calls from personal diallers, client contact info and notes stay isolated on private devices rather than in a team workspace.",
      icon: "PhoneOff",
    },
    {
      title: "Unclear lead ownership across the team",
      description:
        "Inquiries arrive without unambiguous assignment. Multiple salespeople duplicate work, or leads bounce between team members until they go cold.",
      icon: "UsersRound",
    },
    {
      title: "Follow-ups depend on human memory",
      description:
        "Without structured calendar reminders linked directly to the contact, promised callbacks get forgotten during busy calling hours.",
      icon: "CalendarClock",
    },
    {
      title: "Limited visibility into calling outcomes",
      description:
        "Sales leaders cannot view call outcomes, pending follow-ups, or neglected leads until missed revenue targets occur.",
      icon: "EyeOff",
    },
  ],
  howItWorks: [
    {
      stepNumber: "01",
      title: "Capture and Qualify",
      summary: "Add or receive a lead through released mobile and web forms.",
      details: [
        "Record contact name, phone number, and business context.",
        "Add initial inquiry notes and categorize by business priority.",
        "Leads enter your organization workspace immediately.",
      ],
      iconName: "UserPlus",
    },
    {
      stepNumber: "02",
      title: "Call and Record Outcome",
      summary: "Initiate calls via the native phone dialler and log structured outcomes.",
      details: [
        "Tap to initiate the phone call through your device's native dialler.",
        "GetCallLead does not secretly record telephone audio.",
        "Reps manually record outcomes, call notes, and updated deal stages.",
      ],
      iconName: "PhoneCall",
    },
    {
      stepNumber: "03",
      title: "Schedule Next Action",
      summary: "Never hang up without scheduling the next callback commitment.",
      details: [
        "Select specific callback date, time, and discussion objective.",
        "Filter follow-ups due today, upcoming, or overdue.",
        "Assign follow-up reminders to the responsible sales rep.",
      ],
      iconName: "CalendarCheck",
    },
  ] as WalkthroughStep[],
  features: [
    {
      id: "capture",
      title: "Structured Lead Intake",
      tagline: "Organized contact records",
      description:
        "Keep caller information connected to the sales workflow. Create and qualify leads with structured contact details and source tags.",
      badge: "Intake",
      iconName: "UserPlus",
      colSpan: "col-span-12 lg:col-span-6",
    },
    {
      id: "pipeline",
      title: "Stage-by-Stage Pipeline",
      tagline: "Clear deal progression",
      description:
        "Track prospects from initial contact to proposal sent and final conversion with defined team pipeline stages.",
      badge: "Pipeline",
      iconName: "Kanban",
      colSpan: "col-span-12 lg:col-span-6",
    },
    {
      id: "calendar",
      title: "Follow-Up Scheduling",
      tagline: "Actionable calendar reminders",
      description:
        "Create clear next actions with designated dates and times. Filter tasks by Due Today, Upcoming, and Overdue.",
      badge: "Schedule",
      iconName: "Calendar",
      colSpan: "col-span-12 lg:col-span-6",
    },
    {
      id: "assignment",
      title: "Team Ownership & Assignment",
      tagline: "Clear accountability",
      description:
        "Assign every lead to an authorized team member. Clarify who owns the next touchpoint and prevent duplicate outreach.",
      badge: "Team",
      iconName: "Users",
      colSpan: "col-span-12 lg:col-span-6",
    },
  ] as FeatureCard[],
  roles: {
    reps: {
      title: "For Sales Representatives",
      subtitle: "Focus on closing conversations without administrative complexity.",
      points: [
        "Know exactly who to call next with prioritized daily task views.",
        "Keep client contact details, notes, and deal history accessible on mobile.",
        "Avoid forgotten follow-ups with scheduled calendar callback alerts.",
        "Log outcomes and update stages quickly after completing calls.",
      ],
    },
    managers: {
      title: "For Sales Managers",
      subtitle: "Operational clarity on team execution and pending callbacks.",
      points: [
        "Review lead ownership clearly across your sales roster.",
        "View pending, completed, and overdue follow-ups across the team.",
        "Monitor lead progression through pipeline stages.",
        "Reassign neglected or unassigned leads to active reps.",
      ],
    },
  },
  pricingTiers: [
    {
      id: "pro-monthly",
      name: "GetCallLead Pro — Monthly",
      description: "Published India list price for teams of 1 to 25 licensed users.",
      priceNote: "₹299/mo for first user",
      billingFrequency: "+ ₹149/mo per additional licensed user",
      features: [
        "1–25 licensed users supported",
        "Lead intake and pipeline stages",
        "Follow-up scheduling and reminders",
        "Team assignment and manager visibility",
        "Planned mobile store subscription",
      ],
      ctaLabel: "Request a Demo",
      ctaHref: "/book-demo",
      highlighted: false,
    },
    {
      id: "pro-annual",
      name: "GetCallLead Pro — Annual",
      badge: "Annual Savings",
      description: "Annual commitment with effective ₹99/mo for each additional seat.",
      priceNote: "₹3,499/yr for first user",
      billingFrequency: "+ ₹1,188/yr per additional user (effective ₹99/mo)",
      features: [
        "1–25 licensed users supported",
        "All GetCallLead Pro capabilities",
        "Predictable single annual renewal",
        "Exact savings calculated by seat count",
        "Taxes determined at store checkout",
      ],
      ctaLabel: "Request a Demo",
      ctaHref: "/book-demo",
      highlighted: true,
    },
  ] as PricingPlan[],
  faqs: [
    {
      question: "What is GetCallLead?",
      answer:
        "GetCallLead is a sales CRM designed for teams whose primary sales activity happens over the phone. It turns phone inquiries and caller details into assigned leads with scheduled follow-ups and outcome notes.",
    },
    {
      question: "How does GetCallLead handle telephone calls?",
      answer:
        "The user taps to initiate calls through their native phone dialler. GetCallLead does not secretly record telephone audio. The rep manually records the outcome, notes, and scheduled next action after the call.",
    },
    {
      question: "How does team assignment work?",
      answer:
        "Organization owners and managers can assign any lead to a specific team member. That representative receives clear ownership and the lead appears in their personal follow-up schedule.",
    },
    {
      question: "How are follow-up reminders scheduled?",
      answer:
        "GetCallLead includes a dedicated follow-up schedule. You choose a specific callback date, time, and purpose, and categorize tasks as Due Today, Upcoming, or Overdue.",
    },
    {
      question: "How is customer data separated?",
      answer:
        "Organization-scoped access controls keep customer workspaces separated. Data is transmitted over HTTPS, and access within each workspace is controlled by assigned organization roles.",
    },
    {
      question: "Do you sell or share customer lead data?",
      answer:
        "We do not sell your organization's lead data to advertisers or third parties. Your customer records are used solely to deliver the service to your workspace.",
    },
    {
      question: "Is GetCallLead currently available in mobile app stores?",
      answer:
        "GetCallLead is currently being prepared for public mobile-store release. Request a demo to review the current product workflow with our team.",
    },
    {
      question: "How do I request account deletion?",
      answer:
        "Submit a request at /delete-account. Identity verification instructions will be sent to the registered contact channel before account records are purged.",
    },
    {
      question: "How can I contact the GetCallLead team?",
      answer:
        "You can reach us by submitting a demo request at /book-demo or emailing support@getcalllead.io.",
    },
  ] as FaqItem[],
};
