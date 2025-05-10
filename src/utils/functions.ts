export function isValidDomain(domain: string): boolean {
  const trimmed = domain.trim();

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("www.")
  ) {
    return false;
  }

  const parts = trimmed.split(".");

  if (parts.length < 2) return false;

  const labelRegex = /^(?!-)[a-zA-Z0-9-]{1,63}(?<!-)$/;
  const tldRegex = /^[a-zA-Z]{2,}$/;

  for (let i = 0; i < parts.length - 1; i++) {
    if (!labelRegex.test(parts[i])) return false;
  }

  const tld = parts[parts.length - 1];
  if (!tldRegex.test(tld)) return false;

  return true;
}
