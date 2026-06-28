function stripRelativePrefix(src: string): string {
  return src.startsWith("./") ? src.slice(2) : src;
}

export function getNoteMediaUrl(slug: string, src: string): string {
  const base = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;

  if (!base) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "NEXT_PUBLIC_R2_PUBLIC_URL is not set — note media URLs will be broken."
      );
    }
    return "";
  }

  const filename = stripRelativePrefix(src);
  return `${base.replace(/\/$/, "")}/notes/${slug}/${filename}`;
}
