import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { useMemo } from "react";
import { getAllPostSlugs, getPostData } from "../../lib/blog";
import type { PostData as BlogPostData } from "../../lib/blog";
import { getMDXComponent } from "mdx-bundler/client";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import moment from "moment";
import MetaDecorator from "../../components/MetaDecorator";
import Image from "next/image";
import BlogLink from "../../components/BlogLink";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const postData = await getPostData(slug);
  return {
    props: postData
      ? {
          ...postData,
        }
      : {},
    revalidate: 3600, // 1 hour
  };
};

const getStaticPaths: GetStaticPaths = async () => {
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

  const Component = useMemo(
    () => (code ? getMDXComponent(code) : null),
    [code]
  );

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MetaDecorator
        description={frontmatter.description}
        title={frontmatter.title}
      />
      <header className="relative mx-8vw sm:mx-10vw">
        <div className="relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto max-w-7xl mb-12">
          <div className="col-span-full lg:col-span-8 lg:col-start-3">
            <h2 className="leading-tight text-3xl md:text-4xl text-current">
              {frontmatter.title}
            </h2>
            <p className="text-secondary md:text-lg">
              {moment(new Date(frontmatter.date)).format("MMMM Do[,] YYYY")}{" "}
              &ndash; {readingTime.text}
            </p>

            <div className="aspect-w-3 aspect-h-4 sm:aspect-w-3 sm:aspect-h-3 md:aspect-w-16 md:aspect-h-9 rounded-lg mt-10">
              <Image
                layout={"fill"}
                src={frontmatter.image}
                alt={frontmatter.imageDescription}
                className="w-full rounded-lg object-cover object-center transition"
              />
              <div className="w-full rounded-lg object-cover object-center transition" />
            </div>
          </div>
        </div>
      </header>
      <main className={`relative mx-10vw`}>
        <article className="relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto max-w-7xl prose prose-light pb-20 dark:prose-dark border-b-2 border-gray-300 dark:border-gray-500 mb-20">
          {Component && <Component components={{ a: BlogLink }} />}
          <p>Test</p>
        </article>
      </main>
    </>
  );
};

export default Blog;
export { getStaticPaths, getStaticProps };
