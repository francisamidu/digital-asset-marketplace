// Prod
// const nftAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
// const nftMarketAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Dev addresses
const nftAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const nftMarketAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

import nftAbi from "./artifacts/contracts/NFT.sol/NFT.json";
import nftMarketAbi from "./artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const nftABI = nftAbi.abi;
const nftMarketABI = nftMarketAbi.abi;

export { nftAddress, nftMarketAddress, nftABI, nftMarketABI };
