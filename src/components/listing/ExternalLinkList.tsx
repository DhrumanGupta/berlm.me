import { cn } from "@/lib/cn";
import ExternalLink from "./ExternalLink";

export type LinkItem = {
  label: string;
  href: string;
  key?: string;
};

type ExternalLinkListProps = {
  items: LinkItem[];
  className?: string;
};

export default function ExternalLinkList({
  items,
  className,
}: ExternalLinkListProps) {
  if (items.length === 0) return null;

  return (
    <ul className={cn("mt-2 flex flex-wrap items-center text-sm", className)}>
      {items.map((item, index) => (
        <li key={item.key ?? item.href} className="inline-flex items-center">
          {index > 0 && (
            <span
              aria-hidden
              className="mx-2 text-gray-400 dark:text-gray-500"
            >
              ·
            </span>
          )}
          <ExternalLink href={item.href}>{item.label}</ExternalLink>
        </li>
      ))}
    </ul>
  );
}
