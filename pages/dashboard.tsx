import { NextComponentType } from "next";
import React, { useEffect, useState } from "react";
import { Layout, NFTList } from "../components";
import { useContract } from "../contexts";

const Dashboard = () => {
  const { loadNFTs } = useContract();
  const [assets, setAssets] = useState([]);
  const [soldAssets, setSoldAssets] = useState([]);
  const noItems = assets.length + soldAssets.length;
  const loadAssets = async () => {
    try {
      const items = await loadNFTs("created-assets");
      setAssets(items);
      setSoldAssets(items.filter((i) => !!i.sold));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadAssets();
  }, [undefined]);
  return (
    <section className="min-h-screen bg-white py-4 px-6 mt-10">
      <div className={`flex-col ${assets.length < 1 ? "hidden" : "flex"}`}>
        <h1 className="text-2xl mb-4">All Assets</h1>
        <NFTList page="dashboard" assets={assets} />
      </div>
      <div
        className={`mt-5 flex-col ${soldAssets.length < 1 ? "hidden" : "flex"}`}
      >
        <h1 className="text-2xl mb-4">Sold Assets</h1>
        <NFTList assets={soldAssets} page="dashboard" />
      </div>
      <div
        className={`mt-20 ${
          !noItems ? "flex flex-row items-center justify-center" : "hidden"
        }`}
      >
        <h1 className="text-2xl">No Assets to show</h1>
      </div>
    </section>
  );
};

Dashboard.getLayout = (page: NextComponentType) => <Layout>{page}</Layout>;

export default Dashboard;
