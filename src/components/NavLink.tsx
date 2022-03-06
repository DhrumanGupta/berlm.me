import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  to: string;
  exact?: Boolean;
  activeClassName?: string;
  className?: string;
  props?: {
    [key: string]: any;
  };
}

const NavLink: React.FC<Props> = ({
  to,
  exact,
  children,
  className,
  activeClassName,
  ...props
}) => {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === to : pathname.startsWith(to);

  return (
    <Link href={to}>
      <a className={clsx(className, isActive && activeClassName)} {...props}>
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
