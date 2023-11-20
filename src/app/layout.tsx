import "../styles/globals.css";
import "../styles/prose.css";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "../components/Navbar";
import { Providers } from "./providers";

import { Poppins } from "next/font/google";
import Footer from "@/components/Footer";
import { Metadata, Viewport } from "next";
import { cn } from "@/lib/cn";
import { baseUrl } from "@/lib/constants";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const title = "Dhruman Gupta";
const description =
  "Hi! I'm Dhruman Gupta, a tech enthusiant and an aspiring Software Engineer, currently working personal and open source projects.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: title,
    template: `%s – Dhruman Gupta`,
  },
  description,
  manifest: "/manifest.json",
  openGraph: {
    locale: "en_US",
    type: "website",
    siteName: "Dhruman Gupta",
    title: {
      default: title,
      template: `%s – Dhruman Gupta`,
    },
    description,
    url: baseUrl,
  },
  twitter: {
    site: "@dhrumangupta",
    title: {
      default: title,
      template: `%s – Dhruman Gupta`,
    },
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

export const viewport: Viewport = {
  themeColor: "#1f2028",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="shortcut icon"
          href={"/logo/dark/72x72.png"}
          type="image/x-icon"
        />
      </head>
      <body
        className={cn(
          "transition duration-500 bg-white dark:bg-gray-900 set-color-blue",
          font.className
        )}
      >
        {/* <Icon /> */}
        <Providers>
          {/* <div className="mx-auto max-w-[65ch]"> */}
          <Navbar />
          {/* </div> */}

          <div className="mx-8">
            <div className="mx-auto max-w-[65ch]">{children}</div>
          </div>
          <Footer />
        </Providers>

        <Analytics />
      </body>
    </html>
  );
}
