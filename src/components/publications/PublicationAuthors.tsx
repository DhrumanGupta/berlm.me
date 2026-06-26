import { AUTHOR_NAME } from "@/lib/publications";

function formatAuthorName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];

  const [firstName, ...rest] = parts;
  const lastName = rest[rest.length - 1];

  return `${firstName[0]}. ${lastName}`;
}

function PublicationAuthors({ authors }: { authors: string[] }) {
  return (
    <p className="text-sm text-gray-600 dark:text-gray-400">
      {authors.map((author, index) => {
        const formattedName = formatAuthorName(author);

        return (
          <span key={author}>
            {index > 0 && ", "}
            {author === AUTHOR_NAME ? (
              <span className="font-medium text-primary">{formattedName}</span>
            ) : (
              formattedName
            )}
          </span>
        );
      })}
    </p>
  );
}

export default PublicationAuthors;
