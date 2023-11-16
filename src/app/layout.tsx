import "../styles/globals.css";
import "../styles/prose.css";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "../components/Navbar";
import clsx from "clsx";
import { Providers } from "./providers";

import { Poppins } from "next/font/google";
import Footer from "@/components/Footer";
import { Metadata, Viewport } from "next";
import { makeMetaData, makeViewport } from "@/lib/metadata";

const font = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = makeMetaData({});
export const viewport: Viewport = makeViewport({});

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
        className={clsx(
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
