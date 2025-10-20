import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";

const {
  mnemonic,
  bscscanApiKey,
  privateKey
} = require("./secrets.json");


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    testnet: {
      url: `https://rpc.hyperliquid-testnet.xyz/evm`,
      accounts: [privateKey],
      chainId: 998
    },
    mainnet: {
      url: `https://rpc.hyperliquid.xyz/evm`,
      accounts: [privateKey],
      chainId: 999
    }
  },
  sourcify: {
    enabled: true,
    apiUrl: "https://sourcify.parsec.finance",
    browserUrl: "https://testnet.purrsec.com"
  },
  etherscan: {
    apiKey: {
      testnet: bscscanApiKey || "dummy",
      mainnet: bscscanApiKey || "dummy"
    },
    customChains: [
      {
        network: "testnet",
        chainId: 998,
        urls: {
          apiURL: "https://sourcify.parsec.finance",
          browserURL: "https://testnet.purrsec.com"
        }
      },
      {
        network: "mainnet",
        chainId: 999,
        urls: {
          apiURL: "https://explorer.hyperliquid.xyz/api",
          browserURL: "https://explorer.hyperliquid.xyz"
        }
      }
    ]
  }
};

export default config;