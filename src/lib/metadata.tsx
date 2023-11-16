import { Metadata, Viewport } from "next";
import { altUrl, baseUrl } from "./constants";

const makeTitle = (title: string, name: string) =>
  title === name ? title : `${title} – ${name}`;

interface MetaDecoratorProps {
  name?: string;
  title?: string;
  description?: string;
  image?: string;
  manifest?: string;
}

interface ViewportProps {
  color?: string;
}

export const makeMetaData = ({
  name = "Dhruman Gupta", // site name
  title = "Dhruman Gupta", // page title
  description = "Hi! I'm Dhruman Gupta, a tech enthusiant and an aspiring Software Engineer. I'm a first-year at Ashoka University, studying Computer Science and Mathematics, currently working personal and open source projects.",
  image,
  manifest = "/manifest.json",
}: MetaDecoratorProps): Metadata => {
  const metadata: Metadata = {
    metadataBase: new URL(altUrl),
    title: {
      default: makeTitle(title, name),
      template: `%s – ${name}`,
    },
    description,
    manifest: manifest,
    openGraph: {
      locale: "en_US",
      type: "website",
      siteName: name,
      title: makeTitle(title, name),
      description,
      url: baseUrl,
    },
    twitter: {
      site: "@dhrumangupta",
      title: makeTitle(title, name),
      description,
    },
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
    },
    authors: [{ name: "Dhruman Gupta", url: baseUrl }],
  };

  if (image) {
    metadata.openGraph!.images = [image];
    metadata.twitter!.images = [image];
  }

  return metadata;
};

export const makeViewport = ({
  color = "#1f2028",
}: ViewportProps): Viewport => {
  const viewport: Viewport = {
    themeColor: color,
    width: "device-width",
    initialScale: 1,
  };

  return viewport;
};
