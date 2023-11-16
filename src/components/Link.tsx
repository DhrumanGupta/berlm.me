import React from "react";
import { default as NextLink } from "next/link";

const Link: React.FC<
  React.ComponentProps<typeof NextLink> & { external?: boolean }
> = ({ href, children, external, ...props }) => {
  const isExternal = external || href.toString()[0] !== "/";

  return isExternal ? (
    <a href={href.toString()} target="_blank" {...props}>
      {children}
    </a>
  ) : (
    <NextLink href={href} {...props}>
      {children}
    </NextLink>
  );
};

export default Link;
