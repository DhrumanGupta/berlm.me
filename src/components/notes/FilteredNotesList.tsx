"use client";

import { NoteListing } from "@/components/notes/NoteListing";
import { cn } from "@/lib/cn";
import { getClassnameFromKeyword } from "@/lib/note-tags";
import type { MetaData } from "@/lib/notes";
import { useMemo, useState } from "react";

function filterNotes(
  notes: MetaData[],
  query: string,
  selectedTags: string[]
): MetaData[] {
  const normalizedQuery = query.trim().toLowerCase();

  return notes.filter((note) => {
    const keywords = note.meta?.keywords ?? [];
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => keywords.includes(tag));

    if (!matchesTags) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const haystack = [note.title, note.description, ...keywords]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

function FilteredNotesList({
  notes,
  tags,
}: {
  notes: MetaData[];
  tags: string[];
}) {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredNotes = useMemo(
    () => filterNotes(notes, query, selectedTags),
    [notes, query, selectedTags]
  );

  const toggleTag = (tag: string) => {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag]
    );
  };

  return (
    <>
      <div className="flex flex-col gap-2 border-b border-secondary py-3 sm:flex-row sm:items-center sm:gap-3">
        <label className="sr-only" htmlFor="notes-search">
          Search notes
        </label>
        <input
          id="notes-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search..."
          className="w-full shrink-0 rounded border border-secondary bg-transparent px-2.5 py-1.5 text-sm text-primary placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent sm:max-w-[10.5rem] dark:placeholder:text-gray-400"
        />

        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedTags([])}
              aria-pressed={selectedTags.length === 0}
              className={cn(
                "rounded px-2.5 py-0.5 text-sm transition-opacity duration-200",
                "tag-default",
                selectedTags.length === 0
                  ? "opacity-100 ring-2 ring-accent"
                  : "opacity-60 hover:opacity-100"
              )}
            >
              All
            </button>
            {tags.map((tag) => {
              const isSelected = selectedTags.includes(tag);

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  aria-pressed={isSelected}
                  className={cn(
                    "rounded px-2.5 py-0.5 text-sm transition-opacity duration-200",
                    getClassnameFromKeyword(tag),
                    isSelected
                      ? "opacity-100 ring-2 ring-accent"
                      : "opacity-60 hover:opacity-100"
                  )}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="relative mx-auto">
        {filteredNotes.length === 0 ? (
          <p className="py-10 text-center text-secondary">
            No notes match your search.
          </p>
        ) : (
          filteredNotes.map((noteData) => (
            <NoteListing key={noteData.slug} data={noteData} />
          ))
        )}
      </div>
    </>
  );
}

export default FilteredNotesList;
