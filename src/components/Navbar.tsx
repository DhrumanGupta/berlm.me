import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Theme } from "../types";
import { MoonIcon } from "./icons/moon-icon";
import { SunIcon } from "./icons/sun-icon";
import NavLink from "./NavLink";

interface Props {}

const ROUTES: any = [
  { name: "Home", path: "/", exact: true },
  // { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
];

const iconTransformOrigin = { transformOrigin: "50% 100px" };
function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return (
    <button
      onClick={() => {
        setTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark);
      }}
      className={
        "border-secondary hover:border-primary focus:border-primary focus:outline-none inline-flex h-14 items-center justify-center overflow-hidden rounded-full border-2 p-1 transition w-14"
      }
    >
      <div className="relative h-8 w-8">
        <span
          className="absolute inset-0 rotate-90 transform text-black transition-transform duration-1000 motion-reduce:duration-[0s] dark:rotate-0 dark:text-white"
          style={iconTransformOrigin}
        >
          <MoonIcon />
        </span>
        <span
          className="absolute inset-0 rotate-0 transform text-black transition-transform duration-1000 motion-reduce:duration-[0s] dark:-rotate-90 dark:text-white"
          style={iconTransformOrigin}
        >
          <SunIcon />
        </span>
      </div>
      <span className={"ml-4 text-black dark:text-white sr-only"}>
        {theme === Theme.Dark ? "Switch to light mode" : "Switch to dark mode"}
      </span>
    </button>
  );
}

function Navbar() {
  return (
    <div className="px-5vw py-9 lg:py-12">
      <nav className="text-primary mx-auto flex max-w-8xl items-center justify-between">
        <ul className="flex">
          {ROUTES.map((route: any) => (
            <li className="px-3 py-2 md:px-5" key={route.name}>
              <NavLink
                to={route.path}
                exact={route.exact}
                className="text-secondary underlined focus:outline-none block whitespace-nowrap text-lg font-medium hover:text-gray-900 focus:text-gray-900 dark:hover:text-gray-100 dark:focus:text-gray-100 duration-75"
                activeClassName="!text-gray-800 dark:!text-gray-200"
              >
                {route.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <DarkModeToggle />
      </nav>
    </div>
  );
}

export default Navbar;
