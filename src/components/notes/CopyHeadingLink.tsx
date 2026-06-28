"use client";

import { cn } from "@/lib/cn";
import { useCallback, useState } from "react";
import { CheckIcon, LinkIcon } from "@/components/icons";

export default function CopyHeadingLink({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — ignore
    }
  }, [id]);

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Link copied" : "Copy link to section"}
      className={cn(
        "not-prose ml-3 inline-flex shrink-0 items-center justify-center",
        "text-gray-500 transition-colors duration-150",
        "hover:text-accent group-hover/heading:text-accent focus:text-accent",
        "dark:text-gray-300 dark:hover:text-accent dark:group-hover/heading:text-accent",
        "focus-ring rounded-sm"
      )}
    >
      {copied ? (
        <CheckIcon className="h-5 w-5" />
      ) : (
        <LinkIcon className="h-5 w-5" />
      )}
    </button>
  );
}
