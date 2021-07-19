const Web3 = require('web3');
const { PolyjuiceHttpProvider, PolyjuiceAccounts } = require("@polyjuice-provider/web3");

const ACCOUNT_PRIVATE_KEY = '0x9277d63f22393a3e858b1ed8062c7684ff7411fc1f64f17db6d0be5ee9937207';
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
    console.log(`Checking SUDT balance of Ethereum address: ${account.address}`);

    const senderCheckerContract = new web3.eth.Contract(ETH_TO_POLYJUICE_CONTRACT_ABI, ETH_TO_POLYJIUICE_CONTRACT_ADDRESS);
    const polyjuiceAddress = await senderCheckerContract.methods.getSender().call({
        from: account.address
    });
    console.log({
        polyjuiceAddress
    });
    
    const contract = new web3.eth.Contract(SUDT_PROXY_CONTRACT_ABI, SUDT_PROXY_CONTRACT_ADDRESS);
    console.log(await contract.methods.balanceOf(polyjuiceAddress).call({
        from: account.address
    }));
})();