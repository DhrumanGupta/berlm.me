import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import Mermaid from "@/components/notes/Mermaid";
import NoteLink from "@/components/notes/NoteLink";
import { noteHeadings } from "@/components/notes/NoteHeading";

function getMermaidChart(children: ReactNode): string | null {
  if (!children || typeof children !== "object" || !("props" in children)) {
    return null;
  }

  const codeChild = children as ReactElement<ComponentPropsWithoutRef<"code">>;
  const className = codeChild.props.className ?? "";

  if (!className.includes("language-mermaid")) {
    return null;
  }

  const source = codeChild.props.children;

  if (typeof source === "string") {
    return source.trim();
  }

  if (Array.isArray(source)) {
    return source.join("").trim();
  }

  return String(source ?? "").trim();
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: NoteLink,
    ...noteHeadings,
    pre: ({ children, ...props }) => {
      const chart = getMermaidChart(children);

      if (chart) {
        return <Mermaid chart={chart} />;
      }

      return <pre {...props}>{children}</pre>;
    },
    ...components,
  };
}
