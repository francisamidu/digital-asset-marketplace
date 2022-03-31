import { ethers } from "ethers";
import { NextComponentType } from "next";
import React, { useEffect, useState } from "react";
import { Layout, NFTList } from "../components";
import Modal from "web3modal";
import { nftAddress, nftMarketAddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import { useApp } from "../contexts"

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const { darkMode } = useApp()
  const loadNFTs = async () => {
    const modal = new Modal();
    const connection = await modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    let nftContract = new ethers.Contract(nftAddress, NFT.abi, signer);
    let marketContract = new ethers.Contract(
      nftMarketAddress,
      Market.abi,
      signer
    );
    let data = await marketContract.fetchMyNFTs();
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await nftContract.tokenURI(i.tokenId);
        const request = await fetch(tokenUri);
        const meta = await request.json();
        const price = ethers.utils.parseUnits(i.price.toString(), "ether");
        let item = {
          id: i.tokenId.toNumber(),
          price: price.toString(),
          seller: i.seller,
          image: meta.image,
          owner: i.owner,
        };
        return item;
      })
    );
    setAssets(items);
  };
  useEffect(() => {
    loadNFTs();
  }, [undefined]);
  return (
    <section className={`${darkMode && "bg-[#040D20]"}`}>
     <NFTList page="assets" assets={assets} />;
    </section>
  )
};

Assets.getLayout = (page: NextComponentType) => <Layout>{page}</Layout>;

export default Assets;
