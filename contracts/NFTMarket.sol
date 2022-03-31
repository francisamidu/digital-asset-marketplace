// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTMarket is ReentrancyGuard {
    using Counters for Counters.Counter;
    uint256 public _itemIds;
    Counters.Counter private _itemsSold;

    address payable owner;
    uint256 listingPrice = 0.030 ether;
    uint256 balance = 0;

    constructor() {
        owner = payable(msg.sender);
    }

    struct MarketItem {
        uint itemId;
        address nftContractAddress;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        uint createdAt;
        bool sold;
    }

    modifier isOwner{
        require(msg.sender == owner,"Only owner can perform this action");
        _;
    }

    mapping (uint256=>MarketItem) public idToMarketItem;

    event MarketItemCreated (
        uint indexed itemId,
        address indexed nftContractAddress,
        uint256 indexed tokenId,
        address payable seller,
        address payable owner,
        uint256 price,
        uint createdAt,
        bool sold
    );

    event MarketItemSold (
        uint indexed itemId,
        uint256 indexed tokenId,
        address payable sellers
    );

    event BalanceWithdrawn(address user, uint256 _balance);

    function getListingPrice() public view returns (uint256 _listingPrice) {
        return listingPrice;
    }

    function createMarketItem(
        address nftContractAddress,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        require(price > 0, "Price must be at least 1 wei");
        require(msg.value == listingPrice, "Price must be equal to the listing price");

        _itemIds++;
        uint256 itemId = _itemIds;

        idToMarketItem[itemId] = MarketItem(
            itemId,
            nftContractAddress,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            block.timestamp,
            false
        );

        IERC721(nftContractAddress).transferFrom(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            itemId,
            nftContractAddress,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            block.timestamp,
            false
        );
    }

    function createMarketSale(
        address nftContractAddress,
        uint256 itemId
    ) public payable nonReentrant {
        uint price = idToMarketItem[itemId].price;
        uint tokenId = idToMarketItem[itemId].itemId;
        require(msg.value == price, "Submit the asking price in order to complete the purchase");
        require(idToMarketItem[itemId].owner != msg.sender,"You can't buy your own NFT");

        idToMarketItem[itemId].seller.transfer(msg.value);
        IERC721(nftContractAddress).safeTransferFrom(address(this), msg.sender, tokenId);
        idToMarketItem[itemId].owner = payable(msg.sender);
        idToMarketItem[itemId].sold = true;
        balance += msg.value;
        _itemsSold.increment();
        emit MarketItemSold(
            itemId,
            tokenId,
            payable(msg.sender)
        );
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint itemCount = _itemIds;
        uint unsoldItemCount = itemCount - _itemsSold.current();
        uint currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for(uint i = 1; i <= itemCount; i++){
            if(idToMarketItem[i + 1].owner == address(0)){
                uint currentId = idToMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentId] = currentItem;
                currentIndex+=1;
            }
        }
        return items;
    }

    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint totalItemCount = _itemIds;
        uint itemCount = 0;
        uint currentIndex = 0;

        for(uint i =1; i <= totalItemCount; i++){
            if(idToMarketItem[i+1].owner == msg.sender){
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](totalItemCount);

        for(uint i = 0; i < totalItemCount; i++){
            if(idToMarketItem[i + 1].owner == msg.sender){
                uint currentId = idToMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentId] = currentItem;
                currentIndex +=1;
            }
        }
        return items;
    }

    function fetchItemsCreated() public view returns (MarketItem[] memory) {
        uint totalItemCount = _itemIds;
        uint itemCount = 0;
        uint currentIndex = 0;

        for(uint i =1; i <= totalItemCount; i++){
            if(idToMarketItem[i+1].seller == msg.sender){
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](totalItemCount);

        for(uint i = 0; i < totalItemCount; i++){
            if(idToMarketItem[i + 1].seller == msg.sender){
                uint currentId = idToMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentId] = currentItem;
                currentIndex +=1;
            }
        }
        return items;
    }

    function withdrawBalance() external isOwner {
        require(balance > 0, "You don't have enough funds to withdraw");
        uint256 amount = balance;
        payable(msg.sender).transfer(amount);
        balance = 0;
        emit BalanceWithdrawn(msg.sender,amount);
    }

    function transferOwnership(address _newOwner) public isOwner returns(bool transferred){
      uint256 totalItemCount = _itemIds;
      owner = payable(_newOwner);
      for(uint i =0; i < totalItemCount; i++){
          if(idToMarketItem[i + 1].owner == msg.sender){
            uint currentId = idToMarketItem[i + 1].itemId;
            idToMarketItem[currentId].owner = payable(_newOwner);
          }
      }
      return true;
    }
}
