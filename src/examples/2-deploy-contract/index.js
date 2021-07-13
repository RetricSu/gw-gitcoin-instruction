const Web3 = require('web3');
const { PolyjuiceHttpProvider, PolyjuiceAccounts } = require("@polyjuice-provider/web3");

const contractName = process.argv.slice(2)[0];

if (!contractName) {
    throw new Error(`No compiled contract specified to deploy. Please put it in "src/examples/2-deploy-contract/artifacts" directory and provide its name as an argument to this program, eg.: "node index.js SimpleStorage.json"`);
}

const CompiledContractArtifact = require(`./build/contracts/${contractName}`);

const DEPLOYER_PRIVATE_KEY = '0xd9066ff9f753a1898709b568119055660a77d9aae4d7a4ad677b8fb3d2a571e5';
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
const deployerAccount = web3.eth.accounts.wallet.add(DEPLOYER_PRIVATE_KEY);
web3.eth.Contract.setProvider(provider, web3.eth.accounts);

(async () => {
    console.log(`Deploying contract...`);

    const deployTx = new web3.eth.Contract(CompiledContractArtifact.abi).deploy({
        data: getBytecodeFromArtifact(CompiledContractArtifact),
        arguments: []
    }).send({
        from: deployerAccount.address,
        to: '0x' + new Array(40).fill(0).join(''),
        gas: 6000000,
        gasPrice: '0',
    });

    deployTx.on('transactionHash', hash => console.log(`Transaction hash: ${hash}`));

    const receipt = await deployTx;

    console.log(`Deployed contract address: ${receipt.contractAddress}`);
})();

function getBytecodeFromArtifact(contractArtifact) {
    return contractArtifact.bytecode || contractArtifact.data?.bytecode?.object
}