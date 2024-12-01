import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Ensure it's correct
const contractABI = [
  {
    "inputs": [],
    "name": "donate",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState("0");
  const [donationAmount, setDonationAmount] = useState("");

  useEffect(() => {
    if (account) {
      fetchBalance();
    }
  }, [account]);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("MetaMask is not installed!");
    }
  }

  async function fetchBalance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    try {
      const balance = await contract.getBalance();
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }

  async function donate() {
    if (window.ethereum && donationAmount) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const tx = await contract.donate({
          value: ethers.utils.parseEther(donationAmount),
        });

        console.log("Transaction sent:", tx.hash);
        await tx.wait();
        alert("Donation successful!");
        fetchBalance();
      } catch (error) {
        console.error("Donation failed:", error);
        alert(`Error: ${error.message}`);
      }
    } else {
      alert("Enter a valid donation amount or connect your wallet.");
    }
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Donation Box DApp</h1>
        <button onClick={connectWallet} style={styles.button}>
          {account ? `Connected: ${account.substring(0, 6)}...${account.substring(account.length - 4)}` : "Connect Wallet"}
        </button>
      </header>
      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.balance}>Contract Balance: {balance} ETH</h2>
          <input
            type="number"
            placeholder="Enter amount in ETH"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            style={styles.input}
          />
          <button onClick={donate} style={styles.donateButton}>
            Donate
          </button>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: { fontFamily: "Arial, sans-serif", margin: 0, padding: 0, minHeight: "100vh", backgroundColor: "#f0f2f5" },
  header: { backgroundColor: "#007bff", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff" },
  title: { margin: 0, fontSize: "2rem" },
  button: { backgroundColor: "#fff", color: "#007bff", padding: "0.8rem 1.5rem", fontSize: "1rem", borderRadius: "5px", border: "none", cursor: "pointer", fontWeight: "bold" },
  main: { display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" },
  card: { backgroundColor: "#fff", padding: "2rem 3rem", borderRadius: "15px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", textAlign: "center", maxWidth: "400px", width: "100%" },
  balance: { fontSize: "1.5rem", marginBottom: "1.5rem" },
  input: { width: "100%", padding: "1rem", marginBottom: "1rem", borderRadius: "10px", border: "1px solid #ddd", fontSize: "1rem" },
  donateButton: { padding: "1rem 2rem", backgroundColor: "#28a745", color: "#fff", fontSize: "1rem", border: "none", borderRadius: "5px", cursor: "pointer" },
};

export default App;
