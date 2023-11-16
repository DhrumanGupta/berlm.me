import React from "react";
import { Metadata } from "next";
import { makeMetaData } from "@/lib/metadata";
import Link from "next/link";

export const metadata: Metadata = makeMetaData({
  title: "Not found",
  description: "This is not the webpage you are looking for",
});

const NotFound = () => {
  return (
    <main className={"h-[calc(100vh-16rem)] flex flex-col justify-center"}>
      <h1 className="leading text-2xl md:text-3xl text-center">
        This is not the page you are looking for
      </h1>
      <Link
        href="/"
        className="text-current hover:underline text-lg mt-2 text-center"
      >
        Go home?
      </Link>
    </main>
  );
};

export default NotFound;
