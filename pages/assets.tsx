import { NextComponentType } from "next";
import React, { useEffect } from "react";
import { Layout, NFTList } from "../components";
import Modal from "web3modal";
import { ethers } from "ethers";
import { nftAddress, nftMarketAddress } from "../config";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import { useApp, useContract } from "../contexts";
import { toast } from "react-toastify";
import { Asset } from "../types";

const Assets = () => {
  const { loadAssets } = useContract();
  const { darkMode } = useApp();
  const buyNft = async (nft: Asset) => {
    const modal = new Modal();
    const connection = await modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftMarketAddress, Market.abi, signer);
    const price = ethers.utils.parseEther(String(nft.price));
    const transaction = await contract.createMarketSale(
      nftAddress,
      nft.tokenId,
      {
        value: price,
      }
    );
    const tx = await transaction.wait();
    toast.success("You own a new NFT!!");
    loadAssets();
  };

  return (
    <main className={`${darkMode && "bg-[#040D20]"} min-h-[94vh] pt-20`}>
      <section className="sm:max-w-screen-xl sm:mx-auto">
        <NFTList page="assets" buyNft={buyNft} />
      </section>
    </main>
  );
};

Assets.getLayout = (page: NextComponentType) => <Layout>{page}</Layout>;

export default Assets;
