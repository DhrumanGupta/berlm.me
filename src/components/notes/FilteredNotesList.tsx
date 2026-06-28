"use client";

import { NoteListing } from "@/components/notes/NoteListing";
import type { MetaData } from "@/lib/notes";
import { useMemo, useState } from "react";
import NotesFilters from "./NotesFilters";

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
      <NotesFilters
        tags={tags}
        query={query}
        selectedTags={selectedTags}
        onQueryChange={setQuery}
        onToggleTag={toggleTag}
        onClearTags={() => setSelectedTags([])}
      />

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
