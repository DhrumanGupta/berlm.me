import { getAllPostData } from "@/lib/blog";
import { baseUrl } from "@/lib/constants";
import { getAllProjectData } from "@/lib/projects";

export default async function sitemap() {
  // Get all blogs
  const blogs = await getAllPostData();
  const blogsUrls =
    blogs?.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
    })) ?? [];
  const projects = await getAllProjectData();
  const projectUrls =
    projects?.map((post) => ({
      url: `${baseUrl}/projects/${post.slug}`,
      lastModified: new Date(post.date),
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
    // {
    //   url: `${baseUrl}/resume`,
    //   lastModified: new Date(),
    // },
    { url: `${baseUrl}/projects`, lastModified: new Date() },
    { url: `${baseUrl}/qotw`, lastModified: new Date() },
    ...blogsUrls,
    ...projectUrls,
  ];
}
