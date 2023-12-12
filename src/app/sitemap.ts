import { baseUrl } from "@/lib/constants";
import { getAllPostData } from "@/lib/blog";
import { getAllProjectData } from "@/lib/projects";

export default async function sitemap() {
  // Get all blogs
  const blogs = await getAllPostData();
  const blogsUrls =
    blogs?.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.date,
    })) ?? [];
  const projects = await getAllProjectData();
  const projectUrls =
    projects?.map((post) => ({
      url: `${baseUrl}/projects/${post.slug}`,
      lastModified: post.date,
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
    ...projectUrls,
  ];
}
