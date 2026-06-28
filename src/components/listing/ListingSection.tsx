import { cn } from "@/lib/cn";

type ListingSectionProps = {
  children: React.ReactNode;
  className?: string;
  as?: "article" | "section";
};

export default function ListingSection({
  children,
  className,
  as: Tag = "article",
}: ListingSectionProps) {
  return (
    <Tag
      className={cn(
        "border-t border-secondary py-5 first:border-t-0",
        className
      )}
    >
      {children}
    </Tag>
  );
}
