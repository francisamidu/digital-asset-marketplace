import { NextComponentType } from "next";
import React from "react";
import { Layout, Header, AboutUs, Features, Cta, Footer } from "../components";
import millify from "millify"

const App = () => {
  console.log(millify(200000000))
  return (
    <>
      <Header />
      <AboutUs />
      <Features />
      <Cta />
      <Footer />
    </>
  );
};

App.getLayout = (page: NextComponentType) => <Layout>{page}</Layout>;

export default App;
