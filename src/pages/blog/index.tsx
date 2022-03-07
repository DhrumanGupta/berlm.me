import { GetStaticProps, NextPage } from "next";
import MetaDecorator from "../../components/MetaDecorator";
import { getAllPostData } from "../../lib/blog";
import type { MetaData } from "../../lib/blog";

export const getStaticProps: GetStaticProps<{ data: MetaData[] }> = async (
  context
) => {
  const postData = await getAllPostData();
  return {
    props: {
      data: postData,
    },
  };
};

const BlogList: NextPage<{ data: MetaData[] }> = ({ data }) => {
  const temp = [
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
  ];
  return (
    <main className="relative mx-10vw grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <MetaDecorator title="Blogs" description="Read Dhruman's blogs here" />
      {temp.map((blogData) => (
        <div
          className="w-full h-full bg-gray-200 dark:bg-gray-700 p-5 rounded"
          key={blogData.slug}
        >
          <h3 className={"text-lg"}>{blogData.title}</h3>
          <p className={"text-base"}>{blogData.description}</p>
          <p className={"text-base"}>{blogData.image}</p>
          {!blogData.image.includes("undefined") && (
            <img src={require(blogData.image)} />
          )}
        </div>
      ))}
    </main>
  );
};

export default BlogList;
