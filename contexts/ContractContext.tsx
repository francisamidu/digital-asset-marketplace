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
  loadAssets: () => Promise<any>;
}>(null);
const ContractProvider = ({
  children,
}: PropsWithChildren<Partial<ReactNode>>) => {
  const { setAssets } = useAssets();
  const { account, setAccount, setBalance, setNetworkId } = useApp();
  const [nftMarketContract, setNftMarketContract] = useState(null);
  const [nftContract, setNftContract] = useState(null);

  useEffect(() => {
    //Blockchain config
    makeConnection();
  }, [undefined]);

  useEffect(() => {
    if (nftContract && nftMarketContract) {
      loadAssets();
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
          const newItem = {
            category: item.category,
            image: meta.image,
            name: meta.name,
            description: meta.description,
            price: ethers.utils.formatEther(item.price),
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

      const chainId = await (await provider.getNetwork()).chainId;
      const signerAddress = await signer.getAddress();
      const accountBalance = (
        await provider.getBalance(signerAddress)
      ).toString();

      setAccount(signerAddress);
      setBalance(accountBalance);
      setNftContract(nftContract);
      setNftMarketContract(nftMarketContract);
      setNetworkId(chainId);

      loadAssets();
    } catch (error) {
      console.log(error);
      toast.error("Error: Retrieving data failed. Try reloading the page");
    }
  };

  const loadAssets = async () => {
    try {
      const createdItems = await fetchMarketItems();
      const marketItems = createdItems.filter((item) => item.owner == "0x0");
      const myItems = createdItems.filter((item) => item.owner == account);
      setAssets({
        createdAssets: createdItems,
        marketAssets: marketItems,
        myAssets: myItems,
      });
    } catch (error) {
      toast.error("Something went wrong. Check your internet");
      console.log(error);
    }
  };

  return (
    <ContractContext.Provider value={{ loadAssets }}>
      {children}{" "}
    </ContractContext.Provider>
  );
};
const useContract = () => useContext(ContractContext);
export { ContractProvider, useContract };
