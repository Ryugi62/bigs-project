// Recursively pull the first meaningful error message from nested detail payloads.
export function extractErrorMessage(details: unknown): string | undefined {
  if (details == null) return undefined;
  if (typeof details === 'string') {
    const trimmed = details.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }
  if (details instanceof Error) {
    return details.message;
  }
  if (Array.isArray(details)) {
    for (const entry of details) {
      const message = extractErrorMessage(entry);
      if (message) return message;
    }
    return undefined;
  }
  if (typeof details === 'object') {
    for (const value of Object.values(details as Record<string, unknown>)) {
      const message = extractErrorMessage(value);
      if (message) return message;
    }
  }
  return undefined;
}
