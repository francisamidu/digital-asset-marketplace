import { NextComponentType } from "next";
import React, { useEffect, useState } from "react";
import { Layout, NFTList } from "../components";
import Modal from "web3modal";
import { nftAddress, nftMarketAddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import { ethers } from "ethers";

const Dashboard = () => {
  const [assets, setAssets] = useState([]);
  const [soldAssets, setSoldAssets] = useState([]);
  const noItems = assets.length + soldAssets.length
  console.log(noItems)
  const loadAssets = async () => {
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
    let data = await marketContract.fetchItemsCreated();
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
          sold: i.sold,
          owner: i.owner,
        };
        return item;
      })
    );
    setAssets(items);
    setSoldAssets(items.filter((i) => !!i.sold));
  };
  useEffect(() => {
    loadAssets();
  }, [undefined]);
  return (
    <section className="min-h-screen bg-white py-4 px-6 mt-10">
      <div className={`flex-col ${assets.length < 1 ? "hidden" : 'flex' }`}>
        <h1 className="text-2xl mb-4">All Assets</h1>
        <NFTList page="dashboard" assets={assets} />
      </div>
      <div className={`mt-5 flex-col ${soldAssets.length < 1 ? "hidden" : 'flex' }`}>
        <h1 className="text-2xl mb-4">Sold Assets</h1>
        <NFTList assets={soldAssets} page="dashboard" />
      </div>
      <div className={`mt-20 ${!noItems ? "flex flex-row items-center justify-center" : "hidden"}`}>
      <h1 className="text-2xl">No Assets to show</h1>
      </div>
    </section>
  );
};

Dashboard.getLayout = (page: NextComponentType) => <Layout>{page}</Layout>;

export default Dashboard;
