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
      <div className="py-4 space-y-4 border-b border-secondary">
        <label className="sr-only" htmlFor="notes-search">
          Search notes
        </label>
        <input
          id="notes-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search notes..."
          className="!mt-0 w-full rounded border border-secondary bg-transparent px-3 py-2 text-sm text-primary placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent dark:placeholder:text-gray-400"
        />

        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-secondary">Tags</span>
            <button
              type="button"
              onClick={() => setSelectedTags([])}
              className={cn(
                "rounded py-1 px-3 text-sm transition-colors",
                selectedTags.length === 0
                  ? "tag-default"
                  : "border border-secondary text-secondary hover:text-primary"
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
                    "rounded py-1 px-3 text-sm transition-opacity duration-200",
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
