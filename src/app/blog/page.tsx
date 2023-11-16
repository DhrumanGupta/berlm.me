import { Metadata } from "next";
import { getAllPostData } from "@/lib/blog";
import type { MetaData } from "@/lib/blog";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { makeMetaData } from "@/lib/metadata";

export const metadata: Metadata = makeMetaData({
  title: "Blogs",
  description:
    "Welcome to my blog! Here I share and record parts of my life, and cover random topics that I find interesting.",
});

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
  const data = await getAllPostData();

  return (
    <main className="relative">
      <div className={"relative mx-auto mb-6"}>
        {data.map((blogData: MetaData) => (
          <div
            className={`mb-12 set-color-${blogData.color}`}
            key={blogData.slug}
          >
            <div className="relative w-full">
              <Link
                href={`/blog/${blogData.slug}`}
                className="block md:flex group peer focus:outline-none relative w-full md:mb-16"
              >
                <div className="w-full md:w-60  aspect-w-3 aspect-h-2 md:aspect-w-5 md:aspect-h-1 rounded-lg overflow-hidden">
                  <Image
                    src={blogData.image}
                    fill={true}
                    placeholder="blur"
                    blurDataURL={blogData.base64}
                    alt={blogData.imageDescription}
                    className="focus-ring w-full rounded-lg object-cover object-center transition"
                  />
                </div>
                <div className="md:ml-5">
                  <h3
                    className={
                      "text-xl font-medium md:text-2xl text-black dark:text-white mt-5 md:mt-0"
                    }
                  >
                    {blogData.title}
                  </h3>
                  <p
                    className={
                      "text-lg font-medium text-gray-500 dark:text-gray-400"
                    }
                  >
                    {moment(new Date(blogData.date)).format("MMMM Do[,] YYYY")}{" "}
                    &ndash; {blogData.readingTime.text}
                  </p>
                  <p
                    className={
                      "text-lg mt-3 pb-4 text-gray-600 dark:text-gray-300"
                    }
                  >
                    {blogData.description}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default BlogList;
