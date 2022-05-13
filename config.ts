// Prod
const nftAddress = "0x6573315B41822F2670D4C2f10668F0B3600000A0";
const nftMarketAddress = "0xa01b5142f1c7C4860B44A005fb8C16D31a2c486b";

// Dev addresses
// const nftAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
// const nftMarketAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

import nftAbi from "./artifacts/contracts/NFT.sol/NFT.json";
import nftMarketAbi from "./artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const nftABI = nftAbi.abi;
const nftMarketABI = nftMarketAbi.abi;

export { nftAddress, nftMarketAddress, nftABI, nftMarketABI };
