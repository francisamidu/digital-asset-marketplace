import React from "react";
import Image from "next/image";
import { useApp } from "../contexts";
import Button from "./Button";
import router from "next/router"

const Header = () => {
  const { name,darkMode } = useApp();
  const handleClick = () => {
    router.push("/assets")
  }
  return (
    <section className={`bg-white ${darkMode && "bg-[#0F0F2B]"} min-h-screen py-3`}>
      <div className="md:max-w-screen-xl md:mx-auto flex flex-col md:flex-row md:justify-center items-center pt-6 mt-10">
        <div className={`flex flex-col items-center sm:items-start sm:w-2/5 w-4/5 text-center sm:text-left sm:order-1 order-2 ${darkMode && "text-[#eee]"}`}>
          <h1 className="sm:text-5xl text-3xl leading-snug font-bold ">
            Discover, and collect extraordinary {name}
            <span className="text-[#4552A8] ml-2">NFTs</span>
          </h1>
          <h2 className="text-1xl mt-8">
            Marketplace for monster character collections non fungible token
            (NFTs).
          </h2>
          <Button text="Get Started" right={true} onClick={handleClick}/>
        </div>
        <div className="sm:order-2 order-1 relative flex flex-row justify-center sm:px-0 px-6 ml-0 sm:ml-3 sm:mb-0 mb-4">
          <Image
            src="/29932.jpg"
            layout="intrinsic"
            width="550"
            height="550"
            className="w-full rounded-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
