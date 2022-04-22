import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  PropsWithChildren,
  SetStateAction,
  Dispatch,
} from "react";
import Asset from "../types/Asset";

const AssetsContext = createContext<{
  nfts: Asset[];
  setNfts: Dispatch<SetStateAction<Asset[]>>;
}>({
  nfts: [],
  setNfts: () => {},
});

export const AssetsContextProvider = ({
  children,
}: PropsWithChildren<ReactNode>) => {
  const [nfts, setNfts] = useState([]);

  return (
    <AssetsContext.Provider value={{ nfts, setNfts }}>
      {children}
    </AssetsContext.Provider>
  );
};

export const useAssets = () => useContext(AssetsContext);
