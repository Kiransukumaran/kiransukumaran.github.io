const EMAIL_RE = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;

const SPOKEN_MAP: Array<[RegExp, string]> = [
  [/\s+at\s+/gi, "@"],
  [/\s+underscore\s+/gi, "_"],
  [/\s+dash\s+/gi, "-"],
  [/\s+hyphen\s+/gi, "-"],
  [/\s+plus\s+/gi, "+"],
  [/\s+dot\s+/gi, "."],
];

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export function extractEmail(text: string): string | null {
  const direct = text.match(EMAIL_RE)?.[0];
  if (direct) return direct.toLowerCase();

  let spoken = text
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/\b(my email is|email is|it is|it's|the email is)\b/g, " ");

  for (const [pattern, replacement] of SPOKEN_MAP) {
    spoken = spoken.replace(pattern, replacement);
  }

  spoken = spoken.replace(/\s+/g, "");
  const normalized = spoken.match(EMAIL_RE)?.[0];
  return normalized ? normalized.toLowerCase() : null;
}
