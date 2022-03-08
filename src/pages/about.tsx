import type { NextPage } from "next";
import { Fragment } from "react";
import MetaDecorator from "../components/MetaDecorator";

const Home: NextPage = () => {
  return (
    <main>
      <MetaDecorator title="About Me" description="Learn about Dhruman Gupta" />
    </main>
  );
};

export default Home;
