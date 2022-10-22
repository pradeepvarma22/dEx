const hre = require("hardhat");

const FEE_PERCENT = 10;

const tokens = (value) => {
  return hre.ethers.utils.parseUnits(value.toString(), 'ether');
}

const wait = (seconds) => {
  const milliseconds = seconds * 1000
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function main() {
  const accounts = await hre.ethers.getSigners();
  console.log('Preparing.........\n');
  const Varma = await hre.ethers.getContractFactory("Token");
  const varma = await Varma.connect(accounts[0]).deploy("Varma Token", "VARMA");
  await varma.deployed();
  console.log(`Varma Token Address: ${varma.address}`);

  const USDTToken = await ethers.getContractFactory("Token");
  const usdtToken = await USDTToken.connect(accounts[0]).deploy("Tether Token", "USDT");
  await usdtToken.deployed();
  console.log(`Tether Token Address: ${usdtToken.address}`);

  const INRToken = await hre.ethers.getContractFactory("Token");
  const inrToken = await INRToken.connect(accounts[0]).deploy("INR Token", "INRT");
  await inrToken.deployed();
  console.log(`INR Token Address: ${inrToken.address}`);

  const Exchange = await hre.ethers.getContractFactory("Exchange");
  const exchange = await Exchange.connect(accounts[0]).deploy(accounts[0].address, FEE_PERCENT);
  await exchange.deployed();
  console.log(`Exchange  Address: ${exchange.address}`);

  const sender = accounts[0]
  const receiver = accounts[1]
  let amount = tokens(10000)

  let transaction, result
  transaction = await usdtToken.connect(sender).transfer(receiver.address, amount)
  console.log(`Transferred ${amount} tokens from ${sender.address} to ${receiver.address}\n`)

  // Set up exchange users
  const user1 = accounts[0]
  const user2 = accounts[1]
  amount = tokens(10000)

  // user1 approves 10,000 varma...
  transaction = await varma.connect(user1).approve(exchange.address, amount)
  await transaction.wait()
  console.log(`Approved ${amount} tokens from ${user1.address}`)

  // user1 deposits 10,000 varma...
  transaction = await exchange.connect(user1).depositToken(varma.address, amount)
  await transaction.wait()
  console.log(`Deposited ${amount} Ether from ${user1.address}\n`)

  // User 2 Approves usdtToken
  transaction = await usdtToken.connect(user2).approve(exchange.address, amount)
  await transaction.wait()
  console.log(`Approved ${amount} tokens from ${user2.address}`)

  // User 2 Deposits usdtToken
  transaction = await exchange.connect(user2).depositToken(usdtToken.address, amount)
  await transaction.wait()
  console.log(`Deposited ${amount} tokens from ${user2.address}\n`)

  // User 1 makes order to get tokens
  let orderId
  transaction = await exchange.connect(user1).makeOrder(usdtToken.address, tokens(100), varma.address, tokens(5))
  result = await transaction.wait()
  console.log(`Made order from ${user1.address}`)

  // User 1 cancels order
/*  orderId = result.events[0].args.id
  transaction = await exchange.connect(user1).cancelOrder(orderId)
  result = await transaction.wait()
  console.log(`Cancelled order from ${user1.address}\n`)
*/
  // Wait 1 second
  await wait(1)

  // User 1 makes order
  transaction = await exchange.connect(user1).makeOrder(usdtToken.address, tokens(100), varma.address, tokens(10))
  result = await transaction.wait()
  console.log(`Made order from ${user1.address}`)

  // User 2 fills order
  orderId = result.events[0].args.id
  transaction = await exchange.connect(user2).fillOrder(orderId)
  result = await transaction.wait()
  console.log(`Filled order from ${user1.address}\n`)

  // Wait 1 second
  await wait(1)

  // User 1 makes another order
  transaction = await exchange.makeOrder(usdtToken.address, tokens(50), varma.address, tokens(15))
  result = await transaction.wait()
  console.log(`Made order from ${user1.address}`)

  // User 2 fills another order
  orderId = result.events[0].args.id
  transaction = await exchange.connect(user2).fillOrder(orderId)
  result = await transaction.wait()
  console.log(`Filled order from ${user1.address}\n`)

  await wait(1)

  // User 1 makes final order
  transaction = await exchange.connect(user1).makeOrder(usdtToken.address, tokens(200), varma.address, tokens(20))
  result = await transaction.wait()
  console.log(`Made order from ${user1.address}`)

  // User 2 fills final order
  orderId = result.events[0].args.id
  transaction = await exchange.connect(user2).fillOrder(orderId)
  result = await transaction.wait()
  console.log(`Filled order from ${user1.address}\n`)

  await wait(1)

  // User 1 makes 10 orders
  for (let i = 1; i <= 8; i++) {
    transaction = await exchange.connect(user1).makeOrder(usdtToken.address, tokens(10 * i), varma.address, tokens(10))
    result = await transaction.wait()

    console.log(`Made order from ${user1.address}`)
    await wait(1)
  }

  // User 2 makes 10 orders
  for (let i = 1; i <= 8; i++) {
    transaction = await exchange.connect(user2).makeOrder(varma.address, tokens(10), usdtToken.address, tokens(10 * i))
    result = await transaction.wait()

    console.log(`Made order from ${user2.address}`)
    await wait(1)
  }

}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});