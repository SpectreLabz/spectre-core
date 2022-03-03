const deployerAddress = '0xBaEb23681d857A13F3Df58B5A1fBE1ED28634bCD'
const deploySalt = '0x0000000000000000000000000000000000000000000000000000000047941987'
const rpcUrl = 'https://data-seed-prebsc-1-s1.binance.org:8545'

const Web3 = require('web3')
const web3 = new Web3(rpcUrl)

const contractData = require('./build/Hasher.json')
const contract = new web3.eth.Contract(contractData.abi)
const bytes = contract
  .deploy({
    data: contractData.bytecode,
    arguments: [],
  })
  .encodeABI()

console.log('Deploy bytecode', bytes)

const deployer = new web3.eth.Contract(require('./build/contracts/IDeployer.json').abi, deployerAddress);

const receipt = deployer.methods.deploy(bytes, deploySalt)
receipt.then(console.log).catch(console.log)
