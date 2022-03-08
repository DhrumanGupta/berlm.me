import { GetStaticProps, NextPage } from "next";
import MetaDecorator from "../../components/MetaDecorator";
import { getAllPostData } from "../../lib/blog";
import type { MetaData } from "../../lib/blog";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

export const getStaticProps: GetStaticProps<{ data: MetaData[] }> = async (
  context
) => {
  const postData = await getAllPostData();
  return {
    props: {
      data: postData,
    },
    revalidate: 3600, // 1 hour
  };
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

const BlogList: NextPage<{ data: MetaData[] }> = ({ data }) => {
  // const keywords = getKeywords(datas);

  return (
    <main className="relative mx-8vw md:mx-10vw">
      <MetaDecorator title="Blogs" description="Read Dhruman's blogs here" />
      {/* <div className="max-w-7xl mx-auto mb-20">
        {keywords.map((keyword) => (
          <span key={keyword}>{keyword}</span>
        ))}
      </div> */}
      <div className="relative grid grid-cols-4 gap-x-6 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-8 mx-auto max-w-7xl mb-64">
        {data.map((blogData) => (
          <div
            className={`col-span-4 mb-12 set-color-${blogData.color}`}
            key={blogData.slug}
          >
            <div className="relative w-full">
              <Link href={`/blog/${blogData.slug}`}>
                <a className="group peer focus:outline-none relative block w-full">
                  <div className="aspect-w-8 aspect-h-5 rounded-lg">
                    <Image
                      layout={"fill"}
                      src={blogData.image}
                      alt={blogData.imageDescription}
                      className="focus-ring w-full rounded-lg object-cover object-center transition"
                    />
                    <div className="focus-ring w-full rounded-lg object-cover object-center transition" />
                  </div>
                  <p
                    className={
                      "mt-5 text-xl font-medium text-gray-500 dark:text-gray-400"
                    }
                  >
                    {moment(new Date(blogData.date)).format("MMMM Do[,] YYYY")}{" "}
                    &ndash; {blogData.readingTime.text}
                  </p>
                  <h3
                    className={
                      "text-xl font-medium md:text-2xl text-black dark:text-white mt-1.5"
                    }
                  >
                    {blogData.title}
                  </h3>
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default BlogList;
