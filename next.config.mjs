import withBundleAnalyzer from "@next/bundle-analyzer";
import withPlaiceholder from "@plaiceholder/next";
import createMDX from "@next/mdx";
import withPlugins from "next-compose-plugins";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import removePreContainerDivs from "./rehype-remove-pre-container-divs.mjs";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
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
      remarkFrontmatter,
      remarkMdxFrontmatter,
      remarkGfm,
      remarkMath,
    ],
    rehypePlugins: [
      removePreContainerDivs,
      rehypeSlug,
      rehypeUnwrapImages,
      rehypeKatex,
    ],
  },
});

const analyzerConfig = {
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
};

export default withPlugins(
  [[withBundleAnalyzer(analyzerConfig)], [withPlaiceholder], [withMDX]],
  nextConfig
);
