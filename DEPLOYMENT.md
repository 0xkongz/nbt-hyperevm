# NanoByte Token (NBT) - Deployment Guide

## 📋 Prerequisites

### Required Software
- Node.js v16+ (recommended v20)
- npm or yarn
- Git

### Required Information
- Private key (for testnet deployment)
- Mnemonic phrase (for mainnet deployment)
- HyperEVM testnet tokens (for gas fees)

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Secrets
Create `secrets.json` in the root directory:

```json
{
  "mnemonic": "your twelve word mnemonic phrase goes here",
  "privateKey": "0xyourprivatekeygoeshere",
  "bscscanApiKey": ""
}
```

⚠️ **IMPORTANT:** Never commit `secrets.json` to version control!

### 3. Compile Contracts
```bash
npm run compile
```

### 4. Run Tests
```bash
npm test
```

---

## 🧪 Testnet Deployment

### Step 1: Prepare Testnet Wallet
1. Ensure your wallet has HyperEVM testnet tokens
2. Add your private key to `secrets.json`

### Step 2: Deploy to Testnet
```bash
npm run deploy:testnet
```

Expected output:
```
contract deployed and mined to: 0x...
```

### Step 3: Verify Contract
```bash
npx hardhat verify --network testnet <CONTRACT_ADDRESS>
```

The contract will be verified on Sourcify automatically.

### Step 4: Test Contract Functions
```bash
npx hardhat run scripts/test-contract.ts --network testnet
```

This will test all major functions:
- Minting
- Transfers
- Burning
- Delegation/Voting

---

## 🌐 Mainnet Deployment

### Step 1: Final Checklist
- [ ] All tests passing on testnet
- [ ] Contract verified on testnet explorer
- [ ] All functions tested and working
- [ ] Ownership address confirmed
- [ ] Initial mint amount decided
- [ ] Mnemonic securely stored
- [ ] Emergency procedures documented

### Step 2: Update Secrets
Ensure `secrets.json` has your mainnet mnemonic:
```json
{
  "mnemonic": "your mainnet mnemonic here",
  "privateKey": "0x...",
  "bscscanApiKey": ""
}
```

### Step 3: Deploy to Mainnet
```bash
npm run deploy:mainnet
```

### Step 4: Verify on Mainnet
```bash
npx hardhat verify --network mainnet <CONTRACT_ADDRESS>
```

### Step 5: Save Contract Address
Document the contract address in a secure location:
- Explorer: https://purrsec.com/address/<CONTRACT_ADDRESS>
- Add to your documentation
- Update frontend configuration

---

## 🔧 Configuration

### Network Configuration
Networks are defined in `hardhat.config.ts`:

**Testnet:**
- RPC: `https://rpc.hyperliquid-testnet.xyz/evm`
- Chain ID: 998
- Explorer: https://testnet.purrsec.com

**Mainnet:**
- RPC: `https://rpc.hyperliquid.xyz/evm`
- Chain ID: 999
- Explorer: https://purrsec.com

### Contract Parameters
Defined in `contracts/NanoByteToken.sol`:
- **Name:** NanoByte Token
- **Symbol:** NBT
- **Decimals:** 18
- **Max Supply:** 10,000,000,000 NBT (capped)
- **Initial Supply:** 0 (minted by owner)

---

## 📝 Post-Deployment Tasks

### 1. Initial Token Distribution
```javascript
// Mint to owner
await contract.mint(ethers.parseEther("1000000"));

// Mint to specific address
await contract.mintTo(recipientAddress, ethers.parseEther("500000"));
```

### 2. Setup Governance
```javascript
// Delegate voting power to self
await contract.delegate(ownerAddress);

// Check voting power
const votes = await contract.getCurrentVotes(ownerAddress);
```

### 3. Transfer Ownership (if needed)
```javascript
await contract.transferOwnership(newOwnerAddress);
```

### 4. Document Deployment
Create a record with:
- Contract address
- Deployment transaction hash
- Deployer address
- Timestamp
- Initial mint transactions

---

## 🧪 Testing Functions

### Using Hardhat Console
```bash
npx hardhat console --network testnet
```

