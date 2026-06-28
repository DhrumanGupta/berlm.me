import noteManifest from "@content/notes/manifest.json";
import type { MDXProps } from "mdx/types";
import { cache } from "react";

function toTimestamp(date: string | Date): number {
  return date instanceof Date ? date.getTime() : new Date(date).getTime();
}

function isDraft(frontmatter: { draft?: boolean }): boolean {
  return (
    frontmatter.draft !== undefined &&
    frontmatter.draft &&
    process.env.NODE_ENV === "production"
  );
}

const importNoteMdx = cache(async (slug: string) => {
  return import(`@content/notes/${slug}.mdx`);
});

const getAllNoteSlugs = cache(async (): Promise<string[]> => {
  const notes = await getAllNoteData();
  return notes.map((note) => note.slug);
});

interface NoteLinks {
  github?: string;
  website?: string;
}

interface FrontMatter
  extends Omit<RawFrontMatter, "date" | "image" | "base64" | "readingTime"> {
  date: number;
  image?: string;
  base64?: string;
}

interface RawFrontMatter {
  title: string;
  date: string | Date;
  description: string;
  color: "red" | "blue" | "yellow" | "green";
  draft?: boolean;
  meta?: {
    keywords?: string[];
  };
  imageDescription?: string;
  links?: NoteLinks;
  image?: string;
  base64?: string;
  slug: string;
  readingTime: ReadingTime;
}

interface NoteData {
  slug: string;
  frontmatter: FrontMatter;
  Content: (props: MDXProps) => JSX.Element;
  readingTime: ReadingTime;
}

interface MetaData extends FrontMatter {
  slug: string;
  readingTime: ReadingTime;
}

interface ReadingTime {
  text: string;
  minutes: number;
  time: number;
  words: number;
}

function toMetaData(rawFrontmatter: RawFrontMatter): MetaData {
  return {
    ...rawFrontmatter,
    date: toTimestamp(rawFrontmatter.date),
    readingTime: rawFrontmatter.readingTime,
  };
}

const getAllNoteData = cache(async (): Promise<MetaData[]> => {
  return (noteManifest as RawFrontMatter[])
    .filter((frontmatter) => !isDraft(frontmatter))
    .map(toMetaData);
});

const getNoteData = cache(async (slug: string): Promise<NoteData | null> => {
  const realSlug = slug.replace(/\.mdx$/, "");
  const rawFrontmatter = (noteManifest as RawFrontMatter[]).find(
    (note) => note.slug === realSlug
  );

  if (!rawFrontmatter || isDraft(rawFrontmatter)) {
    return null;
  }

  const mdxModule = await importNoteMdx(realSlug);

  return {
    slug: realSlug,
    frontmatter: {
      ...rawFrontmatter,
      date: toTimestamp(rawFrontmatter.date),
    },
    Content: mdxModule.default,
    readingTime: rawFrontmatter.readingTime,
  };
});

export { getAllNoteData, getAllNoteSlugs, getNoteData };
export type { MetaData, NoteLinks };
