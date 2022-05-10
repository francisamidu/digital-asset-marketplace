// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage  {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;

    constructor(address marketplaceAddress) ERC721("Digital Token", "DIGIT"){
        contractAddress = marketplaceAddress;
    }

    function _baseURI() internal pure override returns (string memory baseURI) {
        return "http://localhost:8080/ipfs/";
    }   

    function createToken(string memory _tokenURI) public returns (uint tokenId) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        setApprovalForAll(contractAddress, true);
        return newTokenId;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return super.tokenURI(tokenId);
    }

}
