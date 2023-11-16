"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  to: string;
  exact?: Boolean;
  activeClassName?: string;
  className?: string;
  props?: {
    [key: string]: any;
  };
  children: ReactNode;
}

const NavLink: React.FC<Props> = ({
  to,
  exact,
  children,
  className,
  activeClassName,
  ...props
}) => {
  const pathname = usePathname()!;
  const isActive = exact ? pathname === to : pathname.startsWith(to);

  return (
    <Link
      href={to}
      className={clsx(className, isActive && activeClassName)}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;
