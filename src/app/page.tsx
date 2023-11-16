import type { Metadata, NextPage, Viewport } from "next";
import { makeMetaData, makeViewport } from "../lib/metadata";
import heroImage from "../../public/hero.jpg";
import Image from "next/image";

const ROUTES = [
  {
    name: "GitHub",
    route: "https://github.com/DhrumanGupta",
    hover: "hover:text-blue-500",
  },
  {
    name: "Itch",
    route: "https://berlm.itch.io/",
    hover: "hover:text-red-500",
  },
  {
    name: "Devpost",
    route: "https://devpost.com/Berlm",
    hover: "hover:text-yellow-500",
  },
  {
    name: "Linkedin",
    route: "https://www.linkedin.com/in/dhrumangupta",
    hover: "hover:text-blue-800",
  },
  {
    name: "Resume",
    route: "/resume",
    hover: "hover:text-gray-400",
  },
];

export const metadata: Metadata = makeMetaData({});
export const viewport: Viewport = makeViewport({});

const Home_: NextPage = () => {
  return (
    <>
      <div className="h-hero flex flex-col justify-center">
        <header>
          <p className="text-secondary text-lg md:text-xl lg:text-2xl">
            Hi, I am Dhruman Gupta
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
            I am a student developer 👋
          </h1>
        </header>
        <ul className="flex-wrap flex mb-24 font-mono mt-2">
          {ROUTES.map((route, index) => (
            // <Fragment key={route.name}>
            <li
              key={route.name}
              className={`flex md:text-lg underline min-w-fit`}
            >
              <a
                href={route.route}
                className={`duration-100 ${route.hover}`}
                target="_blank"
                rel="noreferrer"
              >
                {route.name}
              </a>
              {index !== ROUTES.length - 1 && (
                <p className="mx-2 sm:mx-4">&bull;</p>
              )}
            </li>
            // </Fragment>
          ))}
        </ul>
      </div>
    </>
  );
};

const Home: NextPage = () => {
  return (
    <>
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
        <h1 className="text-3xl md:text-4xl font-bold">Dhruman Gupta</h1>
        <article className="pt-2 prose dark:prose-dark child:mb-2 last:child:mb-0">
          <p>
            Hi! I&apos;m Dhruman Gupta, a tech enthusiant and an aspiring
            Software Engineer. I&apos;m a first-year at Ashoka University,
            studying Computer Science and Mathematics, currently working
            personal and open source projects.
          </p>
        </article>
      </header>
    </>
  );
};

export default Home;
