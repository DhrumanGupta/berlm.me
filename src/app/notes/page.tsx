import FilteredNotesList from "@/components/notes/FilteredNotesList";
import type { MetaData } from "@/lib/notes";
import { getAllNoteData } from "@/lib/notes";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Writing, projects, and other things I've been working on or thinking about.",
  alternates: {
    canonical: `/notes`,
  },
};

const NotesList = async () => {
  const data: MetaData[] = await getAllNoteData();
  data.sort((a, b) => b.date - a.date);
  const tags = Array.from(
    new Set(data.flatMap((note) => note.meta?.keywords ?? []))
  ).sort();

  return (
    <div className="relative min-h-hero">
      <div className="prose dark:prose-dark max-w-none pb-4 border-b border-gray-700 dark:border-gray-300">
        <p>Things I&apos;ve been working on or thinking about.</p>
      </div>
      {data.length <= 0 ? (
        <div className="flex h-[calc(30vh)] flex-col justify-center sm:h-[calc(100vh-27rem)]">
          <h1 className="leading text-center text-2xl md:text-3xl text-primary">
            Coming soon
          </h1>
          <p className="mt-2 text-center text-lg">
            <Link href="/" className="text-current hover:underline">
              Go home?
            </Link>
          </p>
        </div>
      ) : (
        <FilteredNotesList notes={data} tags={tags} />
      )}
    </div>
  );
};

export default NotesList;
