import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.domain;
  const routes = [
    "",
    "/features",
    "/pricing",
    "/download",
    "/book-demo",
    "/support",
    "/privacy",
    "/terms",
    "/delete-account",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/features" || route === "/pricing" ? 0.8 : 0.6,
  }));
}
