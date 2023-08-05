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
        destination:
          "https://docs.google.com/viewer?url=https://github.com/DhrumanGupta/DhrumanGupta/blob/master/resume.pdf?raw=true",
        permanent: false,
      },
    ];
  },
});

module.exports = nextConfig;
