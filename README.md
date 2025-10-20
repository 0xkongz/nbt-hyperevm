# NanoByte Token (NBT)

[![Solidity](https://img.shields.io/badge/Solidity-0.8.4-blue)](https://soliditylang.org/)
[![OpenZeppelin](https://img.shields.io/badge/OpenZeppelin-4.9.6-blue)](https://openzeppelin.com/)
[![HyperEVM](https://img.shields.io/badge/Network-HyperEVM-green)](https://hyperliquid.xyz/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A standards-compliant ERC20 token with governance features (Compound-style delegation) deployed on HyperEVM.

## 🌟 Features

- ✅ **ERC20 Standard** - Full compliance with ERC20 token standard
- ✅ **Capped Supply** - Maximum supply of 10 billion NBT (10,000,000,000)
- ✅ **Governance** - Compound-style delegation and voting system
- ✅ **Burnable** - Token holders can burn their tokens
- ✅ **Ownable** - Controlled minting by contract owner
- ✅ **Audited Code** - Uses OpenZeppelin's battle-tested contracts

## 📊 Token Information

| Property | Value |
|----------|-------|
| **Name** | NanoByte Token |
| **Symbol** | NBT |
| **Decimals** | 18 |
| **Total Supply** | 0 (initially) |
| **Max Supply** | 10,000,000,000 NBT (capped) |
| **Network** | HyperEVM (Testnet & Mainnet) |

## 🚀 Deployed Contracts

### HyperEVM Testnet
- **Address:** `0xD70366289DC33F66A97819608e62DcC235a2d297`
- **Explorer:** https://testnet.purrsec.com/address/0xD70366289DC33F66A97819608e62DcC235a2d297
- **Chain ID:** 998
- **Status:** ✅ Verified

### HyperEVM Mainnet
- **Address:** TBD
- **Explorer:** TBD
- **Chain ID:** 999
- **Status:** Pending deployment

## 🛠️ Technology Stack

- **Solidity:** 0.8.4
- **Framework:** Hardhat 2.22.0
- **Testing:** Ethers.js v6 + Chai
- **Verification:** Sourcify
- **Standards:** ERC20, EIP-712 (for signatures)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/nanobytetoken/nbt-hyperevm.git
cd nbt-hyperevm

# Install dependencies
npm install

# Compile contracts
npm run compile

# Run tests
npm test
```

## 🧪 Testing

All contract functions are thoroughly tested:

```bash
# Run all tests
npm test

# Run specific test file
npx hardhat test test/nbt.test.ts

# Test on testnet
npx hardhat run scripts/test-contract.ts --network testnet
```

**Test Coverage:** 29/29 tests passing ✅

## 🚀 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

**Testnet:**
```bash
npm run deploy:testnet
npx hardhat verify --network testnet <CONTRACT_ADDRESS>
```

**Mainnet:**
```bash
npm run deploy:mainnet
npx hardhat verify --network mainnet <CONTRACT_ADDRESS>
```

## 📖 Contract Functions

### ERC20 Standard Functions
- `balanceOf(address)` - Get token balance
- `transfer(address, amount)` - Transfer tokens
- `approve(address, amount)` - Approve spending
- `transferFrom(address, address, amount)` - Transfer from approved address
- `allowance(address, address)` - Check allowance

### Minting Functions (Owner Only)
- `mint(uint256 amount)` - Mint tokens to yourself
- `mintTo(address to, uint256 amount)` - Mint tokens to any address

### Burning Functions
- `burn(uint256 amount)` - Burn your own tokens
- `burnFrom(address, uint256 amount)` - Burn tokens from approved address

### Governance Functions
- `delegate(address delegatee)` - Delegate voting power
- `delegateBySig(...)` - Delegate via signature (EIP-712)
- `getCurrentVotes(address)` - Get current voting power
- `getPriorVotes(address, uint blockNumber)` - Get historical voting power
- `delegates(address)` - Get current delegate

## 🔐 Security

- ✅ **Audited Base Code** - Uses OpenZeppelin v4.9.6 (audited)
- ✅ **No Custom Modifications** - Standard, unmodified OpenZeppelin contracts
- ✅ **Native Overflow Protection** - Solidity 0.8+ built-in checks
- ✅ **Comprehensive Tests** - 100% function coverage
- ✅ **CertiK Audit** - Previous audit available (review for changes)

### Security Considerations
- Contract uses standard OpenZeppelin implementations
- No pause mechanism (consider for production)
- Single-step ownership transfer (consider 2-step for production)
- Supply cap is immutable once deployed

## 📄 Documentation

- **[CHANGELOG.md](CHANGELOG.md)** - Complete migration history and technical changes
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Step-by-step deployment guide
- **[Contract Source](contracts/NanoByteToken.sol)** - Full contract code

## 🤝 Contributing

This is a production contract for NanoByte Token. For bug reports or security concerns, please contact the team directly.

## 📞 Links

- **Website:** https://www.nanobytetoken.io
- **Documentation:** See CHANGELOG.md and DEPLOYMENT.md
- **Explorer (Testnet):** https://testnet.purrsec.com
- **Explorer (Mainnet):** https://purrsec.com

## ⚠️ Important Notes

### Breaking Changes from BSC Version
1. **Function Rename:** `mint(address, uint256)` → `mintTo(address, uint256)`
2. **Network Change:** BSC → HyperEVM
3. **Ethers.js:** Upgraded to v6 (breaking API changes)

See [CHANGELOG.md](CHANGELOG.md) for complete migration details.

### For Developers
If you're integrating this token:
- Use `mintTo(address, amount)` for minting to other addresses
- Use `mint(amount)` for minting to yourself
- Addresses must be checksummed (use `ethers.getAddress()`)
- Contract uses Ethers.js v6 API

## 📜 License

MIT License - see LICENSE file for details

---

**Contract Version:** 1.0.0 (HyperEVM)
**Last Updated:** October 20, 2025

For technical details and complete change history, see [CHANGELOG.md](CHANGELOG.md).
