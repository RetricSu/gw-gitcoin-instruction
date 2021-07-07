const Web3 = require('web3');
const { PolyjuiceHttpProviderCli } = require("@polyjuice-provider/web3");

const contractName = process.argv.slice(2)[0];

if (!contractName) {
    throw new Error(`No compiled contract specified to deploy. Please put it in "src/examples/2-deploy-contract/artifacts" directory and provide its name as an argument to this program, eg.: "node index.js SimpleStorage.json"`);
}

const CompiledContractArtifact = require(`./artifacts/${contractName}`);

const USER_ONE_PRIVATE_KEY = '0xd9066ff9f753a1898709b568119055660a77d9aae4d7a4ad677b8fb3d2a571e5';
const USER_ONE_ETH_ADDRESS = '0xD173313A51f8fc37BcF67569b463abd89d81844f'; 
const GODWOKEN_RPC_URL = 'http://godwoken-testnet-web3-rpc.ckbapp.dev';

const polyjuiceConfig = {
    web3Url: GODWOKEN_RPC_URL,
    godwoken: {
        rollup_type_hash: '0x9b260161e003972c0b699939bc164cfdcfce7fd40eb9135835008dd7e09d3dae',
        eth_account_lock: {
            code_hash: '0xfcf093a5f1df4037cea259d49df005e0e7258b4f63e67233eda5b376b7fd2290',
            hash_type: 'type'
        }
    }
};

const provider = new PolyjuiceHttpProviderCli(
    GODWOKEN_RPC_URL,
    polyjuiceConfig,
    [],
    USER_ONE_PRIVATE_KEY
);

const web3 = new Web3(provider);

(async () => {
    console.log(`Deploying contract...`);
    const deployTx = new web3.eth.Contract(CompiledContractArtifact.abi).deploy({
        data: CompiledContractArtifact.data.bytecode.object,
        arguments: []
    }).send({
        from: USER_ONE_ETH_ADDRESS,
        gas: 6000000,
        gasPrice: '0'
    });

    deployTx.on('transactionHash', hash => console.log(`Transaction hash: ${hash}`));

    const contract = await deployTx;

    console.log(`Deployed contract address: ${contract.options.address}`);
})();