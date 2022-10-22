require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config({});

// /** @type import('hardhat/config').HardhatUserConfig */
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });


const MUMBAI_ALCHEMY_API_KEY_URL = process.env.MUMBAI_ALCHEMY_API_KEY_URL
const METAMASK_PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY


module.exports = {
  solidity: "0.8.17",
  networks: {
    localhost: {},
    /*mumbai: {
      url: `${MUMBAI_ALCHEMY_API_KEY_URL}`,
      accounts: [METAMASK_PRIVATE_KEY]
    }*/
  },
  etherscan: {
    apiKey: process.env.ETHER_SCAN_API_KEY
  }

};
