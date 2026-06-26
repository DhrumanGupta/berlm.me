import React from "react";
import { default as NextLink } from "next/link";

const Link: React.FC<
  React.ComponentProps<typeof NextLink> & { external?: boolean }
> = ({ href, children, external, ...props }) => {
  const hrefStr = href.toString();
  const isHttp =
    hrefStr.startsWith("http://") || hrefStr.startsWith("https://");
  const isExternal =
    external || (hrefStr[0] !== "/" && !hrefStr.startsWith("#"));

  if (isHttp) {
    return (
      <a
        href={hrefStr}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  if (isExternal) {
    return (
      <a href={hrefStr} {...props}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} {...props}>
      {children}
    </NextLink>
  );
};

export default Link;
