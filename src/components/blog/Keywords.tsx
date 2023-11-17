import { getClassnameFromKeyword } from "@/lib/blog";
import { cn } from "@/lib/cn";
import React from "react";

function Keywords({
  keywords,
  className,
}: {
  className?: string;
  keywords: string[];
}) {
  return (
    <div className={cn("flex gap-x-4 mt-4", className)}>
      {keywords.map((keyword) => (
        <span
          key={keyword}
          className={cn(
            "rounded py-1 px-3 text-sm text-black dark:text-white duration-500 ease-in-out",
            getClassnameFromKeyword(keyword)
          )}
        >
          {keyword}
        </span>
      ))}
    </div>
  );
}

export default Keywords;
