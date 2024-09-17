import BlogLink from "@/components/blog/BlogLink";
import ProjectLinks from "@/components/projects/ProjectLinks";
import SchemaData from "@/components/SchemaData";
import { baseUrl } from "@/lib/constants";
import { getAllProjectSlugs, getProjectData } from "@/lib/projects";
import moment from "moment";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface IParams {
  params: { slug: string };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
  const postData = await getProjectData(params.slug);
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
      canonical: `/projects/${params.slug}`,
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: `${baseUrl}/projects/${params.slug}`,
      type: "website",
    },
  };
}

const Blog = async ({ params }: IParams) => {
  const postData = await getProjectData(params.slug);

  if (!postData) {
    return redirect("/projects");
  }

  const { frontmatter, code } = postData;

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
  };

  return (
    <>
      <SchemaData data={jsonLd} />
      <header className="relative">
        <div className="relative mb-12">
          <div className="col-span-full">
            <h2 className="leading-tight text-3xl md:text-4xl">
              {frontmatter.title}
            </h2>

            <p className="text-lg my-2">{frontmatter.description}</p>
            <div className="flex gap-x-2 text-secondary">
              <p className="text-secondary md:text-lg">
                {moment(new Date(frontmatter.date)).format("MMMM Do[,] YYYY")}
              </p>

              {frontmatter.links && (
                <>
                  <p>•</p>
                  <ProjectLinks
                    className="child:text-secondary"
                    links={frontmatter.links}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className={`relative 'mx-10vw`}>
        <article className="relative prose prose-light dark:prose-dark mb-6">
          {code}
          <hr />
          <h4>Written by Dhruman Gupta</h4>
          <BlogLink
            className="text-sm"
            href={`https://github.com/DhrumanGupta/berlm.me/tree/master/content/projects/${params.slug}.mdx`}
          >
            Edit on GitHub
          </BlogLink>
        </article>
      </main>
    </>
  );
};

export default Blog;
