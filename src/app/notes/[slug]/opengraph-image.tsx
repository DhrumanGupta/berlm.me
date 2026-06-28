import {
  createFallbackNoteSocialImageResponse,
  createNoteSocialImageResponse,
  noteSocialImageContentType,
  noteSocialImageSize,
} from "@/lib/note-social-image";
import { getAllNoteSlugs, getNoteData } from "@/lib/notes";

export const alt = "Note preview";
export const size = noteSocialImageSize;
export const contentType = noteSocialImageContentType;

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllNoteSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface IParams {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: IParams) {
  const { slug } = await params;
  const noteData = await getNoteData(slug);

  if (!noteData) {
    return createFallbackNoteSocialImageResponse();
  }

  const { frontmatter, readingTime } = noteData;

  return createNoteSocialImageResponse({
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    readingTime: readingTime.text,
    color: frontmatter.color,
  });
}
