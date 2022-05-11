import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
type AppValues = {
  name: string;
  darkMode: boolean;
  year: number;
};
const AppContext = createContext<{
  account: string;
  balance: string;
  name: string;
  networkId: number;
  year: number;
  darkMode: boolean;
  setData: Dispatch<SetStateAction<AppValues>>;
  setAccount: Dispatch<SetStateAction<string>>;
  setBalance: Dispatch<SetStateAction<string>>;
  setNetworkId: Dispatch<SetStateAction<number>>;
}>({
  account: "0",
  balance: "0",
  name: "",
  networkId: 0,
  year: 0,
  darkMode: false,
  setData: () => {},
  setAccount: () => {},
  setBalance: () => {},
  setNetworkId: () => {},
});

export const AppContextProvider = ({
  children,
}: PropsWithChildren<ReactNode>) => {
  const [data, setData] = useState({
    name: "MonsterCrypt",
    darkMode: false,
    year: new Date().getFullYear(),
  });

  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [networkId, setNetworkId] = useState(0);

  return (
    <AppContext.Provider
      value={{
        ...data,
        account,
        balance,
        setAccount,
        setBalance,
        networkId,
        setData,
        setNetworkId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
