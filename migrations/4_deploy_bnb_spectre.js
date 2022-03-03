/* global artifacts */
require('dotenv').config({ path: '../.env' })
const BNBSpectre = artifacts.require('BNBSpectre')
const Verifier = artifacts.require('Verifier')
const Hasher = artifacts.require('Hasher')

module.exports = function (deployer) {
  return deployer.then(async () => {
    const { MERKLE_TREE_HEIGHT, BNB_AMOUNT } = process.env
    const verifier = await Verifier.deployed()
    const hasher = await Hasher.deployed()
    const Spectre = await deployer.deploy(
      BNBSpectre,
      verifier.address,
      hasher.address,
      BNB_AMOUNT,
      MERKLE_TREE_HEIGHT,
    )
    console.log('Spectre address', Spectre.address);
    console.log('Verifier address', Verifier.address);
    console.log('Hasher address', Hasher.address);
  })
}
