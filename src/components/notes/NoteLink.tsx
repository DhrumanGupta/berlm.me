import Link from "next/link";

const NoteLink = ({ children, href }: any) => {
  if (!href) {
    return <>{children}</>;
  }

  if (href.startsWith("/")) {
    return (
      <Link href={href} legacyBehavior>
        {children}
      </Link>
    );
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

export default NoteLink;
