const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigner();
    console.log("Deployer", deployer);

    const Counter = await ethers.getContractFactory('Counter');
    const counter = await Counter.deploy(0);

    console.log("Counter Contract Addres", counter.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error); process.exit(1);
    }); 