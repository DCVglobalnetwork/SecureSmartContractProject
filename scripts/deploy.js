async function main() {
    // Deploying HackedContract
    const HackedContract = await ethers.getContractFactory("HackedContract");
    const hacked = await HackedContract.deploy();
    await hacked.deployed();
    console.log("HackedContract deployed to:", hacked.address);

    // Deploying SecureContract
    const SecureContract = await ethers.getContractFactory("SecureContract");
    const secure = await SecureContract.deploy();
    await secure.deployed();
    console.log("SecureContract deployed to:", secure.address);
}

// Execute main function and handle errors
main().catch((error) => {
    console.error(error);
    process.exitCode = 1; // Set exit code to indicate error
});
