import { FaLinkedin, FaGithubSquare, FaItchIo } from "react-icons/fa";
import { SiDevpost } from "react-icons/si";
import { MdOutlineContactPage } from "react-icons/md";
import Link from "next/link";
import clsx from "clsx";

const ROUTES = [
  {
    name: "Linkedin",
    route: "https://www.linkedin.com/in/dhrumangupta",
    hover: "hover:!text-blue-500",
    Icon: FaLinkedin,
  },
  {
    name: "GitHub",
    route: "https://github.com/DhrumanGupta",
    hover: "hover:!text-gray-900 dark:hover:!text-gray-300",
    Icon: FaGithubSquare,
  },
  {
    name: "Itch",
    route: "https://berlm.itch.io/",
    hover: "hover:!text-red-500",
    Icon: FaItchIo,
  },
  {
    name: "Devpost",
    route: "https://devpost.com/Berlm",
    hover: "hover:!text-yellow-500",
    Icon: SiDevpost,
  },

  {
    name: "Resume",
    route: "/resume",
    hover: "hover:!text-gray-900 dark:hover:!text-gray-300",
    Icon: MdOutlineContactPage,
  },
];

function Navbar() {
  return (
    <footer className="py-9 w-full flex flex-col items-center justify-center">
      <ul className="mb-4 flex gap-4 lg:gap-6">
        {ROUTES.map((route) => (
          <Link
            href={route.route}
            aria-label={route.name}
            className={clsx(
              "w-8 h-8 text-gray-500 dark:text-gray-200 duration-100",
              route.hover
            )}
            key={route.route}
          >
            <route.Icon className="w-full h-full" key={route.route} />
          </Link>
        ))}
      </ul>
      <div className="space-x-3 text-gray-500 dark:text-gray-200 font-semibold">
        2023 — @berlm
      </div>
    </footer>
  );
}

export default Navbar;
