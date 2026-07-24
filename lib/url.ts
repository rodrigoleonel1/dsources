/** Normalizes a URL so trivial variations (http/https, www, trailing slash,
 *  querystring/hash, case) are treated as the same resource for duplicate detection. */
export function normalizeUrl(url: string): string {
  try {
    const u = new URL(url.trim());
    const host = u.hostname.toLowerCase().replace(/^www\./, "");
    const path = u.pathname.replace(/\/+$/, "").toLowerCase();
    return `${host}${path}`;
  } catch {
    return url.trim().toLowerCase();
  }
}
