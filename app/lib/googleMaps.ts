function extractIframeSrc(value: string) {
  const match = value.match(/src=["']([^"']+)["']/i);
  return match?.[1] || value;
}

function toGoogleMapsEmbedUrl(value: string) {
  const cleanValue = extractIframeSrc(value.trim());
  if (!cleanValue) return "";

  try {
    const url = new URL(cleanValue);

    if (url.pathname.includes("/maps/embed")) {
      return url.toString();
    }

    const coordinates = url.toString().match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
    if (coordinates) {
      return `https://www.google.com/maps?q=${coordinates[1]},${coordinates[2]}&output=embed`;
    }

    const query =
      url.searchParams.get("query") ||
      url.searchParams.get("q") ||
      url.searchParams.get("destination");
    if (query) {
      return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
    }

    const placeMatch = decodeURIComponent(url.pathname).match(/\/maps\/place\/([^/]+)/);
    if (placeMatch?.[1]) {
      return `https://www.google.com/maps?q=${encodeURIComponent(placeMatch[1].replace(/\+/g, " "))}&output=embed`;
    }
  } catch {
    return `https://www.google.com/maps?q=${encodeURIComponent(cleanValue)}&output=embed`;
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(cleanValue)}&output=embed`;
}

export async function resolveGoogleMapsEmbedUrl(value?: string | null) {
  if (!value) return "";

  const cleanValue = extractIframeSrc(value.trim());
  if (!cleanValue) return "";

  try {
    const url = new URL(cleanValue);
    if (!["maps.app.goo.gl", "goo.gl"].includes(url.hostname)) {
      return toGoogleMapsEmbedUrl(cleanValue);
    }

    let currentUrl = cleanValue;
    for (let i = 0; i < 5; i += 1) {
      const response = await fetch(currentUrl, {
        method: "GET",
        redirect: "manual",
        cache: "no-store",
      });
      const location = response.headers.get("location");
      if (!location) break;
      currentUrl = new URL(location, currentUrl).toString();
    }

    return toGoogleMapsEmbedUrl(currentUrl);
  } catch {
    return toGoogleMapsEmbedUrl(cleanValue);
  }
}
