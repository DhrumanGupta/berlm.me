import fs from "fs";
import fsAsync from "fs/promises";
import path from "path";
import calculateReadingTime from "reading-time";

import { getPostBySlug, MdxData } from "./mdx";
import { getPlaiceholder } from "plaiceholder";
import BlogImage from "@/components/blog/BlogImage";
import BlogLink from "@/components/blog/BlogLink";

const contentPath = path.join(process.cwd(), "content", "blog");
// Get all the slugs
const getAllPostSlugs = async (): Promise<string[]> => {
  return (await fs.promises.readdir(contentPath)).map((x) =>
    x.replace(/\.mdx?$/, "")
  );
};

interface CSS {
  backgroundImage: string;
  backgroundPosition: string;
  backgroundSize: string;
  backgroundRepeat: string;
}

interface FrontMatter extends Omit<RawFrontMatter, "date" | "image"> {
  date: number;
  image: string;
  base64: string;
}

interface RawFrontMatter {
  title: string;
  date: Date;
  description: string;
  meta: {
    keywords: string[];
  };
  image: string;
  imageDescription: string;
  color: "red" | "blue" | "yellow";
  draft?: boolean;
}

// Typing for our blog's data
interface PostData extends Omit<MdxData, "frontmatter"> {
  slug: string;
  frontmatter: FrontMatter;
  readingTime: ReturnType<typeof calculateReadingTime>;
}

// Gets a particular blog's data from mdx-bundler
async function getPostData(slug: string): Promise<PostData | null> {
  const postData = await getPostBySlug<RawFrontMatter>(slug, "blog", {
    a: BlogLink,
    img: (props: any) => <BlogImage {...props} slug={slug} />,
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

  // since we can infer the image from the slug, we can add it to the frontmatter
  frontmatter.image = `/blog/${slug}/header.png`;

  const base64 = await getImagePlaiceholder(frontmatter.image);

  return {
    slug,
    frontmatter: {
      ...frontmatter,
      date: frontmatter.date.getTime(),
      image: frontmatter.image,
      base64,
    },
    code: content,
    readingTime: calculateReadingTime(fileContent),
  };
}

// Returns the path of the mdx file from a slug

interface MetaData extends FrontMatter {
  slug: string;
  readingTime: ReturnType<typeof calculateReadingTime>;
}

const getImagePlaiceholder = async (image: string) => {
  const buffer = await fsAsync.readFile(path.join("./public", image));

  const { base64 } = await getPlaiceholder(buffer, {
    size: 10,
  });

  return base64;
};

async function getAllPostData(): Promise<MetaData[]> {
  const slugs = await getAllPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug): Promise<MetaData | null> => {
      const postData = await getPostBySlug<RawFrontMatter>(slug, "blog");

      if (!postData) {
        return null;
      }

      const { meta, content, fileContent } = postData;

      // const matterResult = matter(fileContents).data as RawFrontMatter;
      if (
        meta.draft !== undefined &&
        meta.draft &&
        process.env.NODE_ENV === "production"
      ) {
        return null;
      }

      // since we can infer the image from the slug, we can add it to the frontmatter
      meta.image = `/blog/${slug}/header.png`;

      const base64 = await getImagePlaiceholder(meta.image);

      return {
        ...meta,
        date: meta.date.getTime(),
        slug,
        readingTime: calculateReadingTime(fileContent),
        base64,
      };
    })
  );
  return posts.filter((x) => Boolean(x)) as MetaData[];
}

interface KeywordMapping {
  [key: string]: string;
}

const KEYWORD_MAPPING: KeywordMapping = {
  personal: "bg-red-500",
  learning: "bg-blue-500",
};

const getClassnameFromKeyword = (keyword: string): string => {
  return KEYWORD_MAPPING[keyword] || "bg-yellow-500";
};

export {
  getAllPostSlugs,
  getPostData,
  getAllPostData,
  getClassnameFromKeyword,
};
export type { PostData, FrontMatter, MetaData };
