import React from "react";
import { Button } from ".";
import { useApp } from "../contexts"

const Cta = () => {
  const { darkMode } = useApp()
  return (
    <section className={`py-12 px-8 bg-white ${darkMode && "bg-[#08183A] text-[#eee]"}`}>
      <div className="md:max-w-screen-lg m-auto flex flex-col  items-center justify-center text-center text-left">
        <h1 className="color-teal text-2xl font-bold">
          Wanna be among the happy Monster NFT owners?
        </h1>
        <h2 className="text-1xl font-semibold mt-5">
          Get started by joining the leading NFT crowd!
        </h2>
        <Button text="Explore Marketplace" className="mt-4" />
      </div>
    </section>
  );
};

export default Cta;
