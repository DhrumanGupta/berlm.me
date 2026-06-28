import ListingSection from "@/components/listing/ListingSection";
import SectionHeading from "@/components/listing/SectionHeading";
import PublicationAuthors from "@/components/publications/PublicationAuthors";
import PublicationLinks from "@/components/publications/PublicationLinks";
import {
  getPrimaryPublicationLink,
  type Publication,
} from "@/lib/publications";

function formatVenue(publication: Publication) {
  const parts = [publication.venue];

  if (publication.status) {
    parts.push(publication.status);
  }

  parts.push(String(publication.year));

  return parts.join(" · ");
}

function PublicationTitle({
  publication,
  compact,
}: {
  publication: Publication;
  compact?: boolean;
}) {
  const href = getPrimaryPublicationLink(publication);
  const className = compact
    ? "text-gray-600 transition-colors group-hover:text-accent dark:text-gray-400"
    : undefined;

  if (!href || compact) {
    return (
      <SectionHeading as="h3" className={className}>
        {publication.title}
      </SectionHeading>
    );
  }

  return (
    <SectionHeading as="h3" href={href} className={className}>
      {publication.title}
    </SectionHeading>
  );
}

function PublicationEntry({
  publication,
  compact,
}: {
  publication: Publication;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <>
        <PublicationTitle publication={publication} compact />
        <span className="shrink-0 text-sm text-gray-600 dark:text-gray-400">
          {formatVenue(publication)}
        </span>
      </>
    );
  }

  return (
    <ListingSection>
      <PublicationTitle publication={publication} />
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        {formatVenue(publication)}
      </p>
      <div className="mt-2">
        <PublicationAuthors authors={publication.authors} />
      </div>
      <PublicationLinks links={publication.links} />
    </ListingSection>
  );
}

export default PublicationEntry;
