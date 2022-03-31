import { AppProps } from "next/app";
import { PropsWithChildren, ReactElement, ReactNode } from "react";
import "../styles/index.scss";
import "../node_modules/tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import {
  AppContextProvider,
  AssetsContextProvider,
  ContractProvider,
} from "../contexts";
import { NextPage } from "next";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout): unknown => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <AppContextProvider>
      <AssetsContextProvider>
        <ToastContainer />
        <ContractProvider>
          {getLayout(<Component {...pageProps} />)}
        </ContractProvider>
      </AssetsContextProvider>
    </AppContextProvider>
  );
};

export default App;
