import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  networks: {
    base_sepolia: {
      url: 'https://sepolia.base.org',
      accounts: ['0x5c87bf22db17cee8acf838cf62bf8e953c01d4a36eb5b317f52c6fb08207dbd8'],
    },
  },
  solidity: {
    version: '0.8.24',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};

export default config;
