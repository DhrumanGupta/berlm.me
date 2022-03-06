import { GetStaticProps, NextPage } from "next";
import MetaDecorator from "../../components/MetaDecorator";

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};

const BlogList: NextPage = () => {
  return (
    <main className="relative mx-10vw">
      <MetaDecorator title="Blogs" description="Read Dhruman's blogs here" />
    </main>
  );
};

export default BlogList;
