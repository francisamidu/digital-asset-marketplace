import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ethers } from "ethers";
import { nftAddress, nftMarketAddress, nftABI, nftMarketABI } from "../config";
import { useAssets, useApp } from ".";
import { toast } from "react-toastify";
import { formatDate } from "../helpers";

const ContractContext = createContext<{
  loadNFTs: (assets?: string) => any;
}>(null);
const ContractProvider = ({
  children,
}: PropsWithChildren<Partial<ReactNode>>) => {
  const { setNfts } = useAssets();
  const { account, name, darkMode, year, setData } = useApp();
  const [nftMarketContract, setNftMarketContract] = useState(null);
  const [nftContract, setNftContract] = useState(null);

  useEffect(() => {
    //Blockchain config
    makeConnection();
  }, [undefined]);

  useEffect(() => {
    if (nftContract && nftMarketContract) {
      loadNFTs();
    }
  }, [nftContract, nftMarketContract]);

  const fetchMarketItems = async () => {
    try {
      let itemIds = await nftMarketContract?._itemIds();
      itemIds = itemIds?.toString();
      const items = [];

      for (let id = 0; id <= itemIds; id++) {
        if (id) {
          let item = await nftMarketContract?.idToMarketItem(id);
          const tokenUri = await nftContract?.tokenURI(item.tokenId);
          const request = await fetch(tokenUri);
          const meta = await request.json();
          const price = ethers.utils.parseUnits(item.price.toString(), "ether");
          const newItem = {
            category: item.category,
            image: meta.image,
            name: meta.name,
            description: meta.description,
            price,
            tokenId: item.tokenId.toString(),
            owner: item.owner,
            seller: item.seller,
            sold: item.sold,
            timestamp: formatDate(new Date(item.timestamp.toNumber())),
            username: item.username,
            tokenUri,
          };
          items.push(newItem);
        }
      }
      return items;
    } catch (error) {
      throw error;
    }
  };

  const makeConnection = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      // const provider = new ethers.providers.JsonRpcProvider(
      //   `https://ropsten.infura.io/v3/${process.env.INFURA_ID}`
      // );
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(nftAddress, nftABI, provider);
      const nftMarketContract = new ethers.Contract(
        nftMarketAddress,
        nftMarketABI,
        signer
      );
      const signerAddress = await signer.getAddress();
      const accountBalance = (
        await provider.getBalance(signerAddress)
      ).toString();
      setAppFields(signerAddress, accountBalance);
      setNftContract(nftContract);
      setNftMarketContract(nftMarketContract);
    } catch (error) {
      console.log(error);
      toast.error("Error: Retrieving data failed. Try reloading the page");
    }
  };

  const setAppFields = async (address: string, balance: string) => {
    setData({
      account: address,
      balance,
      name,
      darkMode,
      year,
    });
  };

  const loadNFTs = async (type = "my-assets") => {
    try {
      switch (type) {
        case "created-assets": {
          const items = await fetchMarketItems();
          setNfts(items);
          return items;
        }
        case "market-assets": {
          let items = await fetchMarketItems();
          items.filter((item) => item.owner == "0x0");
          setNfts(items);
          return items;
        }
        default: {
          let items = await fetchMarketItems();
          items.filter((item) => item.owner == account);
          setNfts(items);
          return items;
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Check your internet");
      console.log(error);
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
