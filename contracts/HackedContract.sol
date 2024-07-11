// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HackedContract {
    // Mapping to keep track of user balances
    mapping(address => uint256) public balances;

    // Function to deposit Ether into the contract
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    // Function to withdraw Ether from the contract
    function withdraw(uint256 _amount) public {
        // Ensure the sender has enough balance to withdraw
        require(balances[msg.sender] >= _amount, "Insufficient balance");

        // Send the Ether to the sender
        (bool sent, ) = msg.sender.call{value: _amount}("");
        require(sent, "Failed to send Ether");

        // Update the balance after sending Ether (vulnerable to reentrancy)
        balances[msg.sender] -= _amount;
    }
}
