# Donation Box
The DonationBox contract is a simple decentralized application (DApp) that allows users to donate Ether to the contract. The contract owner can withdraw the donated funds. It includes a donation function to accept Ether, a function to check the contract's balance, and a withdrawal function that only the owner can use to transfer the funds to their address.

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

![image](https://github.com/user-attachments/assets/f49fbb6e-9047-4e92-8af7-658dcd2b1517)
