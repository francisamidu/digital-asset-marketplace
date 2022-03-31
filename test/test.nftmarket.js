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

    await market.createMarketItem(nftAddress, 1, auctionPrice, {
      value: listingPrice,
    });
    await market.createMarketItem(nftAddress, 2, auctionPrice, {
      value: listingPrice,
    });

    const [_, buyerAddress] = await ethers.getSigners();

    await market
      .connect(buyerAddress)
      .createMarketSale(nftAddress, 1, { value: auctionPrice });

    let itemIds = await market._itemIds()
    itemIds = itemIds.toString()
    const items = []

    for (let id = 0; id <= itemIds; id++) {
      if (id) {        
        let item = await market.idToMarketItem(id);        
        const tokenUri = await nft.tokenURI(item.tokenId);
        const newItem = {
          price: item.price.toString(),
          tokenId: item.tokenId.toString(),
          owner: item.owner,
          seller: item.seller,
          tokenUri,
        };
        items.push(newItem);
      }
    }
    console.log(items)
  });
});
