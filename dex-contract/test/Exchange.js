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

    await usdtToken.connect(deployer).transfer(account_1.address, ethers.utils.parseUnits("10", 18));
    await usdtToken.connect(deployer).transfer(account_2.address, ethers.utils.parseUnits("10", 18));
    await inrToken.connect(deployer).transfer(account_1.address, ethers.utils.parseUnits("10", 18));
    await inrToken.connect(deployer).transfer(account_2.address, ethers.utils.parseUnits("10", 18));


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

  describe("Deposit & Withdraw", function () {
    let exchange, deployer, feeAccount, account_1, account_2, usdtToken, inrToken, txn;
    let depositTxn, withdrawTxn;

    it("allowance balance", async () => {
      [exchange, deployer, feeAccount, account_1, account_2, usdtToken, inrToken] = await deployExchangeFixture()

      txn = await usdtToken.connect(account_1).approve(exchange.address, ethers.utils.parseUnits("5", 18));
      await txn.wait();
      let balance = await usdtToken.allowance(account_1.address, exchange.address);
      balance = ethers.utils.formatUnits(balance.toString(), "ether");
      expect(balance).to.equal("5.0");
      balance = await inrToken.allowance(account_1.address, exchange.address);
      balance = ethers.utils.formatEther(balance);
      expect(balance).to.equal("0.0");
    })

    it("deposit", async function () {

      depositTxn = await exchange.connect(account_1).depositToken(usdtToken.address, ethers.utils.parseEther("5"));
      depositTxn = await depositTxn.wait();
      let balance = await exchange.getBalanceOf(usdtToken.address, account_1.address);
      balance = ethers.utils.formatUnits(balance.toString(), "ether");
      expect(balance).to.equal("5.0")
    })

    it("deposit Events", async function () {
      const events = depositTxn.events;
      const index = events.length - 1;
      const args = events[index].args
      expect(args.token).to.equal(usdtToken.address);
      expect(args.user).to.equal(account_1.address);
      expect(ethers.utils.formatUnits(args.amount, "ether")).to.equal("5.0");
      expect(ethers.utils.formatUnits(args.balance, "ether")).to.equal("5.0");
    })

    it("Withdraw", async function () {

      withdrawTxn = await exchange.connect(account_1).withdrawToken(usdtToken.address, ethers.utils.parseEther("5"));
      withdrawTxn = await withdrawTxn.wait();
      let balance = await usdtToken.balanceOf(account_1.address);
      balance = ethers.utils.formatEther(balance);
      expect(balance).to.equal("10.0")
    })

    it("Withdraw Events", async function () {
      const events = withdrawTxn.events;
      const index = events.length - 1;
      const args = events[index].args
      expect(args.token).to.equal(usdtToken.address);
      expect(args.user).to.equal(account_1.address);
      expect(ethers.utils.formatUnits(args.amount, "ether")).to.equal("5.0");
      expect(ethers.utils.formatUnits(args.balance, "ether")).to.equal("0.0");
    })

  })

  describe("Making Orders", function () {
    let exchange, deployer, feeAccount, account_1, account_2, usdtToken, inrToken, txn;

    before(async function () {
      [exchange, deployer, feeAccount, account_1, account_2, usdtToken, inrToken] = await deployExchangeFixture()
      txn = await usdtToken.connect(account_1).approve(exchange.address, ethers.utils.parseUnits("5", 18));
      await txn.wait();
      txn = await exchange.connect(account_1).depositToken(usdtToken.address, ethers.utils.parseEther("5"));
      txn = await txn.wait();
    })

    it("newly created orders", async function () {
      txn = await exchange.connect(account_1).makeOrder(inrToken.address, ethers.utils.parseEther("1"), usdtToken.address, ethers.utils.parseEther("2"));
      txn = await txn.wait();
      expect(await exchange.ordersCount()).to.equal("1");
    })

    it("Orders Event", async function () {
      const events = txn.events;
      const index = events.length - 1;
      const args = events[index].args
      expect(args.user).to.equal(account_1.address)
      expect(args.id).to.equal(await exchange.ordersCount())
      expect(args.tokenGet).to.equal(inrToken.address)
      expect(args.amountGet).to.equal(ethers.utils.parseUnits("1", 18))
      expect(args.tokenGive).to.equal(usdtToken.address)
      expect(args.amountGive).to.equal(ethers.utils.parseUnits("2", 18))
      expect(args.timestamp).to.at.least(1)

    })

  })

});
