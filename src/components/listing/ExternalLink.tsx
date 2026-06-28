import Link from "@/components/Link";
import { ArrowUpRightIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  showIcon?: boolean;
};

export default function ExternalLink({
  href,
  children,
  className,
  showIcon = true,
}: ExternalLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1 text-primary transition-colors hover:text-accent",
        className
      )}
    >
      {children}
      {showIcon && (
        <ArrowUpRightIcon
          aria-hidden
          className="h-3 w-3 shrink-0 opacity-60 transition-all duration-150 group-hover:translate-x-0.5 group-hover:opacity-100"
        />
      )}
    </Link>
  );
}
