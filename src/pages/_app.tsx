import "../styles/globals.css";
import "../styles/prose.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Navbar from "../components/Navbar";
import { Theme } from "../types";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme={Theme.Dark}>
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
