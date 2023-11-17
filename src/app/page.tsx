import type { NextPage } from "next";
import PageHeader from "@/components/typography/PageHeader";
import { linkedInUrl } from "@/lib/constants";
import SchemaData from "@/components/SchemaData";
import HeroImage from "@/components/home/HeroImage";
import { getPlaceholderLocal } from "@/lib/getPlaceholder";

const Images: HeroImage[] = [
  { src: "/hero0.webp", alt: "A picture of me next to a sunset", base64: "" },
  { src: "/hero1.webp", alt: "Me on the beach", base64: "" },
];

const Home: NextPage = async () => {
  for (const image of Images) {
    image.base64 = await getPlaceholderLocal(image.src);
  }

  const jsonLd = {
    "@type": "Person",
    name: "Dhruman Gupta",
    jobTitle: "Student Developer",
    sameAs: [linkedInUrl],
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
      <div className="w-full aspect-w-3 aspect-h-2 relative rounded-md overflow-hidden mb-4">
        <HeroImage images={Images} />
      </div>
      <header>
        <PageHeader>Dhruman Gupta</PageHeader>
        <article className="prose dark:prose-dark child:mb-2 last:child:mb-0">
          <p>
            Hi! I&apos;m Dhruman Gupta, a tech enthusiant and an aspiring
            Software Engineer. I&apos;m a first-year at Ashoka University,
            studying Computer Science and Mathematics, currently working on
            personal and open source projects.
          </p>
        </article>
      </header>
    </>
  );
};

export default Home;
