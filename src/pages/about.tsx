import type { GetStaticProps, NextPage } from "next";
import { useMemo } from "react";
import MetaDecorator from "../components/MetaDecorator";
import { MdxData, readMdx } from "../lib/mdx";
import { getMDXComponent } from "mdx-bundler/client";
import BlogLink from "../components/BlogLink";

const H: any = ({ children }: any) => {
  return <h2 className={"my-2"}>{children}</h2>;
};

const SH: any = ({ children }: any) => {
  return <h3 className={"my-1"}>{children}</h3>;
};

const P: any = ({ children }: any) => {
  return <p className={"text-lg lg:text-xl"}>{children}</p>;
};

const List: any = ({ children }: any) => {
  return (
    <P>
      <ul>{children}</ul>
    </P>
  );
};

const Bold: any = ({ children }: any) => {
  return (
    <P>
      <b>{children}</b>
    </P>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await readMdx({ fileName: "aboutme" });
  return {
    props: {
      ...data,
    },
  };
};

const Home: NextPage<MdxData> = ({ code }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <div className={"relative mx-10vw"}>
      <MetaDecorator
        title="About Dhruman Gupta"
        name={"About Dhruman Gupta"}
        description="Learn about Dhruman Gupta"
      />
      <main
        className={"relative max-w-4xl prose prose-light dark:prose-dark mb-16"}
      >
        <Component
          components={{
            p: P,
            h2: H,
            h3: SH,
            a: BlogLink,
            ul: List,
            strong: Bold,
          }}
        />
      </main>
    </div>
  );
};

export default Home;
