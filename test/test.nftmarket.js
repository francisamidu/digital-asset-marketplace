const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarket", () => {
  it("Should create an nft and execute sales", async () => {
    const Market = await ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy();
    await market.deployed();
    const marketAddress = market.address;

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(marketAddress);
    await nft.deployed();
    const nftAddress = nft.address;

    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();

    let auctionPrice = ethers.utils.parseUnits("100", "ether");

    await nft.createToken("https://www.token.com");
    await nft.createToken("https://www.token1.com");

    await market.createMarketItem(nftAddress, 1, auction, {
      value: listingPrice,
    });
    await market.createMarketItem(nftAddress, 2, auction, {
      value: listingPrice,
    });

    const [_, buyerAddress] = await ethers.getSigners();

    await market
      .connect(buyerAddress)
      .createMarketSale(nftAddress, 1, { value: auctionPrice });

    let items = await market.fetchMarketItems();
    items = await Promise.all(
      items.map(async (i) => {
        const tokenUri = await nft.tokenURI(i.tokenId);
        let item = {
          price: i.price.toString(),
          tokenId: i.tokenId.toString(),
          buyer: i.buyer,
          seller: i.seller,
          tokenUri,
        };
        return item;
      })
    );
  });
});
