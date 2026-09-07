import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { SITE_CONFIG } from "@/lib/site-config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0E7C7A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    default: SITE_CONFIG.seoTitle,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Sales CRM app",
    "Call lead management",
    "Sales follow-up app",
    "Lead follow-up CRM",
    "Call management for sales teams",
    "Mobile CRM for small business",
    "Sales call tracking",
    "Lead assignment software",
  ],
  authors: [{ name: "Call Leads Team" }],
  creator: "Call Leads Ltd",
  publisher: "Call Leads Ltd",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.domain,
    title: SITE_CONFIG.seoTitle,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/brand/call-leads-feature-graphic.png",
        width: 1024,
        height: 500,
        alt: "Call Leads – Mobile Sales CRM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.seoTitle,
    description: SITE_CONFIG.description,
    images: ["/brand/call-leads-feature-graphic.png"],
    creator: "@callleads",
  },
  icons: {
    icon: "/brand/call-leads-icon.png",
    apple: "/brand/call-leads-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: SITE_CONFIG.name,
        operatingSystem: "Android, iOS",
        applicationCategory: "BusinessApplication",
        description: SITE_CONFIG.description,
      },
      {
        "@type": "Organization",
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.domain,
        logo: `${SITE_CONFIG.domain}/brand/call-leads-icon.png`,
        contactPoint: {
          "@type": "ContactPoint",
          email: SITE_CONFIG.supportEmail,
          contactType: "customer service",
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans selection:bg-[#E6F3F2] selection:text-[#0E7C7A]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
