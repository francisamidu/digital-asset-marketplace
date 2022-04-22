import { NextComponentType } from "next";
import React, { useEffect, useState } from "react";
import { Layout, NFTList } from "../components";
import { useApp, useContract } from "../contexts";

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const { darkMode } = useApp();
  const { loadNFTs } = useContract();

  const loadAssets = async () => {
    try {
      const items = await loadNFTs();
      setAssets(items);
    } catch {
      console.log("Whoops");
    }
  };

  useEffect(() => {
    loadAssets();
  }, [undefined]);
  return (
    <section className={`${darkMode && "bg-[#040D20]"}`}>
      <NFTList page="assets" assets={assets} />;
    </section>
  );
};

Assets.getLayout = (page: NextComponentType) => <Layout>{page}</Layout>;

export default Assets;
