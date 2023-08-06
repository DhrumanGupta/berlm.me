/** @type {import('next').NextConfig} */
const { withPlaiceholder } = require("@plaiceholder/next");

const nextConfig = withPlaiceholder({
  reactStrictMode: true,
  // images: {
  //   domains: ["res.cloudinary.com"],
  // },
  async redirects() {
    return [
      {
        source: "/resume",
        destination: "https://dhrumangupta.github.io/resume.pdf",
        permanent: false,
      },
    ];
  },
});

module.exports = nextConfig;
