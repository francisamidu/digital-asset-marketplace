import React, { ChangeEvent, useState } from "react";
import { NextComponentType } from "next";
import router from "next/router";
import { Layout, Button } from "../components";
import { ethers } from "ethers";
import { create as ipfsClient } from "ipfs-http-client";
import Modal from "web3modal";
import { nftAddress, nftMarketAddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import { toast } from "react-toastify";
import { useApp, useContract } from "../contexts";

const client = ipfsClient({
  apiPath: "/api/v0",
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const CreateItem = () => {
  const { darkMode } = useApp();
  const [category, setCategory] = useState("");
  const [username, setUsername] = useState("");
  const [item, setItem] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
  });
  const createMarketItem = async () => {
    const isItemFilled = Object.values(item).some((val) => !!val);
    if (!isItemFilled) {
      toast.error("Please enter all the fields");
      return;
    }
    try {
      //Connect to wallet
      const modal = new Modal();
      const connection = await modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      //Create Contract instances
      const nftContract = new ethers.Contract(nftAddress, NFT.abi, signer);
      const nftMarketContract = new ethers.Contract(
        nftMarketAddress,
        Market.abi,
        signer
      );

      // Upload files
      const imageRequest = await client.add(item.image);
      const url = `https://ipfs.infura.io/ipfs/${imageRequest.path}`;
      setItem({ ...item, image: url });

      const data = JSON.stringify({
        ...item,
        category,
      });
      const request = await client.add(data);
      const tokenUri = `https://ipfs.infura.io/ipfs/${request.path}`;
      await nftMarketContract.createSale(tokenUri);

      //Create token and market listing
      let transaction = await nftContract.createToken(tokenUri);
      const tx = await transaction.wait();

      const tokenId = tx.events[0].args["tokenId"].toNumber();
      const price = await ethers.utils.parseUnits(
        item.price.toString(),
        "ether"
      );
      const listingPrice = await nftMarketContract.getListingPrice();

      transaction = await nftMarketContract.createMarketItem(
        nftAddress,
        tokenId,
        price,
        category,
        username,
        Date.now(),
        {
          value: listingPrice.toString(),
        }
      );
      toast.success("Hooray!!NFT minted");
      // router.push("/assets");
    } catch (error) {
      console.log(error);
      toast.error("Sorry something wrong happened");
      return;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createMarketItem();
    setItem({
      name: "",
      description: "",
      image: "",
      price: "",
    });
    setCategory("");
    setUsername("");
  };
  return (
    <section
      className={`flex flex-row items-center justify-center min-h-screen ${
        darkMode && "bg-[#040D20]"
      }`}
    >
      <form
        className="min-w-[600px] rounded-md shadow bg-white p-5 flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          onChange={(event) => setItem({ ...item, name: event.target.value })}
          className="rounded p-4 h-[38px] w-full mt-2 border-[1px] border-[#eee] outline-none"
          value={item.name}
          placeholder="Asset Name"
        />
        <input
          type="text"
          onChange={(event) => setCategory(event.target.value)}
          className="rounded p-4 h-[38px] w-full mt-2 border-[1px] border-[#eee] outline-none"
          value={category}
          placeholder="Asset Category"
        />
        <input
          type="text"
          onChange={(event) => setUsername(event.target.value)}
          className="rounded p-4 h-[38px] w-full mt-2 border-[1px] border-[#eee] outline-none"
          value={username}
          placeholder="Username"
        />
        <textarea
          className="bg-inherit p-4 mt-2 border-[1px] border-[#eee] outline-none w-full"
          name=""
          id=""
          cols={8}
          rows={8}
          value={item.description}
          onChange={(event) => {
            setItem({ ...item, description: event.target.value });
          }}
          placeholder="Asset Description"
        ></textarea>
        <input
          type="text"
          onChange={(event) => setItem({ ...item, price: event.target.value })}
          className="rounded p-4 h-[38px] w-full my-2 border-[1px] border-[#eee] outline-none"
          value={item.price}
          placeholder="Asset Price in ETH"
        />
        <input
          type="file"
          id="image"
          className="mt-2 rounded-sm w-full py-2 px-2 border-[1px] border-[#eee]"
          onChange={(event: ChangeEvent<any>) => {
            const file = event?.target?.files[0];
            const url = URL.createObjectURL(file);
            setItem({
              ...item,
              image: url,
            });
          }}
        />
        <Button
          text="Create Digital Asset"
          type="submit"
          className="mt-4 w-full"
        />
      </form>
    </section>
  );
};

CreateItem.getLayout = (page: NextComponentType) => <Layout>{page}</Layout>;

export default CreateItem;
