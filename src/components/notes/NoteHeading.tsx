import { cn } from "@/lib/cn";
import { ComponentPropsWithoutRef } from "react";
import CopyHeadingLink from "./CopyHeadingLink";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export function createNoteHeading(Tag: HeadingTag) {
  return function NoteHeading({
    id,
    children,
    className,
    ...props
  }: ComponentPropsWithoutRef<HeadingTag>) {
    return (
      <Tag
        id={id}
        className={cn("group/heading flex flex-wrap items-center", className)}
        {...props}
      >
        {id ? <a href={`#${id}`}>{children}</a> : children}
        {id && <CopyHeadingLink id={id} />}
      </Tag>
    );
  };
}

export const noteHeadings = {
  h1: createNoteHeading("h1"),
  h2: createNoteHeading("h2"),
  h3: createNoteHeading("h3"),
  h4: createNoteHeading("h4"),
  h5: createNoteHeading("h5"),
  h6: createNoteHeading("h6"),
};
