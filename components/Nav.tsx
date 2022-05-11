import React, { useEffect, useState } from "react";
import { uid } from "../helpers";
import { useApp } from "../contexts";
import Link from "next/link";
import { IoMenu as IMenu } from "react-icons/io5";
import { IoIosMoon as Moon } from "react-icons/io";
import millify from "millify";
import { ethers } from "ethers";

const Nav = () => {
  const [links, setLinks] = useState([
    {
      active: true,
      id: uid(),
      path: "/",
      text: "Home",
    },
    {
      active: false,
      id: uid(),
      path: "/create-item",
      text: "Sell Assets",
    },
    {
      active: false,
      id: uid(),
      path: "/my-assets",
      text: "My Assets",
    },
    {
      active: false,
      id: uid(),
      path: "/assets",
      text: "Marketplace",
    },
    {
      active: false,
      id: uid(),
      path: "/dashboard",
      text: "Dashboard",
    },
  ]);
  const {
    account,
    balance: accountBalance,
    name,
    networkId,
    darkMode,
    year,
    setData,
  } = useApp();
  const [balance, setBalance] = useState<number | string>("");
  const [address, setAddress] = useState("");
  const [symbol, setSymbol] = useState("");

  const setLinkState = (id: string) => {
    setLinks(
      links.map((link) => {
        if (link.id === id) {
          link.active = true;
        } else {
          link.active = false;
        }
        return link;
      })
    );
  };

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (accountBalance) {
      setBalance(Math.floor(Number(ethers.utils.formatEther(accountBalance))));
    }
    if (account) {
      setAddress(
        `${account.slice(0, 5)}...${account.slice(
          account.length - 5,
          account.length
        )}`
      );
    }

    switch (networkId) {
      case 97: {
        setSymbol("Bnb");
      }
      case 137: {
        setSymbol("Matic");
      }
      default: {
        setSymbol("Eth");
      }
    }
  }, [accountBalance, account, networkId]);

  return (
    <section
      className={`bg-white ${darkMode && "bg-[#040B1A]"} ${
        !darkMode && "shadow shadow-[#eee]"
      } fixed top-0 left-0 w-full z-10 sm:py-0 py-1`}
    >
      <div className="md:max-w-screen-xl md:mx-auto relative">
        <nav className="flex flex-row items-center justify-between py-[0.3rem] px-6">
          <h1 className={`font-bold text-2xl ${darkMode && "text-white"}`}>
            {name}
          </h1>
          <div className={`hidden sm:flex flex-col sm:flex-row items-center`}>
            {links.map((link) => (
              <Link href={link.path} key={link.id}>
                <a
                  className={`transition-colors relative duration-300 font-bold text-md py-1 mr-5 border-t-2 border-transparent ${
                    darkMode ? "text-white" : ""
                  } ${link.active ? "link-active text-[#4552A8]" : ""}`}
                  onClick={() => setLinkState(link.id)}
                >
                  {link.text}
                </a>
              </Link>
            ))}
          </div>
          {showMenu && (
            <div className="flex flex-col bg-white z-index-10 absolute top-10 right-0 p-4 shadow rounded-md transition-all duration-200">
              {links.map((link) => (
                <Link href={link.path} key={link.id}>
                  <a
                    className={`transition-colors relative duration-300 text-md py-1 mr-5${
                      darkMode ? "text-white" : ""
                    }`}
                    onClick={() => setLinkState(link.id)}
                  >
                    {link.text}
                  </a>
                </Link>
              ))}
            </div>
          )}
          <div className="sm:flex flex-row items-center">
            <span
              className={`font-bold text-sm mr-6 ${darkMode && "text-white"}`}
            >
              {balance.toString().length > 4
                ? millify(Number(balance))
                : balance}{" "}
              {symbol}
            </span>
            <span
              className={`font-bold text-[#4552A8] bg-[#eee] ${
                darkMode && "bg-[#4552A8] text-[#eee]"
              } rounded-md py-2 p-3 `}
            >
              {address}
            </span>
            <Moon
              className={`ml-3 text-2xl cursor-pointer ${
                darkMode && "text-white"
              }`}
              onClick={() =>
                setData({
                  name,
                  darkMode: !darkMode,
                  year,
                })
              }
            />
          </div>
          <IMenu
            className="text-2xl block sm:hidden top-2 right-2 cursor-pointer absolute"
            onClick={() => setShowMenu(!showMenu)}
          />
        </nav>
      </div>
    </section>
  );
};

export default Nav;
