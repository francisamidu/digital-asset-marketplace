const nftAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
const nftMarketAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

import nftAbi from "./artifacts/contracts/NFT.sol/NFT.json";
import nftMarketAbi from "./artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const nftABI = nftAbi.abi;
const nftMarketABI = nftMarketAbi.abi;

export { nftAddress, nftMarketAddress, nftABI, nftMarketABI };
