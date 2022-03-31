import { NextComponentType } from "next";
import React, { useEffect } from "react";
import { Layout, NFTList } from "../components";
import Modal from "web3modal";
import { ethers } from "ethers";
import { nftAddress, nftMarketAddress } from "../config";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import { useApp, useContract } from "../contexts";

const Assets = () => {
  const { loadNFTs } = useContract();
  const { setData,darkMode } = useApp();
  const buyNft = async (nft) => {
    const modal = new Modal();
    const connection = await modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftMarketAddress, Market.abi, signer);
    const price = await ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(nftAddress, nft.id, {
      value: price,
    });
    await transaction.wait();
    loadNFTs();
  };
  useEffect(() => {
    loadNFTs();
  }, [undefined]);
  return (
    <section className={`${darkMode && "bg-[#040D20]"}`}>
     <NFTList page="assets" buyNft={buyNft} />;
    </section>
  );
};

Assets.getLayout = (page: NextComponentType) => <Layout>{page}</Layout>;

export default Assets;
