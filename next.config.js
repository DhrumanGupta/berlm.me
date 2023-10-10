// import withPlaiceholder from "@plaiceholder/next";

// /**
//  * @type {import('next').NextConfig}
//  */
// const nextConfig = {
//   reactStrictMode: true,
//   async redirects() {
//     return [
//       {
//         source: "/resume",
//         destination: "https://dhrumangupta.github.io/resume.pdf",
//         permanent: false,
//       },
//     ];
//   },
// };

// export default withPlaicholder(nextConfig);

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
