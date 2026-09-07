const platforms = [
  {
    name: "Android",
    enabled: process.env.NEXT_PUBLIC_ANDROID_STORE_ENABLED === "true",
    value: process.env.NEXT_PUBLIC_PLAY_STORE_URL?.trim() ?? "",
    host: "play.google.com",
    path: /^\/store\/apps\/details$/,
    query: "id",
  },
  {
    name: "iOS",
    enabled: process.env.NEXT_PUBLIC_IOS_STORE_ENABLED === "true",
    value: process.env.NEXT_PUBLIC_APP_STORE_URL?.trim() ?? "",
    host: "apps.apple.com",
    path: /^\/app\/(?:[^/]+\/)?id\d{6,}$/,
  },
];

for (const platform of platforms) {
  if (!platform.enabled) continue;

  let url;
  try {
    url = new URL(platform.value);
  } catch {
    throw new Error(`${platform.name} is enabled but its store URL is not a valid absolute URL.`);
  }

  if (
    url.protocol !== "https:" ||
    url.hostname !== platform.host ||
    !platform.path.test(url.pathname) ||
    /localhost|127\.0\.0\.1|placeholder|testflight|id0+$/i.test(url.href) ||
    (platform.query && !/^com\.[a-z0-9._]+$/i.test(url.searchParams.get(platform.query) ?? ""))
  ) {
    throw new Error(`${platform.name} is enabled but does not point to a valid public store-listing URL.`);
  }

  const response = await fetch(url, {
    redirect: "follow",
    headers: { "user-agent": "CallLeadsStoreLinkValidator/1.0" },
  });
  if (!response.ok) {
    throw new Error(`${platform.name} listing returned HTTP ${response.status}; the build was stopped.`);
  }
}

console.log("Store-link validation passed.");
