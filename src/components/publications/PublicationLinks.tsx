import Link from "@/components/Link";
import type { PublicationLinks as TPublicationLinks } from "@/lib/publications";
import { HiArrowUpRight } from "react-icons/hi2";

const linkEntries: {
  key: keyof TPublicationLinks;
  label: string;
}[] = [
  { key: "paper", label: "Paper" },
  { key: "arxiv", label: "arXiv" },
  { key: "openreview", label: "OpenReview" },
  { key: "code", label: "Code" },
];

type PublicationLinkItem = {
  key: keyof TPublicationLinks;
  label: string;
  href: string;
};

function PublicationLinks({ links }: { links?: TPublicationLinks }) {
  const items = linkEntries
    .map(({ key, label }) => ({ key, label, href: links?.[key] }))
    .filter((item): item is PublicationLinkItem => Boolean(item.href));

  if (items.length === 0) return null;

  return (
    <ul className="mt-2 flex flex-wrap items-center text-sm">
      {items.map((item, index) => (
        <li key={item.key} className="inline-flex items-center">
          {index > 0 && (
            <span
              aria-hidden
              className="mx-2 text-gray-400 dark:text-gray-500"
            >
              ·
            </span>
          )}
          <Link
            href={item.href}
            className="group inline-flex items-center gap-1 text-gray-700 transition-colors hover:text-accent dark:text-gray-300"
          >
            {item.label}
            <HiArrowUpRight
              aria-hidden
              className="h-3 w-3 shrink-0 opacity-60 transition-all duration-150 group-hover:translate-x-0.5 group-hover:opacity-100"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default PublicationLinks;
