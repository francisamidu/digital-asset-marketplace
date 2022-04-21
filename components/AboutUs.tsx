import React from "react";
import { useApp } from "../contexts";
import Image from "next/image";
import Link from "next/link";
import {
  IoHome as IHome,
  IoCartOutline as ICart,
  IoRefreshCircleOutline as IRefresh,
} from "react-icons/io5";

const AboutUs = () => {
  const { name,darkMode } = useApp();
  return (
    <section className={`py-10 bg-[#eee] ${darkMode && "bg-[#13132B]"}`}>
      <div className="md:max-w-screen-lg md:m-auto ">
        <div className="flex flex-col md:flex-row justify-center  mt-5">
          <div>
            <div className="bg-white rounded-xl p-4 max-w-[400px] sm:max-w-full">
              <div className="flex flex-row items-center justify-between mb-4">
                <IHome className="text-sm text-blue-500" />
                <div className="flex flex-row items-center justify-center">
                  <ICart className="text-sm text-[#666] mr-1" />
                  <IRefresh className="ml-1 text-sm text-[#666]" />
                </div>
              </div>
              <h2 className="font-bold text-1xl">Best NFT for your gallery</h2>
              <div className="flex flex-row items-center justify-between my-4">
                <span className="bg-blue-400 py-1 px-3 rounded-md text-white text-sm">
                  All
                </span>
                <span className="bg-white py-1 px-3 rounded-md text-gray-500 text-sm">
                  New
                </span>
                <span className="bg-white py-1 px-3 rounded-md text-gray-500 text-sm">
                  Popular
                </span>
              </div>
              <div className="relative">
                <Image
                  src="/5409458.jpg"
                  layout="responsive"
                  width="400"
                  height="300"
                  className="w-full rounded-md"
                />
                <h3 className="font-bold my-2">Frontline Bloomer</h3>
              </div>
            </div>
          </div>
          <div className="sm:w-1/2 flex flex-col ml-4 text-center sm:text-left p-4 sm:p-0">
            <h1 className="text-[#4552A8] font-bold text-3xl mb-4 ">
              About {name}
            </h1>
            <p className="text-gray-600">
              Discover the largest
              <Link href="https://www.bing.com/search?q=what+is+an+nft">
                <a className="text-[#4552A8] px-2 font-bold">NFT</a>
              </Link>
              monster NFT marketplace on the web. Here we give you the most
              exclusive and rare digital artworks. Find extraordinary monster
              NFT art on this marketplace.
            </p>
            <div className="mt-5 flex flex-col md:flex-row items-center justify-between">
              <div className="relative">
                <Image
                  src="/29932.jpg"
                  layout="intrinsic"
                  width="400"
                  height="300"
                  className="w-full rounded-md"
                />
              </div>
              <div className="relative sm:mx-4">
                <Image
                  src="/3081783.jpg"
                  layout="intrinsic"
                  width="400"
                  height="300"
                  className="w-full rounded-md"
                />
              </div>
              <div className="relative">
                <Image
                  src="/5409458.jpg"
                  layout="intrinsic"
                  width="400"
                  height="300"
                  className="w-full rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
