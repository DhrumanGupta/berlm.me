import React from "react";
import { Metadata } from "next";
import { makeMetaData } from "@/lib/metadata";

export const metadata: Metadata = makeMetaData({
  title: "Not found",
  description: "This is not the webpage you are looking for",
});

const NotFound = () => {
  return (
    <main className={"h-hero flex flex-col justify-center"}>
      <h1 className="leading text-3xl md:text-4xl xl:text-6xl text-center">
        404 - Oh no!
      </h1>
      <p className="text-secondary text-xl md:text-2xl xl:text-3xl text-center">
        The page you were looking for was not found
      </p>
    </main>
  );
};

export default NotFound;
