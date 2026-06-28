import ExternalLinkList from "@/components/listing/ExternalLinkList";
import type { PublicationLinks as TPublicationLinks } from "@/lib/publications";

const linkEntries: {
  key: keyof TPublicationLinks;
  label: string;
}[] = [
  { key: "paper", label: "Paper" },
  { key: "arxiv", label: "arXiv" },
  { key: "openreview", label: "OpenReview" },
  { key: "code", label: "Code" },
];

function PublicationLinks({ links }: { links?: TPublicationLinks }) {
  const items = linkEntries
    .map(({ key, label }) => ({ key, label, href: links?.[key] }))
    .filter(
      (item): item is { key: keyof TPublicationLinks; label: string; href: string } =>
        Boolean(item.href)
    )
    .map(({ key, label, href }) => ({ key, label, href }));

  return <ExternalLinkList items={items} />;
}

export default PublicationLinks;
