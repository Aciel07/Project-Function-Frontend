const hre = require("hardhat");

async function main() {
  const DonationBox = await hre.ethers.getContractFactory("DonationBox");
  const donationBox = await DonationBox.deploy();

  await donationBox.deployed();

  console.log("DonationBox deployed to:", donationBox.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
