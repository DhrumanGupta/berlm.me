import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { MetaData, getClassnameFromKeyword } from "@/lib/blog";
import Keywords from "./Keywords";

interface BlogListing {
  data: MetaData;
}

export function BlogListing({ data }: BlogListing) {
  return (
    <div className={`mb-12 set-color-${data.color}`}>
      <Link
        href={`/blog/${data.slug}`}
        className="group block md:grid md:grid-cols-4 hover:scale-[1.02] duration-200 ease-in-out transition-all peer focus:outline-none relative w-full md:mb-16"
      >
        <div className="relative w-full aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
          <Image
            src={data.image}
            fill={true}
            placeholder="blur"
            blurDataURL={data.base64}
            alt={data.imageDescription}
            className="focus-ring w-full rounded-lg object-cover object-center transition"
          />
        </div>
        <div className="md:ml-5 col-span-3">
          <h3
            className={
              "text-xl font-medium md:text-2xl text-black dark:text-white mt-5 md:mt-0"
            }
          >
            {data.title}
          </h3>
          <p className={"text-lg font-medium text-gray-500 dark:text-gray-400"}>
            {moment(new Date(data.date)).format("MMMM Do[,] YYYY")} •{" "}
            {data.readingTime.text}
          </p>
          <p
            className={"text-lg mt-3 lg:mt-2 text-gray-600 dark:text-gray-300"}
          >
            {data.description}
          </p>
          <Keywords keywords={data.meta.keywords} />
        </div>
      </Link>
    </div>
  );
}
