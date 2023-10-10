import { Metadata } from "next";

const makeTitle = (title: string, name: string) =>
  title === name ? title : `${title} – ${name}`;

interface MetaDecoratorProps {
  name?: string;
  title?: string;
  description: string;
  image?: string;
  color?: string;
  manifest?: string;
}

export const makeMetaData = ({
  name = "Dhruman Gupta", // site name
  title = "Dhruman Gupta", // page title
  description,
  image,
  color = "#1f2028",
  manifest = "/manifest.json",
}: MetaDecoratorProps): Metadata => {
  const metadata: Metadata = {
    metadataBase: new URL(
      process.env.NODE_ENV === "production"
        ? "https://berlm.me"
        : "http://localhost:3000"
    ),
    title: makeTitle(title, name),
    description,
    themeColor: color,
    manifest: manifest,
    openGraph: {
      locale: "en_US",
      type: "website",
      siteName: name,
      title: makeTitle(title, name),
      description,
    },
    twitter: {
      site: "@dhrumangupta",
      title: makeTitle(title, name),
      description,
    },
  };

  if (image) {
    metadata.openGraph!.images = [image];
    metadata.twitter!.images = [image];
  }

  return metadata;
};
