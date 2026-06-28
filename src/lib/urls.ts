export function encodeHref(href: string) {
  try {
    return new URL(href).href;
  } catch {
    return encodeURI(href);
  }
}
