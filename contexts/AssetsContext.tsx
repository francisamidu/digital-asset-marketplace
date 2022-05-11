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
  assets: {
    createdAssets: Asset[];
    marketAssets: Asset[];
    myAssets: Asset[];
  };
  setAssets: Dispatch<
    SetStateAction<{
      createdAssets: Asset[];
      marketAssets: Asset[];
      myAssets: Asset[];
    }>
  >;
}>({
  assets: {
    createdAssets: [],
    marketAssets: [],
    myAssets: [],
  },
  setAssets: () => {},
});

export const AssetsContextProvider = ({
  children,
}: PropsWithChildren<ReactNode>) => {
  const [assets, setAssets] = useState({
    createdAssets: [],
    marketAssets: [],
    myAssets: [],
  });

  return (
    <AssetsContext.Provider value={{ assets, setAssets }}>
      {children}
    </AssetsContext.Provider>
  );
};

export const useAssets = () => useContext(AssetsContext);
