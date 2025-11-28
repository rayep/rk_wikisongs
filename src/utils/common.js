
export const yearPattern = /\b\d{4}\b/;
export const songNamePattern = /^"/;

export function URLFix(url) {
  return url ? `https:${url}` : url;
}