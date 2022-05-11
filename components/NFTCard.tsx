import React from "react";
import Image from "next/image";

import { Button } from ".";
import { useApp } from "../contexts";
import { NFT } from "../types";
import { AiOutlineEllipsis as IEllipsis } from "react-icons/ai";

type NFTCardProps = {
  nft: NFT;
  buyNft: (nft: any) => Promise<void>;
  page?: string;
  index: number;
  length: number;
};
const NFTCard = ({ nft, buyNft, page = "index" }: NFTCardProps) => {
  const { tokenId, image, name, price, username } = nft;
  const { darkMode } = useApp();
  return (
    <div
      className={`p-4 min-w-300 flex-1 max-w-320 sm:my-4 sm:mr-4 my-0 mr-0 rounded-md hover:-translate-y-2 transition-all duration-100 shadow
      ${darkMode && "bg-[#212124] text-white"}`}
    >
      <div className="flex flex-row items-center mb-3">
        <Image
          src="/avatar1.png"
          width="30"
          height="30"
          className="rounded-md"
        />
        <span className="uppercase text-xs ml-3">@{username}</span>
      </div>
      <Image
        src={image || "/9814.jpg"}
        loader={({ src }) => src}
        unoptimized={true}
        layout="responsive"
        width="400"
        height="300"
        className="w-full rounded-md"
      />
      {page === "index" ? (
        <div className="py-2 text-center">
          <div className="flex flex-row items-center justify-between mb-2">
            <h1 className="font-bold capitalize color-dark-blue">
              {name} #{tokenId}
            </h1>
            <IEllipsis className={`text-[#ccc] ${darkMode && "text-white"}`} />
          </div>
          <p className="text-[#eee]">@{username.toLocaleLowerCase()}</p>
          <p className="color-purple font-bold">{price} eth</p>
          <div className="flex flex-row items-center justify-center">
            <Button
              text="Buy NFT"
              className="mt-4 btn-purple w-full"
              onClick={() => buyNft(nft)}
            />
          </div>
        </div>
      ) : (
        <div className="py-2">
          <h1 className="font-bold text-2xl capitalize color-dark-blue">
            {name}
          </h1>
          <p className="color-purple font-bold">{price} eth</p>
          <div className="flex flex-row justify-center items-center w-full">
            <Button
              className="w-full"
              text="Purchase"
              onClick={() => buyNft(nft)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTCard;
