import Link from "@/components/Link";
import { resources } from "@/lib/resources";
import { Metadata } from "next";
import { HiArrowUpRight } from "react-icons/hi2";

function encodeHref(href: string) {
  try {
    return new URL(href).href;
  } catch {
    return encodeURI(href);
  }
}

export const metadata: Metadata = {
  title: "Resources",
  description: "Course materials, lecture notes, and other useful links.",
  alternates: {
    canonical: `/resources`,
  },
};

export default function ResourcesPage() {
  return (
    <div className="relative min-h-hero pb-8">
      <div className="prose dark:prose-dark max-w-none border-b border-gray-700 pb-4 dark:border-gray-300">
        <p>Course materials, lecture notes, and other useful links.</p>
      </div>

      {resources.length === 0 ? (
        <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
          Nothing here yet.
        </p>
      ) : (
        <div>
          {resources.map((section) => (
            <section
              key={section.title}
              className="border-t border-secondary py-5 first:border-t-0"
            >
              <h2 className="text-base font-medium text-primary md:text-lg">
                {section.title}
              </h2>

              <ul className="mt-2 flex flex-wrap items-center text-sm">
                {section.items.map((item, index) => (
                  <li key={item.label} className="inline-flex items-center">
                    {index > 0 && (
                      <span
                        aria-hidden
                        className="mx-2 text-gray-400 dark:text-gray-500"
                      >
                        ·
                      </span>
                    )}
                    <Link
                      href={encodeHref(item.href)}
                      className="group inline-flex items-center gap-1 text-gray-700 transition-colors hover:text-accent dark:text-gray-300"
                    >
                      {item.label}
                      <HiArrowUpRight
                        aria-hidden
                        className="h-3 w-3 shrink-0 opacity-60 transition-all duration-150 group-hover:translate-x-0.5 group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
