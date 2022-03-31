const nftAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";
const nftMarketAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";

import nftAbi from "./artifacts/contracts/NFT.sol/NFT.json";
import nftMarketAbi from "./artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const nftABI = nftAbi.abi;
const nftMarketABI = nftMarketAbi.abi;

export { nftAddress, nftMarketAddress, nftABI, nftMarketABI };
