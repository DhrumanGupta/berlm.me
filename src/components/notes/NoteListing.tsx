import { formatNoteDateLong } from "@/lib/format-date";
import type { MetaData } from "@/lib/notes";
import Link from "next/link";
import Keywords from "./Keywords";
import NoteLinks from "./NoteLinks";

export function NoteListing({ data }: { data: MetaData }) {
  const keywords = data.meta?.keywords ?? [];
  const hasLinks = Boolean(data.links?.website);

  return (
    <div
      className={`group border-t border-secondary py-6 set-color-${data.color} first:border-t-0`}
    >
      <Link href={`/notes/${data.slug}`} className="block focus:outline-none">
        <h3 className="text-lg font-medium text-primary transition-colors group-hover:text-accent md:text-xl">
          {data.title}
        </h3>
      </Link>
      <div className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-gray-500 dark:text-gray-400">
        <span>
          {formatNoteDateLong(data.date)} · {data.readingTime.text}
        </span>
        {hasLinks && (
          <>
            <span aria-hidden>·</span>
            <NoteLinks links={data.links} compact />
          </>
        )}
      </div>
      <Link
        href={`/notes/${data.slug}`}
        className="mt-2 block focus:outline-none"
      >
        <p className="text-base text-gray-600 dark:text-gray-300">
          {data.description}
        </p>
        {keywords.length > 0 && <Keywords keywords={keywords} />}
      </Link>
    </div>
  );
}
