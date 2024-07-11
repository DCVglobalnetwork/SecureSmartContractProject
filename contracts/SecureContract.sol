// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SecureContract {
    // Mapping to keep track of user balances
    mapping(address => uint256) public balances;

    // Function to deposit Ether into the contract
    function deposit() public payable {
        // Increase the sender's balance by the amount of Ether sent
        balances[msg.sender] += msg.value;
    }

    // Function to withdraw Ether from the contract
    function withdraw(uint256 _amount) public {
        // Ensure the sender has enough balance to withdraw
        require(balances[msg.sender] >= _amount, "Insufficient balance");

        // Update the balance before sending Ether to prevent reentrancy attacks
        balances[msg.sender] -= _amount;

        // Send the Ether to the sender
        (bool sent, ) = msg.sender.call{value: _amount}("");
        // Ensure the send operation was successful
        require(sent, "Failed to send Ether");
    }
}
