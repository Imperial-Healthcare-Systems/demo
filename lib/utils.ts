/** Joins class names, ignoring anything that is not a non-empty string. */
export function cn(...classes: unknown[]) {
  return classes.filter((c): c is string => typeof c === "string" && c.length > 0).join(" ");
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
