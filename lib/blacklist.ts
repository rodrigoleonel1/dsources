/**
 * Lightweight spam filter for community-submitted resources. Not meant to be
 * exhaustive — it's a cheap first line of defense before something reaches
 * the moderation queue. Extend these lists as needed, no external service
 * required.
 */
const BANNED_WORDS = [
  "viagra",
  "cialis",
  "porn",
  "xxx",
  "casino online",
  "bet365",
  "onlyfans",
  "replica watches",
  "crack gratis",
  "keygen",
];

const BANNED_DOMAINS = ["bit.ly", "tinyurl.com", "is.gd", "cutt.ly"];

export function findBannedWord(text: string): string | null {
  const lower = text.toLowerCase();
  return BANNED_WORDS.find((w) => lower.includes(w)) ?? null;
}

export function isBannedDomain(url: string): boolean {
  try {
    const host = new URL(url).hostname.toLowerCase().replace(/^www\./, "");
    return BANNED_DOMAINS.includes(host);
  } catch {
    return false;
  }
}

/** Runs every blacklist check against a submission; returns a user-facing reason or null if clean. */
export function checkBlacklist(input: {
  name: string;
  description: string;
  url: string;
  tags: string[];
}): string | null {
  const combinedText = `${input.name} ${input.description} ${input.tags.join(" ")}`;
  const bannedWord = findBannedWord(combinedText);
  if (bannedWord) {
    return "El contenido enviado no cumple con las normas de la comunidad.";
  }
  if (isBannedDomain(input.url)) {
    return "No se aceptan enlaces acortados o de ese dominio. Usá la URL directa.";
  }
  return null;
}
