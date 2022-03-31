import { NextComponentType } from "next";
import React from "react";
import { Layout, Header, AboutUs, Features, Cta, Footer } from "../components";

const App = () => {
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
