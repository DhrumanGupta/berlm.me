import type { NextPage } from "next";
import heroImage from "../../public/hero.webp";
import Image from "next/image";
import PageHeader from "@/components/typography/PageHeader";
import { linkedInUrl } from "@/lib/constants";
import SchemaData from "@/components/SchemaData";

const Home: NextPage = () => {
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
        <Image
          src={heroImage}
          alt="A picture of me on a sunset"
          placeholder="blur"
          priority
          width={900}
          height={600}
          quality={100}
          className="object-cover"
        />
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
