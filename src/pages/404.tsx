import React from "react";
import { NextPage } from "next";
import MetaDecorator from "../components/MetaDecorator";

const Error: NextPage = () => {
  return (
    <main className={"h-hero flex flex-col justify-center"}>
      <MetaDecorator
        title="Not found"
        description="This is not the webpage you are looking for"
      />
      <h1 className="leading text-3xl md:text-4xl xl:text-6xl text-center">
        404 - Oh no!
      </h1>
      <p className="text-secondary text-xl md:text-2xl xl:text-3xl text-center">
        The page you were looking for was not found
      </p>
    </main>
  );
};

export default Error;
