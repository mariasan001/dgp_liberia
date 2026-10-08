/**
 * HTMLElement is missing in Node SSR. Extending a no-op base lets the module
 * evaluate during Next.js SSR without throwing ReferenceError.
 */
export const SafeHTMLElement: typeof HTMLElement =
  typeof HTMLElement !== 'undefined'
    ? HTMLElement
    : (class {
        // Placeholder for SSR module evaluation only.
      } as unknown as typeof HTMLElement);
