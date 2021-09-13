// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const NftMarket = await hre.ethers.getContractFactory("NFTMarket");
  const nftMaket = await NftMarket.deploy();
  await nftMaket.deployed();
  console.log("Market deployed to:", nftMaket.address);
  const NFT = await hre.ethers.getContractFactory("Player");
  const nft = await NFT.deploy(nftMaket.address);
  await nft.deployed();
  console.log("nft deployed to", nft.address);
  let config = `
  export const nftmarketaddress = "${nftMaket.address}"
  export const nftaddress = "${nft.address}"
  `;
  let data = JSON.stringify(config);
  fs.writeFileSync("config.json", JSON.parse(data));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
