const Staking = artifacts.require("Staking");

module.exports = async function(callback) {
  let staking = await Staking.deployed();

  await staking.issueTokens();
  console.log("Tokens issued!");
  callback();
};
