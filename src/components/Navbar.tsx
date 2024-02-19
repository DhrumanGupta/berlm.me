import NavLink from "./NavLink";
import { DarkModeToggle } from "./DarkModeToggle";

const ROUTES: any = [
  { name: "Home", path: "/", exact: true },
  // { name: "About", path: "/about" },
  { name: "Blog", path: "/blog" },
  { name: "Projects", path: "/projects" },
  { name: "QOTW", path: "/qotw" },
];

function Navbar() {
  return (
    <div className="sticky top-0 z-10 backdrop-blur-sm transition-all duration-100 ease-in-out">
      <div className="mx-8 py-8">
        <nav className="text-primary mx-auto max-w-[75ch] flex items-center justify-between">
          <ul className="flex">
            {ROUTES.map((route: any) => (
              <li className="first:pl-0 px-2 py-2 md:px-5" key={route.name}>
                <NavLink
                  to={route.path}
                  exact={route.exact}
                  className="text-secondary underlined focus:outline-none block whitespace-nowrap lg:text-lg  hover:text-gray-900 focus:text-gray-900 dark:hover:text-gray-100 dark:focus:text-gray-100 duration-75"
                  activeClassName="!text-gray-900 font-medium dark:!text-gray-200"
                >
                  {route.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <DarkModeToggle />
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
