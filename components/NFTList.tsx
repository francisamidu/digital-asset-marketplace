import React, { useEffect, useState } from "react";
import NFTCard from "./NFTCard";
import Asset from "../types/Asset";
import { useAssets, useApp } from "../contexts";

const NFTList = ({ page, assets, buyNft }: any) => {
  const { darkMode } = useApp();
  const {
    assets: { marketAssets },
    assets: list,
  } = useAssets();
  const [assetList, setAssetList] = useState<Asset[]>([]);

  useEffect(() => {
    if (marketAssets) {
      setAssetList(assets ? assets : marketAssets);
    }
  }, [marketAssets]);

  console.log(list);
  return (
    <section
      className={`${
        assetList.length > 0
          ? "grid nft-list"
          : "flex flex-row items-center justify-center min-h-screen"
      } bg-inherit`}
    >
      {assetList.length > 0 ? (
        assetList.map((nft, index) => (
          <NFTCard
            buyNft={buyNft}
            index={index}
            length={assetList.length}
            nft={nft}
            key={nft.tokenId}
            page={page}
          />
        ))
      ) : (
        <div className="flex flex-col self-center justify-center py-4 px-5">
          <h1 className={`text-2xl font-bold ${darkMode && "text-[#eee]"}`}>
            No Digital Assets available.
          </h1>
        </div>
      )}
    </section>
  );
};

export default NFTList;
