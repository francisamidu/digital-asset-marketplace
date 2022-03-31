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
import { getProvider,getEnvVariable } from "../helpers";

const ContractContext = createContext(null);
const ContractProvider = ({
  children,
}: PropsWithChildren<Partial<ReactNode>>) => {
  const { setNfts } = useAssets();
  const { account, name, darkMode, year, setData } = useApp();
  const [nftMarketContract,setNftMarketContract] = useState(null)
  const [nftContract,setNftContract] = useState(null)

 
  useEffect(() => {
    //Blockchain config
    const wallet = ethers.Wallet.fromMnemonic(
      process.env.NEXT_PUBLIC_MNEMONIC
    );
    const provider = getProvider();

    const signer = wallet.connect(provider);
    const nftContract = new ethers.Contract(nftAddress, nftABI, signer);
    const nftMarketContract = new ethers.Contract(
      nftMarketAddress,
      nftMarketABI,
      signer
    );
    setNftContract(nftContract)
    setNftMarketContract(nftMarketContract)
    setAppFields();    
  }, [undefined]);

  useEffect(() => {
    if(nftContract && nftMarketContract){
      loadNFTs();          
    }
  },[nftContract,nftMarketContract])

  const fetchMarketItems = async () => {
    try{
      let itemIds = await nftMarketContract?._itemIds()
      itemIds = itemIds?.toString()
      const items = []

      for (let id = 0; id <= itemIds; id++) {
        if (id) {        
          let item = await nftMarketContract?.idToMarketItem(id);  
          const tokenUri = await nftContract?.tokenURI(item.tokenId);
          const request = await fetch(tokenUri);
          const meta = await request.json()
          const price = ethers.utils.parseUnits(item.price.toString(), "ether");          
          const newItem = {
            image: meta.image,
            title: meta.name,
            description: meta.description,
            price,
            tokenId: item.tokenId.toString(),
            owner: item.owner,
            seller: item.seller,
            sold: item.sold,
            tokenUri,
          };
          items.push(newItem);
        }
      }
      return items
    }catch(error) {
      throw error
    }
  }

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

  const loadNFTs = async (type = "my-assets") => {
    try {
      switch(type){
        case 'created-assets':{
          const items = await fetchMarketItems()
          setNfts(items);
          return items
        }
        case 'market-assets':{
          let items = await fetchMarketItems()
          items.filter(item => item.owner == "0x0")
          setNfts(items);
          return items
        }
        default:{
          let items = await fetchMarketItems()
          items.filter(item => item.owner == account)
          setNfts(items);
          return items
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

