declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";

  export const frontmatter: Record<string, unknown>;
  export default function MDXContent(props: MDXProps): JSX.Element;
}
