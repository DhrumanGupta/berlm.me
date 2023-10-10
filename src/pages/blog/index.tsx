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
  // console.log(postData);
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
    <main className="relative mx-8vw md:mx-10vw lg:mx-20vw">
      <MetaDecorator title="Blogs" description="Read Dhruman's blogs here" />
      <div
        className={
          "relative mx-auto max-w-7xl mb-6"
          // + grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6
        }
      >
        {Array(5)
          .fill(data[0])
          .map((blogData: MetaData) => (
            <div
              className={`mb-12 set-color-${blogData.color}`}
              key={blogData.slug}
            >
              <div className="relative w-full">
                <Link href={`/blog/${blogData.slug}`}>
                  <a className="block md:flex group peer focus:outline-none relative w-full">
                    <div className="w-full md:w-64 aspect-w-3 aspect-h-2 md:aspect-w-3 md:aspect-h-2 rounded-lg overflow-hidden">
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          bottom: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          transform: "scale(1.1)",
                          filter: "blur(40px)",
                          ...blogData.imageFillCss,
                        }}
                      />

                      <Image
                        {...blogData.image}
                        layout={"fill"}
                        alt={blogData.imageDescription}
                        className="focus-ring w-full rounded-lg object-cover object-center transition"
                      />
                    </div>
                    <h3
                      className={
                        "text-xl font-medium md:text-2xl text-black dark:text-white mt-5"
                      }
                    >
                      {blogData.title}
                    </h3>
                    <p
                      className={
                        "text-xl font-medium text-gray-500 dark:text-gray-400"
                      }
                    >
                      {moment(new Date(blogData.date)).format(
                        "MMMM Do[,] YYYY"
                      )}{" "}
                      &ndash; {blogData.readingTime.text}
                    </p>
                    <p
                      className={
                        "text-lg mt-3 pb-4 text-gray-600 dark:text-gray-300"
                      }
                    >
                      {blogData.description}
                    </p>
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
