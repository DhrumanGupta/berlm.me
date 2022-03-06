import { Html, Main, NextScript, Head } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="transition duration-500 bg-white dark:bg-gray-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
