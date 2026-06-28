import { DarkModeToggle } from "./DarkModeToggle";
import NavLink from "./NavLink";

const ROUTES: any = [
  { name: "Home", path: "/", exact: true },
  // { name: "About", path: "/about" },
  { name: "Notes", path: "/notes" },
  { name: "Publications", path: "/publications" },
  { name: "Resources", path: "/resources" },
  // { name: "QOTW", path: "/qotw" },
];

function Navbar() {
  return (
    <div className="sticky top-0 z-10 backdrop-blur-sm transition-all duration-100 ease-in-out">
      <div className="mx-5 py-3 sm:mx-8 sm:py-4">
        <nav className="text-primary mx-auto flex max-w-[75ch] items-center gap-3">
          <ul className="flex min-w-0 flex-1 items-center overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {ROUTES.map((route: any) => (
              <li className="shrink-0 px-1.5 py-1 first:pl-0 sm:px-2 md:px-5" key={route.name}>
                <NavLink
                  to={route.path}
                  exact={route.exact}
                  className="text-secondary underlined focus:outline-none block whitespace-nowrap text-sm hover:text-accent focus:text-accent duration-75 sm:text-base lg:text-lg"
                  activeClassName="!text-accent font-medium"
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
