const DappToken = artifacts.require("DappToken");
const DaiToken = artifacts.require("DaiToken");
const Staking = artifacts.require("Staking");

module.exports = async function(deployer, network, accounts) {
  // Deploy Mock DAI Token
  await deployer.deploy(DaiToken);
  const daiToken = await DaiToken.deployed();

  // Deploy Dapp Token
  await deployer.deploy(DappToken);
  const dappToken = await DappToken.deployed();

  // Deploy TokenFarm
  await deployer.deploy(Staking, dappToken.address, daiToken.address);
  const staking = await Staking.deployed();

  // Transfer all tokens to TokenFarm (1 million)
  await dappToken.transfer(staking.address, "1000000000000000000000000");

  // Transfer 100 Mock DAI tokens to investor
  await daiToken.transfer(accounts[1], "100000000000000000000");
};
