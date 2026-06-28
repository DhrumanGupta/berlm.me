import path from "node:path";
import { fileURLToPath } from "node:url";
import createMDX from "@next/mdx";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const removePreContainerDivs = path.join(
  projectRoot,
  "rehype-remove-pre-container-divs.mjs"
);

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: projectRoot,
  },
  async redirects() {
    return [
      { source: "/blog", destination: "/notes", permanent: true },
      { source: "/blog/:slug", destination: "/notes/:slug", permanent: true },
      { source: "/projects", destination: "/notes", permanent: true },
      {
        source: "/projects/:slug",
        destination: "/notes/:slug",
        permanent: true,
      },
    ];
  },
  async headers() {
    return process.env.NODE_ENV === "production"
      ? [
          {
            source: "/_next/image(.*)",
            headers: [
              {
                key: "Cache-Control",
                value: "public, max-age=180, stale-while-revalidate=180",
              },
            ],
          },
        ]
      : [];
  },
};

const withMDX = createMDX({
  extension: /\.mdx$/,
  options: {
    remarkPlugins: [
      "remark-frontmatter",
      "remark-mdx-frontmatter",
      "remark-gfm",
      "remark-math",
    ],
    rehypePlugins: [
      removePreContainerDivs,
      "rehype-slug",
      "rehype-unwrap-images",
      "rehype-katex",
    ],
  },
});

export default withMDX(nextConfig);
