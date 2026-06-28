import ListingPage from "@/components/listing/ListingPage";
import Link from "@/components/Link";
import PublicationEntry from "@/components/publications/PublicationEntry";
import { ArrowUpRightIcon } from "@/components/icons";
import { scholarUrl } from "@/lib/constants";
import { publications } from "@/lib/publications";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publications",
  description: "Research papers and preprints.",
  alternates: {
    canonical: `/publications`,
  },
};

export default function PublicationsPage() {
  return (
    <ListingPage
      intro={
        <p>
          Research papers and preprints.{" "}
          <Link
            href={scholarUrl}
            className="inline-flex items-center gap-1 transition-colors hover:text-accent"
          >
            Google Scholar
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </Link>
        </p>
      }
      isEmpty={publications.length === 0}
    >
      {publications.map((publication) => (
        <PublicationEntry
          key={publication.title}
          publication={publication}
        />
      ))}
    </ListingPage>
  );
}
