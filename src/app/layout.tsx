"use client";

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
        {process.env.NODE_ENV === "production" && (
          <script id="insights">
            {`insights.init("HNbdPNIpAloCk8kC"); insights.trackPages();`}
          </script>
        )}
        <Script src="https://getinsights.io/js/insights.js" />
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
      </body>
    </html>
  );
}
