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
      <MetaDecorator
        description="Read Dhruman's blogs here"
        image="/facvicon.png"
      />
    </main>
  );
};

export default BlogList;
