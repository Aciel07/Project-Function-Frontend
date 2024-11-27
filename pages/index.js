import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  // State variables to hold data and track UI states
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined); 
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined); 
  const [isLoading, setIsLoading] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");

  // The Ethereum contract address and ABI
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  // useEffect hook to initialize MetaMask wallet and get account information on page load
  useEffect(() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum); // Set the Ethereum wallet (MetaMask) if it exists
      getWallet(); // Fetch the wallet and account details
    } else {
      alert("MetaMask is not installed"); // Alert if MetaMask is not installed
    }
  }, []);

  // Get wallet and account details
  const getWallet = async () => {
    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" }); // Request MetaMask accounts
      handleAccount(accounts); // Handle the fetched account
    }
  };

  // Handle the fetched account
  const handleAccount = (account) => {
    if (account.length > 0) {
      console.log("Account connected: ", account[0]); // Log account address
      setAccount(account[0]); // Set the account in state
      getATMContract(); // Initialize contract after account is connected
    } else {
      console.log("No account found"); // Log if no account is found
    }
  };

  // Connect to MetaMask if not connected
  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect"); // Alert if MetaMask is missing
      return;
    }

    try {
      const accounts = await ethWallet.request({ method: "eth_requestAccounts" }); // Request MetaMask accounts
      handleAccount(accounts); // Handle the fetched account
    } catch (error) {
      console.error("Error connecting to MetaMask:", error); // Log any error
      alert("Please allow MetaMask to connect to your browser."); // Alert the user to allow connection
    }
  };

  // Initialize contract by setting up the signer and contract instance
  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet); 
    const signer = provider.getSigner(); 
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer); 
    setATM(atmContract); 
    getBalance(); 
  };

  // Get balance of the contract (ETH held in the contract)
  const getBalance = async () => {
    if (atm) {
      try {
        const balance = await atm.getBalance();
        setBalance(ethers.utils.formatEther(balance)); 
      } catch (error) {
        setErrorMessage("Error fetching balance"); // Set error message if fetching balance fails
        console.error("Error fetching balance:", error); // Log any errors
      }
    }
  };

  // Deposit funds into the contract
  const deposit = async () => {
    if (atm && depositAmount && !isLoading) {
      try {
        setIsLoading(true); 
        setErrorMessage("");
        const provider = new ethers.providers.Web3Provider(ethWallet);
        const signer = provider.getSigner();

        const tx = await atm.connect(signer).deposit({
          value: ethers.utils.parseEther(depositAmount), 
        });
        await tx.wait(); 
        await getBalance(); // Refresh balance after deposit
      } catch (error) {
        setErrorMessage("Deposit failed"); 
        console.error("Deposit failed:", error); // Log any errors
      } finally {
        setIsLoading(false); // Reset loading state after transaction completes
      }
    }
  };

  // Withdraw funds from the contract
  const withdraw = async () => {
    if (atm && withdrawAmount && !isLoading) {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const provider = new ethers.providers.Web3Provider(ethWallet); 
        const signer = provider.getSigner(); 

        const tx = await atm.connect(signer).withdraw(ethers.utils.parseEther(withdrawAmount)); 
        await tx.wait(); 
        await getBalance();
      } catch (error) {
        setErrorMessage("Withdraw failed"); // Set error message if withdraw fails
        console.error("Withdraw failed:", error); // Log any errors
      } finally {
        setIsLoading(false); // Reset loading state after transaction completes
      }
    }
  };

  return (
    <div className="container">
      <div className="content">
        <center>
          <h1>Ethereum ATM</h1>
          <p>Your Account: {account}</p>
          <p>Your Balance: {balance} ETH</p>

          {!account ? (
            <button onClick={connectAccount}>Connect Wallet</button> // Show Connect Wallet button if not connected
          ) : (
            <>
              {/* Deposit Section */}
              <div className="section">
                <h3>Deposit Funds</h3>
                <input
                  type="text"
                  placeholder="Amount (ETH)"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)} // Set deposit amount
                />
                <button onClick={deposit} disabled={isLoading}>
                  {isLoading ? "Depositing..." : "Deposit"}
                </button>
              </div>

              {/* Withdraw Section */}
              <div className="section">
                <h3>Withdraw Funds</h3>
                <input
                  type="text"
                  placeholder="Amount (ETH)"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)} // Set withdraw amount
                />
                <button onClick={withdraw} disabled={isLoading}>
                  {isLoading ? "Withdrawing..." : "Withdraw"}
                </button>
              </div>
            </>
          )}
        </center>

        {/* Display error message if any */}
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    </div>
  );
}
