import { baseUrl } from "@/lib/constants";
import { getAllPostData } from "@/lib/blog";

export default async function sitemap() {
  // Get all blogs
  const blogs = await getAllPostData();
  const blogsUrls =
    blogs?.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(),
    })) ?? [];

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
    },
    ...blogsUrls,
  ];
}
