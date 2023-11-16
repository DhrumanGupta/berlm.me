import withPlaiceholder from "@plaiceholder/next";
import withBundleAnalyzer from "@next/bundle-analyzer";
import withPlugins from "next-compose-plugins";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/resume",
        destination: "https://dhrumangupta.github.io/resume.pdf",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=180, stale-while-revalidate=180",
          },
        ],
      },
    ];
  },
};

// export default withPlaiceholder(nextConfig);

const analyzerConfig = {
  enabled: process.env.ANALYZE === "true",
  // openAnalyzer: false,
};

export default withPlugins(
  [[withBundleAnalyzer(analyzerConfig)], [withPlaiceholder]],
  nextConfig
);
