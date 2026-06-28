type ListingPageProps = {
  intro: React.ReactNode;
  isEmpty: boolean;
  emptyMessage?: string;
  children: React.ReactNode;
};

export default function ListingPage({
  intro,
  isEmpty,
  emptyMessage = "Nothing here yet.",
  children,
}: ListingPageProps) {
  return (
    <div className="relative min-h-hero pb-8">
      <div className="prose prose-light dark:prose-dark max-w-none border-b border-gray-700 pb-4 dark:border-gray-300">
        {intro}
      </div>

      {isEmpty ? (
        <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
          {emptyMessage}
        </p>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}
