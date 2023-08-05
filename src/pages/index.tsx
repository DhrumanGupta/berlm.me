import type { NextPage } from "next";
import { Fragment } from "react";
import MetaDecorator from "../components/MetaDecorator";

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
    hover: "hover:text-gray-300",
  },
];

const Home: NextPage = () => {
  return (
    <>
      <MetaDecorator description="Welcome to Dhruman's website" />
      <div className="h-hero flex flex-col justify-center px-5vw">
        <header className="px-5">
          <p className="text-secondary text-lg md:text-xl lg:text-2xl">
            Hi, I am Dhruman Gupta
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
            I am a student developer 👋
          </h1>
        </header>
        <ul className="flex-wrap flex mb-24 px-5 font-mono mt-2">
          {ROUTES.map((route, index) => (
            // <Fragment key={route.name}>
            <li
              key={route.name}
              className={`flex md:text-lg underline duration-100 ${route.hover} min-w-fit`}
            >
              <a href={route.route} target="_blank" rel="noreferrer">
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

export default Home;
