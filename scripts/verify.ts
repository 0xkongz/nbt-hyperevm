import hre from 'hardhat';

async function main() {
  const contractAddress = "0xE5C41069Bf201bf0D6378EC6C16b3525d649E430";

  console.log("Verifying contract at:", contractAddress);

  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: [],
    });
    console.log("Contract verified successfully!");
  } catch (error: any) {
    if (error.message.includes("Already Verified")) {
      console.log("Contract is already verified!");
    } else {
      console.error("Verification failed:", error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
