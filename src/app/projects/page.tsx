import { ProjectListing } from "@/components/projects/ProjectListing";
import PageHeader from "@/components/typography/PageHeader";
import type { MetaData } from "@/lib/projects";
import { getAllProjectData } from "@/lib/projects";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description: "A list of some of my projects that I find cool or useful.",
  alternates: {
    canonical: `/projects`,
  },
};

const BlogList = async () => {
  const data: MetaData[] = await getAllProjectData();
  data.sort((a, b) => b.date - a.date);
  // const data: MetaData[] = [];

  return (
    <main className="relative min-h-hero">
      <PageHeader>Projects</PageHeader>
      <div className="prose dark:prose-dark pb-4 border-b border-gray-700 dark:border-gray-300">
        <p>
          A list of some of my projects that I find cool or useful. If you want
          a list of all my open-source projects, please visit{" "}
          <a target="_blank" href="https://github.com/DhrumanGupta">
            my GitHub
          </a>
        </p>
      </div>
      <div className={"relative mx-auto my-6"}>
        {data.length <= 0 && (
          <main
            className={
              "h-[calc(30vh)] sm:h-[calc(100vh-27rem)] flex flex-col justify-center"
            }
          >
            <h1 className="leading text-2xl md:text-3xl text-center">
              Coming soon
            </h1>
            <p className="text-lg mt-2 text-center">
              <Link href="/" className="text-current hover:underline">
                Go home?
              </Link>
            </p>
          </main>
        )}
        {data.map((blogData: MetaData) => (
          <ProjectListing key={blogData.slug} data={blogData} />
        ))}
      </div>
    </main>
  );
};

export default BlogList;
