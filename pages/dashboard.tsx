import { NextComponentType } from "next";
import React, { useEffect, useState } from "react";
import { Layout, NFTList } from "../components";
import { useApp, useAssets } from "../contexts";

const Dashboard = () => {
  const { assets: tempAssets } = useAssets();
  const { darkMode } = useApp();
  const [assets, setAssets] = useState([]);
  const [soldAssets, setSoldAssets] = useState([]);
  const [noItems, setNoItems] = useState(0);

  useEffect(() => {
    if (tempAssets.createdAssets.length) {
      setAssets(tempAssets.createdAssets);
    }
    const sold = tempAssets.createdAssets.filter((a) => !!a.sold);
    setSoldAssets(sold);
    setNoItems(assets.length + soldAssets.length);
  }, [assets]);

  return (
    <main className="sm:max-w-screen-xl sm:mx-auto">
      <section
        className={`${
          darkMode && "bg-[#040D20]"
        } min-h-[94vh] h-full bg-white py-4 px-6 mt-10`}
      >
        <div className={`flex-col ${assets.length < 1 ? "hidden" : "flex"}`}>
          <h1 className="text-2xl mb-4 font-bold">All Assets</h1>
          <NFTList page="dashboard" assets={assets} />
        </div>
        <div
          className={`mt-5 flex-col ${
            soldAssets.length < 1 ? "hidden" : "flex"
          }`}
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
    </main>
  );
};

Dashboard.getLayout = (page: NextComponentType) => <Layout>{page}</Layout>;

export default Dashboard;
