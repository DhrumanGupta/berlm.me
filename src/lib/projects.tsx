import fs from "fs";
import fsAsync from "fs/promises";
import path from "path";
import { getPostBySlug, MdxData } from "./mdx";
import BlogLink from "@/components/blog/BlogLink";
import BlogImage from "@/components/blog/BlogImage";

const contentPath = path.join(process.cwd(), "content", "projects");
// Get all the slugs
const getAllProjectSlugs = async (): Promise<string[]> => {
  return (await fs.promises.readdir(contentPath)).map((x) =>
    x.replace(/\.mdx?$/, "")
  );
};

interface FrontMatter extends Omit<RawFrontMatter, "date"> {
  date: number;
}

interface ProjectLinks {
  github?: string;
  website?: string;
}

interface RawFrontMatter {
  title: string;
  date: Date;
  description: string;
  color: "red" | "blue" | "yellow";
  draft?: boolean;
  links?: ProjectLinks;
}

// Typing for our blog's data
interface ProjectData extends Omit<MdxData, "frontmatter"> {
  slug: string;
  frontmatter: FrontMatter;
}

// Gets a particular blog's data from mdx-bundler
async function getProjectData(slug: string): Promise<ProjectData | null> {
  const postData = await getPostBySlug<RawFrontMatter>(slug, "projects", {
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
  return {
    slug,
    frontmatter: {
      ...frontmatter,
      date: frontmatter.date.getTime(),
    },
    code: content,
  };
}

// Returns the path of the mdx file from a slug

interface MetaData extends FrontMatter {
  slug: string;
}

async function getAllProjectData(): Promise<MetaData[]> {
  const slugs = await getAllProjectSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug): Promise<MetaData | null> => {
      const postData = await getPostBySlug<RawFrontMatter>(slug, "projects");

      if (!postData) {
        return null;
      }

      const { meta } = postData;

      // const matterResult = matter(fileContents).data as RawFrontMatter;
      if (
        meta.draft !== undefined &&
        meta.draft &&
        process.env.NODE_ENV === "production"
      ) {
        return null;
      }

      return {
        ...meta,
        date: meta.date.getTime(),
        slug,
      };
    })
  );
  return posts.filter((x) => Boolean(x)) as MetaData[];
}

export { getAllProjectSlugs, getProjectData, getAllProjectData };
export type { ProjectData, FrontMatter, MetaData, ProjectLinks };
