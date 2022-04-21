import Asset from "./Asset";
import Meta from "./Meta";

interface NFT extends Partial<Asset>, Partial<Meta> {}

export type { NFT, Asset, Meta };
