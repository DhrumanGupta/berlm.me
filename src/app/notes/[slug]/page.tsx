import Keywords from "@/components/notes/Keywords";
import NoteLink from "@/components/notes/NoteLink";
import NoteLinks from "@/components/notes/NoteLinks";
import SchemaData from "@/components/SchemaData";
import { baseUrl } from "@/lib/constants";
import { getAllNoteSlugs, getNoteData } from "@/lib/notes";
import { formatNoteDateLong } from "@/lib/format-date";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

interface IParams {
  params: { slug: string };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllNoteSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
  const noteData = await getNoteData(params.slug);
  if (!noteData) {
    return {
      title: "Not Found",
      description: "The page you were looking for was not found.",
    };
  }

  const { frontmatter } = noteData;

  return {
    description: frontmatter.description,
    title: frontmatter.title,
    alternates: {
      canonical: `/notes/${params.slug}`,
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: `${baseUrl}/notes/${params.slug}`,
      type: "website",
    },
  };
}

const Note = async ({ params }: IParams) => {
  const noteData = await getNoteData(params.slug);

  if (!noteData) {
    return redirect("/notes");
  }

  const { frontmatter, readingTime, code } = noteData;
  const hasImage = Boolean(frontmatter.image && frontmatter.base64);
  const keywords = frontmatter.meta?.keywords ?? [];

  const jsonLd = {
    "@type": "BlogPosting",
    name: "Dhruman Gupta",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/notes/${params.slug}`,
    },
    author: {
      "@type": "Person",
      name: "Dhruman Gupta",
      url: baseUrl,
    },
    description: frontmatter.description,
    headline: frontmatter.title,
    datePublished: new Date(frontmatter.date),
    url: `${baseUrl}/notes/${params.slug}`,
    ...(keywords.length > 0 && { keywords }),
    ...(hasImage && { image: frontmatter.image }),
  };

  return (
    <>
      <SchemaData data={jsonLd} />
      <header className="relative">
        <div className="relative mb-12">
          <div className="col-span-full">
            <h2 className="leading-tight text-2xl md:text-3xl text-primary">
              {frontmatter.title}
            </h2>

            <div className="flex gap-x-2 text-secondary flex-wrap items-center">
              <p className="text-secondary md:text-lg">
                {formatNoteDateLong(frontmatter.date)} &ndash; {readingTime.text}
              </p>

              {frontmatter.links && (
                <>
                  <p>•</p>
                  <NoteLinks
                    className="child:text-secondary"
                    links={frontmatter.links}
                  />
                </>
              )}
            </div>

            {keywords.length > 0 && <Keywords keywords={keywords} />}

            {hasImage && (
              <div className="aspect-w-3 aspect-h-4 sm:aspect-w-3 sm:aspect-h-3 md:aspect-w-16 md:aspect-h-9 rounded-lg mt-10 overflow-hidden">
                <Image
                  src={frontmatter.image!}
                  fill={true}
                  placeholder="blur"
                  blurDataURL={frontmatter.base64!}
                  alt={frontmatter.imageDescription ?? frontmatter.title}
                  className="w-full rounded-lg object-cover object-center transition"
                />
              </div>
            )}
          </div>
        </div>
      </header>
      <article className="relative prose prose-light dark:prose-dark max-w-none mb-6">
          {code}
          <hr />
          <h4>Written by Dhruman Gupta</h4>
          <NoteLink
            className="text-sm"
            href={`https://github.com/DhrumanGupta/berlm.me/tree/master/content/notes/${params.slug}.mdx`}
          >
            Edit on GitHub
          </NoteLink>
        </article>
    </>
  );
};

export default Note;
