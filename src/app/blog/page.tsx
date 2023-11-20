import { Metadata } from "next";
import { getAllPostData } from "@/lib/blog";
import type { MetaData } from "@/lib/blog";
import Link from "next/link";
import PageHeader from "@/components/typography/PageHeader";
import { BlogListing } from "@/components/blog/BlogListing";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Welcome to my blog! Here I share and record parts of my life, and cover random topics that I find interesting.",
  alternates: {
    canonical: `/blog`,
  },
};

const getKeywords = (metadata: MetaData[]): string[] => {
  const keywords: string[] = [];
  metadata.forEach((data) => {
    data.meta?.keywords?.forEach((keyword) => {
      if (!keywords.includes(keyword)) {
        keywords.push(keyword);
      }
    });
  });

  return keywords;
};

const BlogList = async () => {
  const data: MetaData[] = await getAllPostData();
  // const data: MetaData[] = [];

  return (
    <main className="relative min-h-[calc(100vh-16rem)]">
      <PageHeader>Blog</PageHeader>
      <div className="prose dark:prose-dark pb-4 border-b border-gray-700 dark:border-gray-300">
        <p>
          Diving into the world of blogging for the first time, come along as I
          share my life – one post at a time!
        </p>
      </div>
      <div className={"relative mx-auto my-6"}>
        {data.length <= 0 && (
          <main
            className={
              "h-[calc(30vh)] sm:h-[calc(100vh-27rem)] flex flex-col justify-center"
            }
          >
            <h1 className="leading text-2xl md:text-3xl text-center">
              Coming soon
            </h1>
            <p className="text-lg mt-2 text-center">
              <Link href="/" className="text-current hover:underline">
                Go home?
              </Link>
            </p>
          </main>
        )}
        {data.map((blogData: MetaData) => (
          <BlogListing key={blogData.slug} data={blogData} />
        ))}
      </div>
    </main>
  );
};

export default BlogList;
