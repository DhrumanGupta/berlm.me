import Link from "@/components/Link";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  as?: "h2" | "h3";
  href?: string;
  children: React.ReactNode;
  className?: string;
};

const defaultClassName = "text-base font-medium text-primary md:text-lg";

export default function SectionHeading({
  as: Tag = "h2",
  href,
  children,
  className,
}: SectionHeadingProps) {
  const headingClassName = cn(defaultClassName, className);

  if (!href) {
    return <Tag className={headingClassName}>{children}</Tag>;
  }

  return (
    <Tag className={headingClassName}>
      <Link
        href={href}
        className="text-primary transition-colors hover:text-accent"
      >
        {children}
      </Link>
    </Tag>
  );
}
