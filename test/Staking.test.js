const { assert } = require("chai");

const DappToken = artifacts.require("DappToken");
const DaiToken = artifacts.require("DaiToken");
const Staking = artifacts.require("Staking");

require("chai")
  .use(require("chai-as-promised"))
  .should();

function tokens(n) {
  return web3.utils.toWei(n, "ether");
}

contract("Staking", ([owner, investor]) => {
  let daiToken, dappToken, staking;
  before(async () => {
    daiToken = await DaiToken.new();
    dappToken = await DappToken.new();
    staking = await Staking.new(dappToken.address, daiToken.address);

    await dappToken.transfer(staking.address, tokens("1000000"));

    await daiToken.transfer(investor, tokens("100"), { from: owner });
  });
  describe("Mock DAI deployment", async () => {
    it("has a name", async () => {
      const name = await daiToken.name();
      assert.equal(name, "Mock DAI Token");
    });
  });

  describe("Dapp Token deployment", async () => {
    it("has a name", async () => {
      const name = await dappToken.name();
      assert.equal(name, "DApp Token");
    });
  });

  describe("Staking deployment", async () => {
    it("has a name", async () => {
      const name = await staking.name();
      assert.equal(name, "Ya Bank");
    });

    it("contract has tokens", async () => {
      let balance = await dappToken.balanceOf(staking.address);
      assert.equal(balance.toString(), tokens("1000000"));
    });
  });

  describe("Staking Tokens", async () => {
    it("rewards investors for staking mDai tokens", async () => {
      let result;
      result = await daiToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("100"),
        "investor Mock DAI wallet balance correct before staking"
      );

      await daiToken.approve(staking.address, tokens("100"), {
        from: investor,
      });
      await staking.stakeTokens(tokens("100"), { from: investor });

      result = await daiToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("0"),
        "investor Mock DAI wallet balance correct after staking"
      );

      result = await daiToken.balanceOf(staking.address);
      assert.equal(
        result.toString(),
        tokens("100"),
        "Staking Mock DAI balance correct after staking"
      );

      result = await staking.stakingBalance(investor);
      assert.equal(
        result.toString(),
        tokens("100"),
        "investor staking balance correct after staking"
      );

      result = await staking.isStaking(investor);
      assert.equal(
        result.toString(),
        "true",
        "investor staking status correct after staking"
      );

      await staking.issueTokens({ from: owner });

      result = await dappToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("100"),
        "investor DApp Token wallet correct after staking"
      );

      await staking.issueTokens({ from: investor }).should.be.rejected;

      await staking.unstakeTokens({ from: investor });

      result = await daiToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("100"),
        "investor Mock DAI wallet balance correct after unstaking"
      );

      result = await daiToken.balanceOf(staking.address);
      assert.equal(
        result.toString(),
        tokens("0"),
        "Staking Mock DAI balance correct after unstaking"
      );

      result = await staking.stakingBalance(investor);
      assert.equal(
        result.toString(),
        tokens("0"),
        "investor staking balance correct after unstaking"
      );

      result = await staking.isStaking(investor);
      assert.equal(
        result.toString(),
        "false",
        "investor staking status correct after unstaking"
      );
    });
  });
});
