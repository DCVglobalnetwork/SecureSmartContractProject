const { expect } = require('chai'); // Importing Chai assertion library

describe("Smart Contracts", function () {
    let HackedContract, SecureContract;
    let hacked, secure;
    let owner, addr1;

    beforeEach(async function () {
        // Get signers (accounts) from ethers.js
        [owner, addr1] = await ethers.getSigners();

        // Deploy HackedContract
        HackedContract = await ethers.getContractFactory("HackedContract");
        hacked = await HackedContract.deploy();
        await hacked.deployed();

        // Deploy SecureContract
        SecureContract = await ethers.getContractFactory("SecureContract");
        secure = await SecureContract.deploy();
        await secure.deployed();
    });

    // Test suite for HackedContract
    describe("HackedContract", function () {
        it("Should be vulnerable to reentrancy", async function () {
            // Deposit 1 Ether into HackedContract
            await hacked.deposit({ value: ethers.utils.parseEther("1.0") });

            // Perform a reentrant attack by calling withdraw immediately
            await hacked.withdraw(ethers.utils.parseEther("1.0"));

            // Expect the balance of the owner to be 0 after the attack
            expect(await hacked.balances(owner.address)).to.equal(0);
        });
    });

    // Test suite for SecureContract
    describe("SecureContract", function () {
        it("Should not be vulnerable to reentrancy", async function () {
            // Deposit 1 Ether into SecureContract
            await secure.deposit({ value: ethers.utils.parseEther("1.0") });

            // Withdraw 1 Ether securely
            await secure.withdraw(ethers.utils.parseEther("1.0"));

            // Expect the balance of the owner to be 0 after withdrawal
            expect(await secure.balances(owner.address)).to.equal(0);
        });
    });
});

