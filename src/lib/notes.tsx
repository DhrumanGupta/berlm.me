import fs from "fs";
import fsAsync from "fs/promises";
import path from "path";
import calculateReadingTime from "reading-time";

import NoteImage from "@/components/notes/NoteImage";
import { noteHeadings } from "@/components/notes/NoteHeading";
import NoteLink from "@/components/notes/NoteLink";
import { getPlaiceholder } from "plaiceholder";
import { getPostBySlug, getPostMetaBySlug, MdxData } from "./mdx";
import { getClassnameFromKeyword } from "./note-tags";

const contentPath = path.join(process.cwd(), "content", "notes");

function toTimestamp(date: string | Date): number {
  return date instanceof Date ? date.getTime() : new Date(date).getTime();
}

const getAllNoteSlugs = async (): Promise<string[]> => {
  return (await fs.promises.readdir(contentPath)).map((x) =>
    x.replace(/\.mdx?$/, "")
  );
};

interface NoteLinks {
  github?: string;
  website?: string;
}

interface FrontMatter
  extends Omit<RawFrontMatter, "date" | "image" | "base64"> {
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
}

interface NoteData extends Omit<MdxData, "frontmatter"> {
  slug: string;
  frontmatter: FrontMatter;
  readingTime: ReturnType<typeof calculateReadingTime>;
}

interface MetaData extends FrontMatter {
  slug: string;
  readingTime: ReturnType<typeof calculateReadingTime>;
}

async function getImageAssets(
  slug: string
): Promise<{ image: string; base64: string } | null> {
  const image = `/notes/${slug}/header.webp`;
  const imagePath = path.join(process.cwd(), "public", image);

  if (!fs.existsSync(imagePath)) {
    return null;
  }

  const buffer = await fsAsync.readFile(imagePath);
  const { base64 } = await getPlaiceholder(buffer, { size: 10 });

  return { image, base64 };
}

async function getNoteData(slug: string): Promise<NoteData | null> {
  const postData = await getPostBySlug<RawFrontMatter>(slug, "notes", {
    a: NoteLink,
    img: (props: any) => <NoteImage {...props} slug={slug} />,
    ...noteHeadings,
  });

  if (!postData) {
    return null;
  }

  const { meta: frontmatter, content, fileContent } = postData;

  if (
    frontmatter.draft !== undefined &&
    frontmatter.draft &&
    process.env.NODE_ENV === "production"
  ) {
    return null;
  }

  const imageAssets = await getImageAssets(slug);

  return {
    slug,
    frontmatter: {
      ...frontmatter,
      date: toTimestamp(frontmatter.date),
      ...(imageAssets ?? {}),
    },
    code: content,
    readingTime: calculateReadingTime(fileContent),
  };
}

async function getAllNoteData(): Promise<MetaData[]> {
  const slugs = await getAllNoteSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug): Promise<MetaData | null> => {
      const postData = await getPostMetaBySlug<RawFrontMatter>(slug, "notes");

      if (!postData) {
        return null;
      }

      const { meta, fileContent } = postData;

      if (
        meta.draft !== undefined &&
        meta.draft &&
        process.env.NODE_ENV === "production"
      ) {
        return null;
      }

      return {
        ...meta,
        date: toTimestamp(meta.date),
        slug,
        readingTime: calculateReadingTime(fileContent),
      };
    })
  );
  return posts.filter((x) => Boolean(x)) as MetaData[];
}

export {
  getAllNoteData,
  getAllNoteSlugs,
  getClassnameFromKeyword,
  getNoteData,
};
export type { FrontMatter, MetaData, NoteData, NoteLinks };
