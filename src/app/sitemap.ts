import { MetadataRoute } from "next";
import { SITE_CONFIG, HAS_LIVE_STORE } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.domain;
  const routes = [
    "",
    "/features",
    "/pricing",
    "/book-demo",
    "/security",
    "/support",
    "/privacy",
    "/terms",
    "/delete-account",
    "/contact",
  ];

  // Include /download in sitemap only if a store listing is live and verified
  if (HAS_LIVE_STORE) {
    routes.push("/download");
  }

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/features" || route === "/pricing" || route === "/book-demo" ? 0.8 : 0.6,
  }));
}
