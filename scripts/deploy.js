const { ethers } = require("hardhat");

async function main() {
  // Deploy the contract with an initial balance of 1 ETH (converted to wei)
  const initBalance = ethers.utils.parseEther("1"); // 1 ETH in wei

  // Get the contract factory for Assessment
  const Assessment = await ethers.getContractFactory("Assessment");
  
  // Deploy the contract with the initial balance
  const assessment = await Assessment.deploy(initBalance);
  await assessment.deployed();

  console.log(`Contract deployed at address: ${assessment.address}`);
  console.log(`Initial balance of the contract: 1 ETH`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
