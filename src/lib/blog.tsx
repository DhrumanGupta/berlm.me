import fs from "fs";
import { bundleMDX } from "mdx-bundler";
import path from "path";
import type * as U from "unified";
import type * as H from "hast";

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

const getAllPostSlugs = (): string[] => {
  const files = fs
    .readdirSync(contentPath)
    .map((x) => x.replace(/\.mdx?$/, ""));
  return files;
};

export interface PostData {
  slug: string;
  frontmatter: {
    [key: string]: any;
  };
  code: string;
}

async function getPostData(slug: string): Promise<PostData> {
  const { default: remarkAutolinkHeadings } = await import(
    "remark-autolink-headings"
  );
  const { default: remarkSlug } = await import("remark-slug");
  const { default: gfm } = await import("remark-gfm");

  const fullPath = path.join(contentPath, `${slug}.mdx`);
  const source = fs.readFileSync(fullPath, "utf8");

  const { code, frontmatter } = await bundleMDX({
    source,
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

  frontmatter.date = frontmatter.date.getTime();

  return {
    slug,
    frontmatter,
    code,
  };
}

export { getAllPostSlugs, getPostData };
