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

    return [exchange, deployer, feeAccount, account_1, account_2]
  }

  describe("Deployment", function () {

    it("track the fee account", async function () {

      const [exchange, deployer, feeAccount, account_1, account_2] = await deployExchangeFixture()

      expect(await exchange.feeAccount()).to.equal(feeAccount.address)

    })

    it("fee Percent", async function () {
      const [exchange, deployer, feeAccount, account_1, account_2] = await deployExchangeFixture()
      expect(await exchange.feePercent()).to.equal(FEE_PERCENT)

    })


  })



});


