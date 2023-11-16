// "use client";

import { getPostBySlug } from "@/lib/mdx";
import BlogLink from "@/components/BlogLink";
import { redirect } from "next/navigation";
import { Metadata, Viewport } from "next";
import { makeMetaData, makeViewport } from "@/lib/metadata";

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

const COMPONENTS = {
  p: P,
  h2: H,
  h3: SH,
  a: BlogLink,
  ul: List,
  strong: Bold,
};

const getPageContent = async () => {
  const data = await getPostBySlug("aboutme", "pages", COMPONENTS);

  if (!data) {
    redirect("/");
  }

  return data!.content;
};

export const metadata: Metadata = makeMetaData({ title: "About Me" });
export const viewport: Viewport = makeViewport({});

const Home = async () => {
  const content = await getPageContent();

  return (
    <main>
      <article className={"relative prose prose-light dark:prose-dark mb-6"}>
        {content}
      </article>
    </main>
  );
};

export default Home;
