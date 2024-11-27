// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner; 
    uint256 public balance;

    event Deposit(address indexed from, uint256 amount);
    event Withdraw(address indexed from, uint256 amount);

    // Constructor to set the initial balance and owner of the contract
    constructor(uint256 initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance; 
    }

    // Function to get the current balance of the contract
    function getBalance() public view returns (uint256) {
        return balance; // Returns the contract's current balance
    }

    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        balance += msg.value; // Increase the contract balance by the deposited amount
        emit Deposit(msg.sender, msg.value);
    }

    // Custom error for handling insufficient balance during withdrawal
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        // Check if the contract has enough balance to allow the withdrawal
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance, 
                withdrawAmount: _withdrawAmount
            }); // Revert the transaction if the contract's balance is too low
        }

        balance -= _withdrawAmount; // Decrease the contract's balance by the withdrawal amount
        payable(msg.sender).transfer(_withdrawAmount); // Transfer the requested amount to the sender
        emit Withdraw(msg.sender, _withdrawAmount); 
    }

    // Fallback function to accept any incoming ETH payments
    receive() external payable {
        balance += msg.value; // Increase the contract balance by the amount sent to the contract
    }
}
