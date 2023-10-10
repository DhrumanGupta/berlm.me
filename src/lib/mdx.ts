import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkUnwrapImages from "remark-unwrap-images";
import type * as H from "hast";
import { ReactNode } from "react";

export interface MdxData {
  frontmatter: {
    [key: string]: any;
  };
  code: ReactNode;
}

const rootDirectory = `${process.cwd()}/content`;

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

const remarkPlugins = [remarkUnwrapImages];
const rehypePlugins = [removePreContainerDivs];

export const getPostBySlug = async <T>(
  slug: string,
  directory: string,
  components?: any
) => {
  const realSlug = slug.replace(/\.mdx$/, "");
  const dirPath =
    directory.length > 0 ? path.join(rootDirectory, directory) : rootDirectory;
  const filePath = path.join(dirPath, `${realSlug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const { default: remarkAutolinkHeadings } = await import(
    "remark-autolink-headings"
  );
  const { default: remarkSlug } = await import("remark-slug");
  const { default: gfm } = await import("remark-gfm");

  const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });

  const { frontmatter, content } = await compileMDX({
    source: fileContent,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          remarkSlug,
          [remarkAutolinkHeadings, { behavior: "wrap" }],
          gfm,
          ...remarkPlugins,
        ],
        rehypePlugins: rehypePlugins,
      },
    },
    components: components,
  });

  if (frontmatter?.draft && process.env.NODE_ENV === "production") {
    return null;
  }

  // @ts-ignore
  const meta: T = { ...frontmatter, slug: realSlug };

  return { meta, content, fileContent };
};

export const getAllPostsMeta = async (directory: string) => {
  const dir = path.join(rootDirectory, directory);
  const files = fs.readdirSync(dir);

  let posts = [];

  for (const file of files) {
    const { meta, content } = (await getPostBySlug(file, directory))!;
    if (!content) {
      continue;
    }
    posts.push(meta);
  }

  let sortedPosts = posts.sort((p1: any, p2: any) => {
    let date1 = new Date(p1.publishDate);
    let date2 = new Date(p2.publishDate);

    return date1 < date2 ? 1 : date1 > date2 ? -1 : 0;
  });

  return sortedPosts;
};
