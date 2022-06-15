import "../styles/globals.css";
import "../styles/prose.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { Theme } from "../types";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const color = pageProps?.frontmatter?.color ?? "blue";
    document.body.className = document.body.className.replace(
      /set-color-(red|yellow|blue)/,
      `set-color-${color}`
    );
  }, [pageProps]);

  return (
    <ThemeProvider attribute="class" defaultTheme={Theme.Light}>
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
