import { getAllPostSlugs, getPostData } from "@/lib/blog";
import moment from "moment";
import Image from "next/image";
import BlogLink from "@/components/BlogLink";
import { redirect } from "next/navigation";
import { makeMetaData } from "@/lib/metadata";
import clsx from "clsx";

interface IParams {
  params: { slug: string };
}

interface KeywordMapping {
  [key: string]: string;
}

const KEYWORD_MAPPING: KeywordMapping = {
  personal: "bg-red-500",
  learning: "bg-blue-500",
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: IParams) {
  const postData = await getPostData(params.slug);
  if (!postData) {
    return makeMetaData({
      title: "Not Found",
      description: "The page you were looking for was not found.",
    });
  }

  const { frontmatter } = postData;

  return makeMetaData({
    description: frontmatter.description,
    title: frontmatter.title,
  });
}

const Blog = async ({ params }: IParams) => {
  const postData = await getPostData(params.slug);

  if (!postData) {
    return redirect("/blog");
  }

  const { frontmatter, readingTime, code } = postData;

  return (
    <>
      <header className="relative mx-8vw sm:mx-10vw">
        <div className="relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto max-w-7xl mb-12">
          <div className="col-span-full lg:col-span-8 lg:col-start-3">
            <h2 className="leading-tight text-3xl md:text-4xl">
              {frontmatter.title}
            </h2>
            <p className="text-secondary md:text-lg">
              {moment(new Date(frontmatter.date)).format("MMMM Do[,] YYYY")}{" "}
              &ndash; {readingTime.text}
            </p>

            <div className="flex gap-x-4 mt-4">
              {frontmatter.meta.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className={clsx(
                    "rounded py-1 px-3 text-sm",
                    KEYWORD_MAPPING[keyword]
                  )}
                >
                  {keyword}
                </span>
              ))}
            </div>

            <div className="aspect-w-3 aspect-h-4 sm:aspect-w-3 sm:aspect-h-3 md:aspect-w-16 md:aspect-h-9 rounded-lg mt-10 overflow-hidden">
              <Image
                src={frontmatter.image}
                layout={"fill"}
                placeholder="blur"
                blurDataURL={frontmatter.base64}
                alt={frontmatter.imageDescription}
                className="w-full rounded-lg object-cover object-center transition"
              />
            </div>
          </div>
        </div>
      </header>
      <main className={`relative mx-10vw`}>
        <article className="relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto max-w-7xl prose prose-light dark:prose-dark mb-6">
          {code}
          <hr />
          <h4>Written by Dhruman Gupta</h4>
          <BlogLink
            className="text-sm"
            href={`https://github.com/DhrumanGupta/berlm.me/tree/master/content/blog/${params.slug}.mdx`}
          >
            Edit on GitHub
          </BlogLink>
        </article>
      </main>
    </>
  );
};

export default Blog;
