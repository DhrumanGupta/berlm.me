import fs from "fs";
import { bundleMDX } from "mdx-bundler";
import path from "path";
import type * as U from "unified";
import type * as H from "hast";
import matter from "gray-matter";
import calculateReadingTime from 'reading-time'

import { remarkCodeBlocksShiki } from "@kentcdodds/md-temp";

const contentPath = path.join(process.cwd(), "src", "content", "blog");

function removePreContainerDivs() {
  return async function preContainerDivsTransformer(tree: H.Root) {
    const { visit } = await import("unist-util-visit");
    visit(
      tree,
      { type: "element", tagName: "pre" },
      function visitor(node, index, parent) {
        if (parent?.type !== "element") return;
        if (parent.tagName !== "div") return;
        if (parent.children.length !== 1 && index === 0) return;
        Object.assign(parent, node);
      }
    );
  };
}

const remarkPlugins: U.PluggableList = [remarkCodeBlocksShiki];
const rehypePlugins: U.PluggableList = [removePreContainerDivs];

// Get all the slugs
const getAllPostSlugs = async (): Promise<string[]> => {
  return (await fs.promises.readdir(contentPath)).map((x) =>
    x.replace(/\.mdx?$/, "")
  );
};

interface FrontMatter extends Omit<RawFrontMatter, "date"> {
  date: number;
}

interface RawFrontMatter {
  title: string;
  date: Date;
  description: string;
  meta: {
    keywords: string[];
  };
  image: string;
  imageAlt: string;
  color: "red" | "blue" | "yellow"
}

// Typing for our blog's data
interface PostData {
  slug: string;
  frontmatter: FrontMatter;
  code: string;
  readingTime: ReturnType<typeof calculateReadingTime>
}

// Gets a particular blog's data from mdx-bundler
async function getPostData(slug: string): Promise<PostData | null> {
  const pathData = await getMdxPath(slug);

  const { default: remarkAutolinkHeadings } = await import(
    "remark-autolink-headings"
  );
  const { default: remarkSlug } = await import("remark-slug");
  const { default: gfm } = await import("remark-gfm");

  const source = await fs.promises.readFile(pathData.filePath, 'utf-8')

  const { code, frontmatter } = await bundleMDX<RawFrontMatter>({
    source,
    cwd: pathData.directoryPath,
    xdmOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkSlug,
        [remarkAutolinkHeadings, { behavior: "wrap" }],
        gfm,
        ...remarkPlugins,
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        ...rehypePlugins,
      ];
      return options;
    },
  });

  return {
    slug,
    frontmatter: {
      ...frontmatter,
      date: frontmatter.date.getTime(),
    },
    code,
    readingTime: calculateReadingTime(code)
  };
}

// Returns the path of the mdx file from a slug
async function getMdxPath(
  slug: string
): Promise<{ filePath: string; directoryPath: string }> {
  let fullPath = path.join(contentPath, slug);
  let directoryPath: string;

  // if it is a directory, set it as index.mdx
  if (
    fs.existsSync(fullPath) &&
    (await fs.promises.lstat(fullPath)).isDirectory()
  ) {
    fullPath = path.join(fullPath, `index.mdx`);
    directoryPath = fullPath;
  } else {
    fullPath = `${fullPath}.mdx`;
    directoryPath = contentPath;
  }

  return { filePath: fullPath, directoryPath };
}

interface MetaData extends FrontMatter {
  slug: string;
  readingTime: ReturnType<typeof calculateReadingTime>
}

async function getAllPostData(): Promise<MetaData[]> {
  const slugs = await getAllPostSlugs();
  return await Promise.all(
    slugs.map(async (slug): Promise<MetaData> => {
      const pathData = await getMdxPath(slug);

      const fileContents = await fs.promises.readFile(pathData.filePath, 'utf-8');
      const matterResult = matter(fileContents).data as RawFrontMatter;

      return {
        ...matterResult,
        date: matterResult.date.getTime(),
        slug,
        readingTime: calculateReadingTime(fileContents)
      };
    })
  );
}

export { getAllPostSlugs, getPostData, getAllPostData };
export type { PostData, FrontMatter, MetaData };
