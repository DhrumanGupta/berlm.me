"use client";

import { cn } from "@/lib/cn";
import { getClassnameFromKeyword } from "@/lib/note-tags";

type NotesFiltersProps = {
  tags: string[];
  query: string;
  selectedTags: string[];
  onQueryChange: (query: string) => void;
  onToggleTag: (tag: string) => void;
  onClearTags: () => void;
};

function NotesFilters({
  tags,
  query,
  selectedTags,
  onQueryChange,
  onToggleTag,
  onClearTags,
}: NotesFiltersProps) {
  return (
    <div className="flex flex-col gap-2 border-b border-secondary py-3 sm:flex-row sm:items-center sm:gap-3">
      <label className="sr-only" htmlFor="notes-search">
        Search notes
      </label>
      <input
        id="notes-search"
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search..."
        className="w-full shrink-0 rounded border border-secondary bg-transparent px-2.5 py-1.5 text-sm text-primary placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent sm:max-w-[10.5rem] dark:placeholder:text-gray-400"
      />

      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={onClearTags}
            aria-pressed={selectedTags.length === 0}
            className={cn(
              "rounded px-2.5 py-0.5 text-sm transition-opacity duration-200",
              "tag-default",
              selectedTags.length === 0
                ? "opacity-100"
                : "opacity-50 hover:opacity-70"
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
                onClick={() => onToggleTag(tag)}
                aria-pressed={isSelected}
                className={cn(
                  "rounded px-2.5 py-0.5 text-sm transition-opacity duration-200",
                  getClassnameFromKeyword(tag),
                  isSelected
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-70"
                )}
              >
                {tag}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default NotesFilters;
