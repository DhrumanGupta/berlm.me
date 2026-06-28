import { getAllNoteSlugs } from "@/lib/notes";

export { alt, contentType, default, size } from "./opengraph-image";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllNoteSlugs();
  return slugs.map((slug) => ({ slug }));
}
