type ClassValue = string | false | null | undefined;

/** Concatena classes, descartando valores falsy. */
export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
