const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Deploy Gas Challenge Contract", () => {
  let gas_contract;

  beforeEach(async () => {
    const gas_challenge_contract = await ethers.getContractFactory(
      "gasChallenge"
    );
    gas_contract = await gas_challenge_contract.deploy();
  });

  describe("Compute Gas", () => {
    it("Should return lower gas", async () => {
      await gas_contract.notOptimizedFunction();
      await gas_contract.optimizedFunction();
    });
  });

  describe("Check Sum Of Array", () => {
    it("Should return 0", async () => {
      // call optimizedFunction to set each array element to zero
      await gas_contract.optimizedFunction();
      // call getSumOfArray function and its value pass to sum variable
      const sumOfArray = await gas_contract.getSumOfArray()
      // compare sum variable with expected result of zero
      expect(sumOfArray).to.equal(0);
    });
  });
});
