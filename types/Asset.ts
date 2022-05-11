type Asset = {
  category: string;
  description: string;
  name: string;
  owner: string;
  price: string | number;
  sold: boolean;
  seller: string;
  timestamp: Date | string | number;
  tokenId: string | number;
  tokenUri: string;
  username: string;
};
export default Asset;
