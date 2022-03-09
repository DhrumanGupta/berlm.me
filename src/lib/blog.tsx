import fs from "fs";
import { bundleMDX } from "mdx-bundler";
import path from "path";
import type * as U from "unified";
import type * as H from "hast";
import matter from "gray-matter";
import calculateReadingTime from "reading-time";

import { remarkCodeBlocksShiki } from "@kentcdodds/md-temp";
import { getMdxPath, MdxData } from "./mdx";
import { getPlaiceholder } from "plaiceholder";
import { IGetCSSReturn } from "plaiceholder/dist/css";

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

interface FrontMatter extends Omit<RawFrontMatter, "date" | "image"> {
  date: number;
  image: {
    src: string;
    [key: string]: any;
    height?: number;
    width?: number;
  };
  imageFillCss: IGetCSSReturn;
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
  const pathData = await getMdxPath({ fileName: slug, contentPath });

  if (!pathData) return null;

  const { default: remarkAutolinkHeadings } = await import(
    "remark-autolink-headings"
  );
  const { default: remarkSlug } = await import("remark-slug");
  const { default: gfm } = await import("remark-gfm");

  const source = await fs.promises.readFile(pathData.filePath, "utf-8");

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

  const { css, img }: { css: IGetCSSReturn; img: any } = await getPlaiceholder(
    frontmatter.image
  );

  delete img.height;
  delete img.width;

  return {
    slug,
    frontmatter: {
      ...frontmatter,
      date: frontmatter.date.getTime(),
      image: img,
      imageFillCss: css,
    },
    code,
    readingTime: calculateReadingTime(code),
  };
}

// Returns the path of the mdx file from a slug

interface MetaData extends FrontMatter {
  slug: string;
  readingTime: ReturnType<typeof calculateReadingTime>;
}

async function getAllPostData(): Promise<MetaData[]> {
  const slugs = await getAllPostSlugs();
  return await Promise.all(
    slugs.map(async (slug): Promise<MetaData> => {
      const pathData = await getMdxPath({ fileName: slug, contentPath });

      const fileContents = await fs.promises.readFile(
        // @ts-ignore since we know these files exist
        pathData.filePath,
        "utf-8"
      );
      const matterResult = matter(fileContents).data as RawFrontMatter;

      const { css, img }: { css: IGetCSSReturn; img: any } =
        await getPlaiceholder(matterResult.image);

      delete img.height;
      delete img.width;

      return {
        ...matterResult,
        date: matterResult.date.getTime(),
        slug,
        readingTime: calculateReadingTime(fileContents),
        image: img,
        imageFillCss: css,
      };
    })
  );
}

export { getAllPostSlugs, getPostData, getAllPostData };
export type { PostData, FrontMatter, MetaData };
