// "use client";

import { getPostBySlug } from "@/lib/mdx";
import BlogLink from "@/components/BlogLink";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { makeMetaData } from "@/lib/metadata";

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

export const metadata: Metadata = makeMetaData({
  title: "About",
  description:
    "Hi there! I'm Dhruman Gupta, a student and software dev studying at Ashoka University.",
});

const Home = async () => {
  const content = await getPageContent();

  return (
    <main className={"relative mx-10vw"}>
      <article
        className={
          "relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto max-w-7xl prose prose-light dark:prose-dark mb-6"
        }
      >
        {content}
      </article>
    </main>
  );
};

export default Home;
