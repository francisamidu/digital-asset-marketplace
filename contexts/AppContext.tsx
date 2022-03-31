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
  account: string;
  balance:string;
  name: string;
  darkMode: boolean;
  year: number;
};
const AppContext = createContext<{
  account: string;
  balance: string;
  name: string;
  year: number;
  darkMode: boolean;
  setData: Dispatch<SetStateAction<AppValues>>;
}>({
  account: "",
  balance:"0",
  name: "",
  year: 0,
  darkMode: false,
  setData: () => {},
});

export const AppContextProvider = ({
  children,
}: PropsWithChildren<ReactNode>) => {
  const [data, setData] = useState({
    account: "",
    balance:0,
    name: "MonsterCrypt",
    darkMode: false,
    year: new Date().getFullYear(),
  });

  return (
    <AppContext.Provider value={{ ...data, setData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
