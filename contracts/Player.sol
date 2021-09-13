//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

contract Player is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address marketPlaceAddress;

    constructor(address _marketPlaceAddress) ERC721("CrptoGol", "FUT") {
        marketPlaceAddress = _marketPlaceAddress;
    }

    function createToken(string memory _uri) public returns (uint256) {
        _tokenIds.increment();
        uint256 newPlayerId = _tokenIds.current();
        _mint(msg.sender, newPlayerId);
        setApprovalForAll(marketPlaceAddress, true);
        _setTokenURI(newPlayerId, _uri);
        return newPlayerId;
    }
}
