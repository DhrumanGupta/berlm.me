// import Image from "next/image";
// import moment from "moment";
import Link from "next/link";
import { MetaData } from "@/lib/projects";
import moment from "moment";
import ProjectLinks from "./ProjectLinks";

interface ProjectListing {
  data: MetaData;
}

export function ProjectListing({ data }: ProjectListing) {
  return (
    <div
      className={`md:mx-2 group block hover:scale-[1.02] duration-200 ease-in-out transition-all mb-12 set-color-${data.color} border-b border-secondary pb-4`}
    >
      <Link
        href={`/projects/${data.slug}`}
        className="peer focus:outline-none relative w-full"
      >
        <h3
          className={
            "text-xl font-medium md:text-2xl text-black dark:text-white mt-5 md:mt-0"
          }
        >
          {data.title}
        </h3>
        <p className={"text-lg font-medium text-gray-500 dark:text-gray-400"}>
          {moment(new Date(data.date)).format("MMMM Do[,] YYYY")}
        </p>
        <p className={"text-lg lg:mt-2 text-gray-600 dark:text-gray-300"}>
          {data.description}
        </p>
      </Link>
      <ProjectLinks className="my-2" links={data.links} />
    </div>
  );
}
