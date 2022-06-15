import * as React from "react";
import Link from "next/link";

const BlogLink = ({ children, href }: any) => {
  if (!href) {
    return <>{children}</>;
  }

  if (href.startsWith("/")) {
    return <Link href={href}>{children}</Link>;
  }

  if (href.startsWith("#")) {
    return <a href={href}>{children}</a>;
  }

  return (
    <a href={href} target={"_blank"} rel={"noopener noreferrer"}>
      {children}
    </a>
  );
};

export default BlogLink;
