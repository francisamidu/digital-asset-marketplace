import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Modal from "web3modal";
import { ethers } from "ethers";
import { nftAddress, nftMarketAddress, nftABI, nftMarketABI } from "../config";
import { useAssets, useApp } from ".";
import { toast } from "react-toastify";
import { getProvider } from "../helpers";

const ContractContext = createContext(null);
const ContractProvider = ({
  children,
}: PropsWithChildren<Partial<ReactNode>>) => {
  const { setNfts } = useAssets();
  const { account, name, darkMode, year, setData } = useApp();

  useEffect(() => {
    //Blockchain config
    const provider = getProvider();
    const nftContract = new ethers.Contract(nftAddress, nftABI, provider);
    const nftMarketContract = new ethers.Contract(
      nftMarketAddress,
      nftMarketABI,
      provider
    );
    setAppFields();
    loadNFTs(nftMarketContract, nftContract);
  }, [undefined]);

  const setAppFields = async () => {
    const modal = new Modal();
    const connection = await modal.connect();
    const walletProvider = new ethers.providers.Web3Provider(connection);
    const balance = await walletProvider.getBalance(connection.selectedAddress);
    setData({
      account: connection.selectedAddress,
      balance: balance.toString(),
      name,
      darkMode,
      year,
    });
  };

  const loadNFTs = async (market, nftContract) => {
    try {
      let data = await market.fetchMarketItems();
      const items = await Promise.all(
        data.map(async (i) => {
          try {
            const tokenUri = await nftContract.tokenURI(i.tokenId);
            const request = await fetch(tokenUri);
            const meta = await request.json();
            const price = ethers.utils.parseUnits(i.price.toString(), "ether");
            let item = {
              id: i.tokenId.toNumber(),
              price: price.toString(),
              seller: i.seller,
              image: meta.image,
              title: meta.name,
              description: meta.description,
            };
            return item;
          } catch (error) {
            console.log(error);
            toast.error("Something went wrong. Check your internet");
            return {};
          }
        })
      );
      setNfts(items);
    } catch (error) {
      toast.error("Something went wrong. Check your internet");
      console.log(market);
    }
  };

  return (
    <ContractContext.Provider value={{ loadNFTs }}>
      {children}{" "}
    </ContractContext.Provider>
  );
};
const useContract = () => useContext(ContractContext);
export { ContractProvider, useContract };
export default {};
