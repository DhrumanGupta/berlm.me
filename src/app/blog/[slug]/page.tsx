import {
  getAllPostSlugs,
  getClassnameFromKeyword,
  getPostData,
} from "@/lib/blog";
import moment from "moment";
import Image from "next/image";
import BlogLink from "@/components/blog/BlogLink";
import { redirect } from "next/navigation";
import SchemaData from "@/components/SchemaData";
import { baseUrl } from "@/lib/constants";
import Keywords from "@/components/blog/Keywords";
import { Metadata } from "next";

interface IParams {
  params: { slug: string };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
  const postData = await getPostData(params.slug);
  if (!postData) {
    return {
      title: "Not Found",
      description: "The page you were looking for was not found.",
    };
  }

  const { frontmatter } = postData;

  return {
    description: frontmatter.description,
    title: frontmatter.title,
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: `${baseUrl}/blog/${params.slug}`,
      type: "website",
    },
  };
}

const Blog = async ({ params }: IParams) => {
  const postData = await getPostData(params.slug);

  if (!postData) {
    return redirect("/blog");
  }

  const { frontmatter, readingTime, code } = postData;

  const jsonLd = {
    "@type": "BlogPosting",
    name: "Dhruman Gupta",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blogs/${params.slug}`,
    },
    author: {
      "@type": "Person",
      name: "Dhruman Gupta",
      url: baseUrl,
    },
    description: frontmatter.description,
    headline: frontmatter.title,
    datePublished: new Date(frontmatter.date),
    url: `/blogs/${params.slug}`,
    keywords: frontmatter.meta.keywords,
    image: frontmatter.image,
  };

  return (
    <>
      <SchemaData data={jsonLd} />
      <header className="relative">
        <div className="relative mb-12">
          {/* grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6
          mx-auto max-w-7xl */}
          <div className="col-span-full">
            <h2 className="leading-tight text-3xl md:text-4xl">
              {frontmatter.title}
            </h2>
            <p className="text-secondary md:text-lg">
              {moment(new Date(frontmatter.date)).format("MMMM Do[,] YYYY")}{" "}
              &ndash; {readingTime.text}
            </p>

            <Keywords keywords={frontmatter.meta.keywords} />

            <div className="aspect-w-3 aspect-h-4 sm:aspect-w-3 sm:aspect-h-3 md:aspect-w-16 md:aspect-h-9 rounded-lg mt-10 overflow-hidden">
              <Image
                src={frontmatter.image}
                fill={true}
                placeholder="blur"
                blurDataURL={frontmatter.base64}
                alt={frontmatter.imageDescription}
                className="w-full rounded-lg object-cover object-center transition"
              />
            </div>
          </div>
        </div>
      </header>
      <main className={`relative 'mx-10vw`}>
        <article className="relative prose prose-light dark:prose-dark mb-6">
          {/* grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6
          mx-auto max-w-7xl */}
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
