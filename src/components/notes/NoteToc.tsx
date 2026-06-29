"use client";

import { cn } from "@/lib/cn";
import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const HEADING_SELECTOR = "h1[id], h2[id]";

export default function NoteToc({ className }: { className?: string }) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;

    const frame = requestAnimationFrame(() => {
      const article = document.querySelector("article");
      if (!article) {
        return;
      }

      const headings = Array.from(
        article.querySelectorAll<HTMLHeadingElement>(HEADING_SELECTOR)
      ).filter((heading) => heading.id && heading.textContent);

      setItems(
        headings.map((heading) => ({
          id: heading.id,
          text: heading.textContent ?? "",
          level: Number(heading.tagName.slice(1)),
        }))
      );

      if (headings.length === 0) {
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
            );

          if (visible.length > 0) {
            setActiveId(visible[0].target.id);
          }
        },
        { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
      );

      headings.forEach((heading) => observer?.observe(heading));
    });

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, []);

  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Table of contents" className={className}>
      <div className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-secondary">
          On this page
        </p>
        <ul className="space-y-1.5 border-l border-gray-200 dark:border-gray-700">
          {items.map((item) => {
            const isActive = item.id === activeId;

            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    "block border-l -ml-px py-0.5 text-sm leading-snug transition-colors",
                    item.level === 1 && "pl-4",
                    item.level === 2 && "pl-7",
                    isActive
                      ? "border-accent text-accent"
                      : "border-transparent text-secondary hover:text-primary"
                  )}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
