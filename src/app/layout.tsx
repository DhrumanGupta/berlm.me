"use client";

import { Analytics } from "@vercel/analytics/react";

import "../styles/globals.css";
import "../styles/prose.css";
import { ThemeProvider } from "next-themes";
import Navbar from "../components/Navbar";
import { Theme } from "../types";
import clsx from "clsx";
import Script from "next/script";

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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6670854316805103"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={clsx(
          "transition duration-500 bg-white dark:bg-gray-900",
          "set-color-blue"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme={Theme.Dark}>
          {/* <Icon /> */}

          <Navbar />

          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
