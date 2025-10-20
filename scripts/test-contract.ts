import { ethers } from 'hardhat';

async function main() {
  // Connect to the deployed contract
  const contractAddress = "0xD70366289DC33F66A97819608e62DcC235a2d297";
  const contract = await ethers.getContractAt("NanoByteToken", contractAddress);

  const [owner] = await ethers.getSigners();

  console.log("=== NanoByte Token Contract Test ===\n");
  console.log(`Contract Address: ${contractAddress}`);
  console.log(`Testing with account: ${owner.address}\n`);

  // Test 1: Read basic token info
  console.log("📋 Reading Token Information...");
  const name = await contract.name();
  const symbol = await contract.symbol();
  const decimals = await contract.decimals();
  const cap = await contract.cap();
  const totalSupply = await contract.totalSupply();
  const ownerAddress = await contract.owner();

  console.log(`  Name: ${name}`);
  console.log(`  Symbol: ${symbol}`);
  console.log(`  Decimals: ${decimals}`);
  console.log(`  Cap: ${ethers.formatEther(cap)} NBT`);
  console.log(`  Total Supply: ${ethers.formatEther(totalSupply)} NBT`);
  console.log(`  Owner: ${ownerAddress}`);
  console.log(`  Owner Match: ${ownerAddress === owner.address ? '✅' : '❌'}\n`);

  // Test 2: Check initial balance
  console.log("💰 Checking Initial Balance...");
  const initialBalance = await contract.balanceOf(owner.address);
  console.log(`  Balance: ${ethers.formatEther(initialBalance)} NBT\n`);

  // Test 3: Mint tokens to owner
  console.log("🪙 Minting 1,000 NBT to owner...");
  try {
    const mintAmount = ethers.parseEther("1000");
    const tx1 = await contract.mint(mintAmount);
    console.log(`  Transaction hash: ${tx1.hash}`);
    await tx1.wait();
    console.log(`  ✅ Minted successfully!`);

    const newBalance = await contract.balanceOf(owner.address);
    console.log(`  New Balance: ${ethers.formatEther(newBalance)} NBT\n`);
  } catch (error: any) {
    console.log(`  ❌ Error: ${error.message}\n`);
  }

  // Test 4: Mint tokens to another address
  console.log("🪙 Minting 500 NBT to another address...");
  try {
    // Use ethers.getAddress() to ensure proper checksum format
    const testAddress = ethers.getAddress("0x41A232DB03cE4514bdd5Ce3412Bd7fC1eC31f8DA");
    const mintAmount = ethers.parseEther("500");
    const tx2 = await contract.mintTo(testAddress, mintAmount);
    console.log(`  Transaction hash: ${tx2.hash}`);
    await tx2.wait();
    console.log(`  ✅ Minted successfully to ${testAddress}!`);

    const recipientBalance = await contract.balanceOf(testAddress);
    console.log(`  Recipient Balance: ${ethers.formatEther(recipientBalance)} NBT\n`);
  } catch (error: any) {
    console.log(`  ❌ Error: ${error.message}\n`);
  }

  // Test 5: Transfer tokens
  console.log("💸 Transferring 100 NBT...");
  try {
    // Use ethers.getAddress() to ensure proper checksum format
    const transferAddress = ethers.getAddress("0x41A232DB03cE4514bdd5Ce3412Bd7fC1eC31f8DA");
    const transferAmount = ethers.parseEther("100");
    const tx3 = await contract.transfer(transferAddress, transferAmount);
    console.log(`  Transaction hash: ${tx3.hash}`);
    await tx3.wait();
    console.log(`  ✅ Transferred successfully!`);

    const senderBalance = await contract.balanceOf(owner.address);
    const recipientBalance = await contract.balanceOf(transferAddress);
    console.log(`  Sender Balance: ${ethers.formatEther(senderBalance)} NBT`);
    console.log(`  Recipient Balance: ${ethers.formatEther(recipientBalance)} NBT\n`);
  } catch (error: any) {
    console.log(`  ❌ Error: ${error.message}\n`);
  }

  // Test 6: Check delegation
  console.log("🗳️  Testing Governance - Delegation...");
  try {
    const currentDelegate = await contract.delegates(owner.address);
    console.log(`  Current Delegate: ${currentDelegate}`);

    const votes = await contract.getCurrentVotes(owner.address);
    console.log(`  Current Votes: ${ethers.formatEther(votes)} NBT\n`);
  } catch (error: any) {
    console.log(`  ❌ Error: ${error.message}\n`);
  }

  // Test 7: Delegate to self
  console.log("🗳️  Delegating to self...");
  try {
    const tx4 = await contract.delegate(owner.address);
    console.log(`  Transaction hash: ${tx4.hash}`);
    await tx4.wait();
    console.log(`  ✅ Delegated successfully!`);

    const votes = await contract.getCurrentVotes(owner.address);
    console.log(`  Voting Power: ${ethers.formatEther(votes)} NBT\n`);
  } catch (error: any) {
    console.log(`  ❌ Error: ${error.message}\n`);
  }

  // Test 8: Burn some tokens
  console.log("🔥 Burning 50 NBT...");
  try {
    const burnAmount = ethers.parseEther("50");
    const tx5 = await contract.burn(burnAmount);
    console.log(`  Transaction hash: ${tx5.hash}`);
    await tx5.wait();
    console.log(`  ✅ Burned successfully!`);

    const newBalance = await contract.balanceOf(owner.address);
    const newTotalSupply = await contract.totalSupply();
    console.log(`  New Balance: ${ethers.formatEther(newBalance)} NBT`);
    console.log(`  New Total Supply: ${ethers.formatEther(newTotalSupply)} NBT\n`);
  } catch (error: any) {
    console.log(`  ❌ Error: ${error.message}\n`);
  }

  // Final Summary
  console.log("=== Test Summary ===");
  const finalTotalSupply = await contract.totalSupply();
  const finalBalance = await contract.balanceOf(owner.address);
  const finalVotes = await contract.getCurrentVotes(owner.address);

  console.log(`  Total Supply: ${ethers.formatEther(finalTotalSupply)} NBT`);
  console.log(`  Your Balance: ${ethers.formatEther(finalBalance)} NBT`);
  console.log(`  Your Voting Power: ${ethers.formatEther(finalVotes)} NBT`);
  console.log(`\n✅ All tests completed!`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
