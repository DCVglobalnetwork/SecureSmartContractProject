# Secure Smart Contract Project

## Overview

This project demonstrates a smart contract that is secure against reentrancy attacks. The goal is to educate developers on identifying and mitigating common security vulnerabilities in smart contracts.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
  - [Deploy Contracts](#deploy-contracts)
  - [Run Tests](#run-tests)
- [Details of Security](#details-of-security)
  - [Reentrancy Attack Prevention](#reentrancy-attack-prevention)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Hardhat](https://hardhat.org/)

### Steps

1. Clone the repository:
    ```sh
    git clone https://github.com/DCVglobalnetwork/SecureSmartContractProject.git
    cd SecureSmartContractProject
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Compile the contracts:
    ```sh
    npx hardhat compile
    ```

## Usage

### Deploy Contracts

To deploy the contracts to a local Ethereum network, run:
```sh
npx hardhat run scripts/deploy.js
```
![image](https://github.com/DCVglobalnetwork/SecureSmartContractProject/assets/105791829/53cbe19d-5e7c-4ca2-8797-64c43b39ffd0)


## Test 
Run Tests
To run the unit tests and verify the functionality and security of the contracts, use:
```shell
npx hardhat test
```

## Details of Security
Reentrancy Attack Prevention
The SecureContract prevents reentrancy attacks by updating the user's balance before sending Ether. 
This ensures that malicious actors cannot repeatedly call the withdraw function before the balance is updated.
```shell
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SecureContract {
    mapping(address => uint256) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient balance");

        balances[msg.sender] -= _amount;

        (bool sent, ) = msg.sender.call{value: _amount}("");
        require(sent, "Failed to send Ether");
    }
}
```

## Directory Structure

- `contracts/`: Contains Solidity smart contracts.
- `scripts/`: Includes deployment scripts for deploying contracts.
- `test/`: Houses test scripts for testing smart contracts.
- `hardhat.config.js`: Configuration file for Hardhat setup.
- `package.json`: npm package configuration file.
- `.gitignore`: Specifies files and directories to be ignored by Git.


## Contributing
Contributions are welcome! Please follow these steps:

* Fork the repository.

* Create a new branch (git checkout -b feature/your-feature).
  
* Make your changes.
  
* Commit your changes (git commit -m 'Add some feature').
  
* Push to the branch (git push origin feature/your-feature).
  
* Open a pull request.
  
## License
This project is licensed under the MIT License - see the LICENSE file for details.

