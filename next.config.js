/** @type {import('next').NextConfig} */
const { withPlaiceholder } = require("@plaiceholder/next");

const nextConfig = withPlaiceholder({
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
});

module.exports = nextConfig;
