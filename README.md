# Ethereum ATM

Ethereum ATM is a decentralized application (DApp) that allows users to deposit and withdraw Ether (ETH) from a smart contract using MetaMask. This DApp uses Solidity for the smart contract, deployed on the Ethereum blockchain, and interacts with the contract through a React-based frontend.

## Features

- **Connect to MetaMask**: Users can connect their MetaMask wallet to the DApp.
- **Deposit ETH**: Users can deposit Ether (ETH) into the contract.
- **Withdraw ETH**: Users can withdraw Ether (ETH) from the contract.
- **View Balance**: Displays the current balance of the contract in ETH.

## Prerequisites

To run this DApp locally, you need the following installed:

- **Node.js**: Make sure you have [Node.js](https://nodejs.org/) installed.
- **MetaMask**: [MetaMask](https://metamask.io/) wallet extension installed in your browser.

## Starter Next/Hardhat Project

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

![image](https://github.com/user-attachments/assets/990c05ba-4f5c-47a9-959d-a2c7629f56c7)

