import Link from "@/components/Link";
import SchemaData from "@/components/SchemaData";
import {
  ArrowUpRightIcon,
  EmailIcon,
  GithubIcon,
  GoogleScholarIcon,
  LinkedInIcon,
} from "@/components/icons";
import PublicationEntry from "@/components/publications/PublicationEntry";
import { emailId, githubUrl, linkedInUrl, scholarUrl } from "@/lib/constants";
import { formatNoteDateShort } from "@/lib/format-date";
import { getAllNoteData } from "@/lib/notes";
import {
  getLatestPublications,
  getPrimaryPublicationLink,
} from "@/lib/publications";

const socials = [
  { name: "Google Scholar", href: scholarUrl, Icon: GoogleScholarIcon },
  { name: "GitHub", href: githubUrl, Icon: GithubIcon },
  { name: "LinkedIn", href: linkedInUrl, Icon: LinkedInIcon },
  { name: "Email", href: emailId, Icon: EmailIcon },
];

const Home = async () => {
  const latestPosts = [...(await getAllNoteData())]
    .sort((a, b) => b.date - a.date)
    .slice(0, 3);
  const latestPublications = getLatestPublications(3);

  const jsonLd = {
    "@type": "Person",
    name: "Dhruman Gupta",
    jobTitle: "Machine Learning Researcher",
    sameAs: [linkedInUrl, scholarUrl],
    email: "dhrumangupta06@gmail.com",
    affiliation: {
      "@type": "Organization",
      name: "Ashoka University",
      url: "https://www.ashoka.edu.in/",
    },
  };

  return (
    <>
      <SchemaData data={jsonLd} />

      <section className="py-4">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
          Dhruman Gupta
        </p>

        <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-gray-700 dark:text-gray-400 md:text-lg">
          Building things, studying Math and CS, ML research. Currently a
          final-year student at Ashoka University, Research{" "}
          <a
            href="https://truthauditlabs.ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            @TAL
          </a>
          .
        </p>

        <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
          {socials.map(({ name, href, Icon }) => (
            <li key={name}>
              <Link
                href={href}
                aria-label={name}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
              >
                <Icon className="h-3.5 w-3.5" />
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {latestPosts.length > 0 && (
        <section className="border-t border-secondary pt-5 pb-3">
          <div className="mb-3 flex items-baseline justify-between gap-4">
            <h2 className="text-xl text-primary">Recent writing</h2>
            <Link
              href="/notes"
              className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-gray-600 transition-colors hover:text-accent dark:text-gray-400"
            >
              View all
              <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <ul className="flex flex-col">
            {latestPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/notes/${post.slug}`}
                  className="group flex flex-col gap-0.5 border-b border-secondary py-3 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="font-normal text-gray-700 transition-colors group-hover:text-accent dark:text-gray-300">
                    {post.title}
                  </span>
                  <span className="shrink-0 text-sm text-gray-600 dark:text-gray-400">
                    {formatNoteDateShort(post.date)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {latestPublications.length > 0 && (
        <section className="border-t border-b border-secondary pt-5 pb-3">
          <div className="mb-3 flex items-baseline justify-between gap-4">
            <h2 className="text-xl text-primary">Recent publications</h2>
            <Link
              href="/publications"
              className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-gray-600 transition-colors hover:text-accent dark:text-gray-400"
            >
              View all
              <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <ul className="flex flex-col">
            {latestPublications.map((publication) => {
              const href = getPrimaryPublicationLink(publication);
              const rowClassName =
                "group flex flex-col gap-0.5 border-b border-secondary py-3 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6";

              return (
                <li key={publication.title}>
                  {href ? (
                    <Link href={href} className={rowClassName}>
                      <PublicationEntry publication={publication} compact />
                    </Link>
                  ) : (
                    <div className={rowClassName}>
                      <PublicationEntry publication={publication} compact />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
};

export default Home;