```javascript
const contract = await ethers.getContractAt("NanoByteToken", "0x...");

// Check balance
const balance = await contract.balanceOf(address);
console.log(ethers.formatEther(balance));

// Mint tokens
await contract.mint(ethers.parseEther("1000"));

// Transfer
await contract.transfer(recipientAddress, ethers.parseEther("100"));
```

### Using Test Script
```bash
npx hardhat run scripts/test-contract.ts --network testnet
```

---

## 🔍 Verification

### Sourcify Verification
Automatic during deployment via:
```bash
npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS>
```

### Manual Verification
If automatic verification fails:
1. Visit https://sourcify.dev
2. Upload contract source + metadata
3. Verify on HyperEVM

### Verify Deployment Success
Check these items:
- [ ] Contract address accessible on explorer
- [ ] Source code visible and verified
- [ ] Owner address is correct
- [ ] Token name, symbol, decimals are correct
- [ ] Max supply cap is 10B NBT
- [ ] Initial supply is 0 (or as expected)

---

## 🚨 Troubleshooting

### Common Issues

#### "Exceeds block gas limit"
- **Cause:** Network congestion or gas limit too low
- **Solution:** Wait and retry, or increase gas limit in hardhat config

#### "Invalid nonce"
- **Cause:** Transaction already processed or network desync
- **Solution:** Reset account nonce or wait for network sync

#### "Insufficient funds"
- **Cause:** Not enough gas tokens in deployer wallet
- **Solution:** Add more HyperEVM tokens to your wallet

#### "Address checksum error"
- **Cause:** Ethers v6 requires proper checksummed addresses
- **Solution:** Use `ethers.getAddress(address)` to checksum addresses

#### "Contract verification failed"
- **Cause:** Sourcify server issue or mismatched compiler version
- **Solution:** Retry or verify manually on Sourcify website

---

## 📊 Gas Estimates

Approximate gas costs (estimates):

| Operation | Gas Cost |
|-----------|----------|
| Deployment | ~2,500,000 |
| Mint | ~50,000 |
| Transfer | ~35,000 |
| Burn | ~40,000 |
| Delegate | ~55,000 |
| Approve | ~45,000 |

*Actual costs may vary based on network conditions*

---

## 🔐 Security Best Practices

### Before Deployment
1. ✅ Run all tests
2. ✅ Review contract code
3. ✅ Verify compiler version (0.8.4)
4. ✅ Check for known vulnerabilities
5. ✅ Test on testnet first

### During Deployment
1. ✅ Use hardware wallet for mainnet (if possible)
2. ✅ Double-check network (testnet vs mainnet)
3. ✅ Verify transaction before signing
4. ✅ Save transaction hash

### After Deployment
1. ✅ Verify contract immediately
2. ✅ Document contract address securely
3. ✅ Test basic functions (mint, transfer)
4. ✅ Setup monitoring/alerts
5. ✅ Consider timelock for critical operations

### Secrets Management
- ❌ Never commit secrets.json
- ❌ Never share private keys
- ✅ Use environment variables in production
- ✅ Use hardware wallets for large amounts
- ✅ Keep backup of mnemonic in secure location

---

## 📞 Support & Resources

### Documentation
- HyperEVM Docs: https://docs.hyperliquid.xyz
- Hardhat Docs: https://hardhat.org
- Ethers.js v6: https://docs.ethers.org/v6/
- OpenZeppelin: https://docs.openzeppelin.com/contracts/4.x/

### Explorers
- Testnet: https://testnet.purrsec.com
- Mainnet: https://purrsec.com

### Contract Files
- Source: `contracts/NanoByteToken.sol`
- Tests: `test/nbt.test.ts`
- Deployment: `scripts/deploy.ts`
- Changelog: `CHANGELOG.md`

---

## 📝 Deployment Log Template

Keep a record of all deployments:

```
Date: YYYY-MM-DD
Network: [Testnet/Mainnet]
Contract Address: 0x...
Deployer Address: 0x...
Transaction Hash: 0x...
Block Number: ...
Gas Used: ...
Verification: [Success/Failed]
Notes: ...
```

---

**Last Updated:** October 20, 2025
**Version:** 1.0.0
