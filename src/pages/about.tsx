import type { GetStaticProps, NextPage } from "next";
import { useMemo } from "react";
import MetaDecorator from "../components/MetaDecorator";
import { MdxData, readMdx } from "../lib/mdx";
import { getMDXComponent } from "mdx-bundler/client";
import BlogLink from "../components/BlogLink";
import { join } from "path";

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
  const data = await readMdx({ fileName: join("pages", "aboutme") });
  return {
    props: {
      ...data,
    },
  };
};

const Home: NextPage<MdxData> = ({ code }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <main className={"relative mx-10vw"}>
      <MetaDecorator
        title="About Dhruman Gupta"
        name={"About Dhruman Gupta"}
        description="Learn about Dhruman Gupta"
      />
      <article
        className={
          "relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto max-w-7xl prose prose-light dark:prose-dark mb-6"
        }
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
      </article>
    </main>
  );
};

export default Home;
