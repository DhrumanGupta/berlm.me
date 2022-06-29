import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import clsx from "clsx";
import Script from "next/script";

export default class MyDocument extends Document {
  render() {
    const color =
      this.props?.__NEXT_DATA__?.props?.pageProps?.frontmatter?.color;

    return (
      <Html lang="en">
        <Head />
        <body
          className={clsx(
            "transition duration-500 bg-white dark:bg-gray-900",
            color ? `set-color-${color}` : "set-color-blue"
          )}
        >
          <Main />
          <NextScript />
          <Script
            src="https://getinsights.io/js/insights.js"
            strategy="beforeInteractive"
          />
        </body>
      </Html>
    );
  }
}
