import "../styles/globals.css";
import "../styles/prose.css";
import type { AppProps } from "next/app";
import { ThemeProvider, useTheme } from "next-themes";
import Navbar from "../components/Navbar";
import { Theme } from "../types";
import Script from "next/script";
import Head from "next/head";
import { useEffect, useState } from "react";

const Icon = () => {
  const [dark, setDark] = useState(true);

  const handleUpdate = (event: MediaQueryListEvent) => {
    setDark(event.matches);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleUpdate);

    return () => {
      mediaQuery.removeEventListener("change", handleUpdate);
    };
  }, []);

  return (
    <Head>
      <link
        rel="shortcut icon"
        href={dark ? "/logo/dark/72x72.png" : "/logo/light/72x72.png"}
        type="image/x-icon"
      />
    </Head>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme={Theme.Dark}>
      <Icon />
      {process.env.NODE_ENV !== "development" && (
        <Script id="insights">
          {`insights.init("HNbdPNIpAloCk8kC"); insights.trackPages();`}
        </Script>
      )}
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
