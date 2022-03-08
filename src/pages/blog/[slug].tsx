import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";
import { getAllPostSlugs, getPostData } from "../../lib/blog";
import type { PostData as BlogPostData } from "../../lib/blog";
import { getMDXComponent } from "mdx-bundler/client";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import moment from "moment";
import MetaDecorator from "../../components/MetaDecorator";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const postData = await getPostData(slug);
  return {
    props: postData
      ? {
          ...postData,
        }
      : {},
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllPostSlugs();

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: true,
  };
};

const Blog: NextPage<BlogPostData> = ({ code, frontmatter, readingTime }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const Component = getMDXComponent(code);
  return (
    <div className={`set-color-${frontmatter.color}`}>
      <MetaDecorator
        description={frontmatter.description}
        title={frontmatter.title}
      />
      <header className="relative mx-10vw">
        <div className="relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto max-w-7xl mb-12">
          <div className="col-span-full lg:col-span-8 lg:col-start-3">
            <h2 className="leading-tight text-3xl md:text-4xl text-current">
              {frontmatter.title}
            </h2>
            <p className="text-secondary md:text-lg">
              {moment(new Date(frontmatter.date)).format("MMMM Do[,] YYYY")}  &ndash; {readingTime.text}
            </p>
          </div>
        </div>
      </header>
      <main className={`relative mx-10vw`}>
        <article className="relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto max-w-7xl prose prose-light mb-24 dark:prose-dark">
          <Component />
        </article>
      </main>
    </div>
  );
};

export default Blog;
