const nftAddress = "0x5bd3D33467764746222c327A4C3D4e0107B15b39";
const nftMarketAddress = "0xC937D9Af0eb750e426D28dA51A59eAcB0Cc1E814";

import nftAbi from "./artifacts/contracts/NFT.sol/NFT.json";
import nftMarketAbi from "./artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const nftABI = nftAbi.abi;
const nftMarketABI = nftMarketAbi.abi;

export { nftAddress, nftMarketAddress, nftABI, nftMarketABI };
