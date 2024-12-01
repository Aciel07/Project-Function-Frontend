// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DonationBox {
    address public owner;

    event DonationReceived(address indexed donor, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function donate() public payable {
        require(msg.value > 0, "Donation must be greater than 0");
        emit DonationReceived(msg.sender, msg.value);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withdraw() public {
        require(msg.sender == owner, "Only the owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}
