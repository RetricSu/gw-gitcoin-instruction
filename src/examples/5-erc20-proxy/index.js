const Web3 = require('web3');
const { PolyjuiceHttpProvider, PolyjuiceAccounts } = require("@polyjuice-provider/web3");

const CompiledContractArtifact = require(`./build/contracts/ERC20.json`);
const ACCOUNT_PRIVATE_KEY = '0xd9066ff9f753a1898709b568119055660a77d9aae4d7a4ad677b8fb3d2a571e5'; // <YOUR_PRIVATE_KEY>
const SUDT_ID = 142; // <YOUR_SUDT_ID>
const SUDT_NAME = 'MyToken';
const SUDT_SYMBOL = 'MTK';
const SUDT_TOTAL_SUPPLY = 9999999999;

const ETH_TO_POLYJUICE_CONTRACT_ABI = [{     "inputs": [],     "name": "getSender",     "outputs": [       {         "internalType": "address",         "name": "",         "type": "address"       }     ],     "stateMutability": "view",     "type": "function"   }];
const ETH_TO_POLYJIUICE_CONTRACT_ADDRESS = '0x9d9a06020144626F436727C3704Ad94529FDd553';
const SUDT_PROXY_CONTRACT_ABI = [{         "constant": true,         "inputs": [             {                 "name": "_owner",                 "type": "address"             }         ],         "name": "balanceOf",         "outputs": [             {                 "name": "balance",                 "type": "uint256"             }         ],         "payable": false,         "stateMutability": "view",         "type": "function"     }];
const SUDT_PROXY_CONTRACT_ADDRESS = '0xf3A922c13E1AA48eb76bF1228f47B2c9793944e2';

const GODWOKEN_RPC_URL = 'http://godwoken-testnet-web3-rpc.ckbapp.dev';
const polyjuiceConfig = {
    rollupTypeHash: '0x9b260161e003972c0b699939bc164cfdcfce7fd40eb9135835008dd7e09d3dae',
    ethAccountLockCodeHash: '0xfcf093a5f1df4037cea259d49df005e0e7258b4f63e67233eda5b376b7fd2290',
    web3Url: GODWOKEN_RPC_URL
};
  
const provider = new PolyjuiceHttpProvider(
    GODWOKEN_RPC_URL,
    polyjuiceConfig,
);

const web3 = new Web3(provider);

web3.eth.accounts = new PolyjuiceAccounts(polyjuiceConfig);
const account = web3.eth.accounts.wallet.add(ACCOUNT_PRIVATE_KEY);
web3.eth.Contract.setProvider(provider, web3.eth.accounts);

(async () => {
    console.log(`Using ETH address: ${account.address}`);

    const balance = BigInt(await web3.eth.getBalance(account.address));

    if (balance === 0n) {
        console.log(`Insufficient balance. Can't deploy contract. Please deposit funds to your Ethereum address: ${account.address}`);
        return;
    }

    console.log(`Deploying contract...`);

    const deployTx = new web3.eth.Contract(CompiledContractArtifact.abi).deploy({
        data: getBytecodeFromArtifact(CompiledContractArtifact),
        arguments: [SUDT_NAME, SUDT_SYMBOL, SUDT_TOTAL_SUPPLY, SUDT_ID]
    }).send({
        from: account.address,
        to: '0x' + new Array(40).fill(0).join(''),
        gas: 6000000,
        gasPrice: '0',
    });

    deployTx.on('transactionHash', hash => console.log(`Transaction hash: ${hash}`));

    const receipt = await deployTx;

    console.log(`Deployed contract address: ${receipt.contractAddress}`);

    // console.log(`Checking SUDT balance of Ethereum address: ${account.address}`);

    // const senderCheckerContract = new web3.eth.Contract(ETH_TO_POLYJUICE_CONTRACT_ABI, ETH_TO_POLYJIUICE_CONTRACT_ADDRESS);
    // const polyjuiceAddress = await senderCheckerContract.methods.getSender().call({
    //     from: account.address
    // });
    // console.log({
    //     polyjuiceAddress
    // });
    
    // const contract = new web3.eth.Contract(SUDT_PROXY_CONTRACT_ABI, SUDT_PROXY_CONTRACT_ADDRESS);
    // console.log(await contract.methods.balanceOf(polyjuiceAddress).call({
    //     from: account.address
    // }));
})();

function getBytecodeFromArtifact(contractArtifact) {
    return contractArtifact.bytecode || contractArtifact.data?.bytecode?.object
}