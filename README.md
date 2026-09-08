# Call Leads Website (`getcalllead.io`)

The official product-led marketing website for **Call Leads** — a mobile sales CRM built for teams whose primary sales activity happens over the phone.

---

## 🚀 Overview

- **Product Name**: Call Leads
- **Domain**: [getcalllead.io](https://getcalllead.io)
- **Tagline**: Call. Follow up. Close.
- **Category**: Mobile sales CRM
- **Stack**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Lucide Icons

---

## 📁 Routes & Sitemap

| Route | Purpose | Features |
|---|---|---|
| `/` | Main marketing & conversion page | 12 product-led sections, phone mockups, interactive walkthrough, role toggle, FAQ, dark CTA |
| `/features` | Detailed capability breakdown | Lead capture, visual pipeline, calendar scheduling, team ownership, comparison matrix |
| `/pricing` | Production plans and billing FAQ | Monthly, annual, and sales-assisted options tied to the versioned backend pricing policy |
| `/download` | Verified App Store and Google Play links | Per-platform availability; unavailable platforms are hidden; QR appears only for a valid destination |
| `/book-demo` | Interactive demo booking | Client/server validation, generic honeypot response, rate limiting, and durable backend delivery requirement |
| `/support` | Help center & customer care | Troubleshooting guides (calling, notifications, calendar sync), SLA terms, direct deletion portal link |
| `/privacy` | Privacy Policy | Current application data inventory and device-permission disclosure; release reconciliation remains required |
| `/terms` | Terms of Service | Acceptable use policy, subscription terms, anti-telemarketing spam terms |
| `/delete-account` | Account & Data Deletion Portal | Initiates the backend verification workflow without revealing whether an identity exists |
| `/contact` | Company & general inquiries | Direct email channels, operational hours, contact form |
| `/sitemap.xml` | Dynamic XML Sitemap | Next.js dynamic metadata route |
| `/robots.txt` | Crawler directives | Next.js dynamic metadata route |

---

## 🛠️ Local Development

1. **Install dependencies**:
   ```bash
   yarn install
   ```

2. **Run local dev server**:
   ```bash
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

3. **Build for production**:
   ```bash
   yarn build
   ```

4. **Start production server**:
   ```bash
   yarn start
   ```

---

## ⚙️ Configuration

Site configuration and copy constants are maintained in a single typed source of truth:
[`src/lib/site-config.ts`](./src/lib/site-config.ts)

Store availability is configured independently. A platform can be enabled only with its real public listing:
```dotenv
NEXT_PUBLIC_ANDROID_STORE_ENABLED=true
NEXT_PUBLIC_PLAY_STORE_URL=https://play.google.com/store/apps/details?id=com.getcalllead.app
NEXT_PUBLIC_IOS_STORE_ENABLED=false
NEXT_PUBLIC_APP_STORE_URL=
```

The prebuild check rejects empty, placeholder, localhost, TestFlight, wrong-host, malformed, and non-200 listing URLs for enabled platforms.

Set `BACKEND_API_URL` to the production API. Public forms return an error unless the backend confirms durable intake; the website never reports success after a forwarding failure. Configure `WEBSITE_KEY_ID` and the same 32-character-or-longer `WEBSITE_HMAC_SECRET` on the website and backend. Configure separate 32-character-or-longer `IP_RATE_LIMIT_SECRET` and `TRUSTED_PROXY_HEADER_SECRET` values on the website. The reverse proxy must overwrite `x-getcalllead-proxy-auth` with the proxy secret and provide its sanitized `x-forwarded-for` value (or overwrite `x-getcalllead-trusted-client-ip` with the connection IP). Client-supplied authentication values must be discarded. Production must run on Node.js 22.13 or newer.

---

## 🔒 Security & Privacy

- Strict multi-tenant isolation principles.
- Server-side field sanitization and bot honeypot traps.
- Visible keyboard focus and `prefers-reduced-motion` support are implemented; automated and manual accessibility release testing is still required.

## Release state

Do not mark the website released until the public domain serves this application, valid store URLs are enabled, public form records are durably stored and delivered, and the account-deletion workflow is operational in both the mobile app and backend.
