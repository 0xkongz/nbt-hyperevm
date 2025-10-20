import hre, {ethers} from 'hardhat';


async function main() {
  const factory = await ethers.getContractFactory("NanoByteToken");
  const contract = await factory.deploy();

  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log(`contract deployed and mined to: ${address}`);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });