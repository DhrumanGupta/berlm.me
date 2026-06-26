import { cn } from "@/lib/cn";
import type { NoteLinks as TNoteLinks } from "@/lib/notes";
import { FaLink } from "react-icons/fa6";
import Link from "../Link";

const IconContainer = ({
  href,
  compact,
  children,
}: {
  href: string;
  compact?: boolean;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    aria-label="Project link"
    className={cn(
      "inline-flex items-center transition-colors",
      compact
        ? "text-gray-600 hover:text-accent dark:text-gray-400"
        : "hover:text-blue-500 dark:hover:text-blue-400"
    )}
  >
    <div
      className={cn(
        compact ? "h-3.5 w-3.5" : "h-6 w-6 child:w-full child:h-full"
      )}
    >
      {children}
    </div>
  </Link>
);

function NoteLinks({
  links,
  className,
  compact,
}: {
  className?: string;
  compact?: boolean;
  links?: TNoteLinks;
}) {
  return (
    <div className={cn("flex gap-x-2", className)}>
      {links?.website && (
        <IconContainer href={links.website} compact={compact}>
          <FaLink className={compact ? "h-3.5 w-3.5" : "h-full w-full"} />
        </IconContainer>
      )}
    </div>
  );
}

export default NoteLinks;
