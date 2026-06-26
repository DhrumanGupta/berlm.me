import PublicationEntry from "@/components/publications/PublicationEntry";
import Link from "@/components/Link";
import { scholarUrl } from "@/lib/constants";
import { publications } from "@/lib/publications";
import { Metadata } from "next";
import { HiArrowUpRight } from "react-icons/hi2";

export const metadata: Metadata = {
  title: "Publications",
  description: "Research papers and preprints.",
  alternates: {
    canonical: `/publications`,
  },
};

export default function PublicationsPage() {
  return (
    <div className="relative min-h-hero pb-8">
      <div className="prose dark:prose-dark max-w-none border-b border-gray-700 pb-4 dark:border-gray-300">
        <p>
          Research papers and preprints.{" "}
          <Link
            href={scholarUrl}
            className="inline-flex items-center gap-1 transition-colors hover:text-accent"
          >
            Google Scholar
            <HiArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </p>
      </div>

      {publications.length === 0 ? (
        <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
          Nothing here yet.
        </p>
      ) : (
        <div>
          {publications.map((publication) => (
            <PublicationEntry
              key={publication.title}
              publication={publication}
            />
          ))}
        </div>
      )}
    </div>
  );
}
