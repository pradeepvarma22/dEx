const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");


const FEE_PERCENT = 10;

describe("Exchange", function () {

  async function deployExchangeFixture() {
    const [deployer, feeAccount, account_1, account_2] = await ethers.getSigners()
    const Exchange = await ethers.getContractFactory("Exchange")
    const exchange = await Exchange.deploy(feeAccount.address, FEE_PERCENT)
    await exchange.deployed()

    const USDTToken = await ethers.getContractFactory("Token");
    const usdtToken = await USDTToken.deploy("Tether Token", "USDT");
    await usdtToken.deployed();

    const INRToken = await ethers.getContractFactory("Token");
    const inrToken = await INRToken.deploy("INR Token", "INR");
    await inrToken.deployed();

    await usdtToken.connect(deployer).transfer(account_1.address, 10);
    await usdtToken.connect(deployer).transfer(account_2.address, 10);
    await inrToken.connect(deployer).transfer(account_1.address, 10);
    await inrToken.connect(deployer).transfer(account_2.address, 10);


    return [exchange, deployer, feeAccount, account_1, account_2, usdtToken, inrToken]
  }

  describe("Deployment", function () {

    it("track the fee account", async function () {

      const [exchange, deployer, feeAccount, account_1, account_2, usdtToken, inrToken] = await deployExchangeFixture()

      expect(await exchange.feeAccount()).to.equal(feeAccount.address)

    })

    it("fee Percent", async function () {
      const [exchange, deployer, feeAccount, account_1, account_2, usdtToken, inrToken] = await deployExchangeFixture()
      expect(await exchange.feePercent()).to.equal(FEE_PERCENT)

    })
  })

  describe("Deposit", function () {

    let exchange, deployer, feeAccount, account_1, account_2;

    it("allowance balance", async () => {
      [exchange, deployer, feeAccount, account_1, account_2, usdtToken, inrToken] = await deployExchangeFixture()

      const txn = await usdtToken.connect(account_1).approve(exchange.address, ethers.utils.parseUnits("5",18));
      await txn.wait();
      let balance = await usdtToken.allowance(account_1.address,exchange.address );
      balance = ethers.utils.formatEther(balance);
      expect(balance).to.equal("5.0");

      balance = await inrToken.allowance(account_1.address, exchange.address);
      balance = ethers.utils.formatEther(balance);
      expect(balance).to.equal("0.0");

    })




})



});


