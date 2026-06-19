export function isManagedImage(value?: string | null) {
  return Boolean(
    value &&
      (value.startsWith("/uploads/") ||
        value.startsWith("data:image/") ||
        value.startsWith("https://")),
  );
}
