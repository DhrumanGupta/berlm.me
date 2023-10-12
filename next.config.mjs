import withPlaiceholder from "@plaiceholder/next";

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
        source: "/(.*).jpg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=180, stale-while-revalidate=180",
          },
        ],
      },
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

export default withPlaiceholder(nextConfig);
