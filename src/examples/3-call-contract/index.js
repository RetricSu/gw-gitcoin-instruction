const Web3 = require('web3');
const web3_rpc_url = "http://godwoken-testnet-web3-rpc.ckbapp.dev"; 

const web3 = new Web3(new Web3.providers.HttpProvider(web3_rpc_url));

const abi = '<your contract abi>';
const address = "<your contract address>";

const myContract = new web3.eth.Contract(abi, address);
myContract.methods.FUNCTION_NAME().call().then(console.log);