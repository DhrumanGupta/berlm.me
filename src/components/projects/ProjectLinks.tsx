// import { getClassnameFromKeyword } from "@/lib/blog";
import { cn } from "@/lib/cn";
import { ProjectLinks as TProjectLinks } from "@/lib/projects";
import React from "react";
import { FaLink } from "react-icons/fa6";
import Link from "../Link";

const IconContainer = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link href={href}>
    <div className="hover:text-blue-500 duration-100 dark:hover:text-blue-400 child:w-full child:h-full w-6 h-6">
      {children}
    </div>
  </Link>
);

function ProjectLinks({
  links,
  className,
}: {
  className?: string;
  links?: TProjectLinks;
}) {
  return (
    <div className={cn("flex gap-x-2", className)}>
      {links?.website && (
        <IconContainer href={links.website}>
          <FaLink />
        </IconContainer>
      )}
    </div>
  );
}

export default ProjectLinks;
