const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

const WEB3_RPC_URL = 'http://godwoken-testnet-web3-rpc.ckbapp.dev';
const web3 = new Web3(WEB3_RPC_URL);

const USER_ONE_PRIVATE_KEY =
        '0xd9066ff9f753a1898709b568119055660a77d9aae4d7a4ad677b8fb3d2a571e5';
const USER_ONE_ACCOUNT = web3.eth.accounts.wallet.add(USER_ONE_PRIVATE_KEY);
const userOne = USER_ONE_ACCOUNT.address; 

const abi = JSON.parse(fs.readFileSync(path.join(__dirname, './SimpleStorage.abi')));
const bytecode = fs.readFileSync(path.join(__dirname, './SimpleStorage.bin')).toString();

console.log(bytecode);

const contract = new web3.eth.Contract(abi);

// try {
    const deploy = contract.deploy({
        data: bytecode,
        arguments: []
    }).send({
        from: userOne,
        gas: 6000000,
        gasPrice: '0'
    });

    console.log('d', deploy);

    const txHash = '';

    console.log(`check this transaction at https://explorer.nervos.org/aggron/transaction/${txHash}`);
// } catch {
//     console.error(`could not finished metamask signing process.`);
// } 