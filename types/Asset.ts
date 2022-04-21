type Asset = {
  id: string | number;
  tokenId: string | number;
  seller: string;
  owner: string;
  price: string | number;
  timestamp: Date | string | number;
  sold: boolean;
  category: string;
  username: string;
};
export default Asset;
