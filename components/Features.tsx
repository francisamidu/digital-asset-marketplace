import React from "react";
import { uid } from "../helpers";

import {
  IoLockClosed as ISecurity,
  IoImage as IImage,
  IoCartOutline as ICart,
} from "react-icons/io5";

const features = [
  {
    id: uid(),
    title: "Unique",
    description:
      "The NFTs we provide here are unique. You won't find them anywhere else!!",
    icon: <ISecurity className="text-3xl text-white" />,
  },
  {
    id: uid(),
    title: "Best Quality",
    description:
      "We only provide Monster NFTs with the best quality with a wide range of variants.",
    icon: <IImage className="text-3xl text-white" />,
  },
  {
    id: uid(),
    title: "Easy Shopping",
    description:
      "Easy and convenient checkout process. Just connect your wallet and you're good to go",
    icon: <ICart className="text-3xl text-white" />,
  },
];
const Features = () => {
  return (
    <section className="py-8 px-5 bg-[#1B2041]">
      <div className="md:max-w-screen-lg md:mx-auto">
        <h1 className="uppercase text-center mb-4 text-white">Features</h1>
        <h2 className="text-4xl font-bold text-white text-center my-6">
          Features We Provide
        </h2>
        <div className="flex flex-col flex-1 sm:flex-row items-center">
          {features.map((f, index) => (
            <div
              key={f.id}
              className={`feature bg-[#494F74] rounded-md p-8 sm:max-w-[320px] flex flex-col justify-center items-center ${
                index === 1 ? "sm:mx-4 my-2 sm:my-0" : ""
              } hover:bg-blue-500 transition duration-200 scale-1`}
            >
              <div className="p-4 rounded-full bg-[#1B2041]">{f.icon}</div>
              <h3 className="font-bold my-2 text-[1rem] text-white">
                {f.title}
              </h3>
              <p className="text-[#ccc] text-center">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
