import { NextComponentType } from "next";
import React, { useEffect, useState } from "react";
import { Layout, NFTList } from "../components";
import { useApp, useAssets } from "../contexts";

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const { darkMode } = useApp();
  const { assets: tempAssets } = useAssets();

  useEffect(() => {
    setAssets(tempAssets.myAssets);
  }, [tempAssets]);
  return (
    <section className={`${darkMode && "bg-[#040D20]"}`}>
      <NFTList page="assets" assets={assets} />
    </section>
  );
};

Assets.getLayout = (page: NextComponentType) => <Layout>{page}</Layout>;

export default Assets;
