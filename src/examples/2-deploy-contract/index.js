const Web3 = require('web3');
const { PolyjuiceHttpProvider, PolyjuiceAccounts } = require("@polyjuice-provider/web3");

const contractName = process.argv.slice(2)[0];

if (!contractName) {
    throw new Error(`No compiled contract specified to deploy. Please put it in "src/examples/2-deploy-contract/artifacts" directory and provide its name as an argument to this program, eg.: "node index.js SimpleStorage.json"`);
}

const CompiledContractArtifact = require(`./build/contracts/${contractName}`);

const DEPLOYER_PRIVATE_KEY = '<YOUR_ETHEREUM_PRIVATE_KEY>'; // Replace this with your Ethereum private key with funds on Layer 2.

const GODWOKEN_RPC_URL = 'http://godwoken-testnet-web3-rpc.ckbapp.dev';
const polyjuiceConfig = {
    rollupTypeHash: '0x4cc2e6526204ae6a2e8fcf12f7ad472f41a1606d5b9624beebd215d780809f6a',
    ethAccountLockCodeHash: '0xdeec13a7b8e100579541384ccaf4b5223733e4a5483c3aec95ddc4c1d5ea5b22',
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
    const balance = BigInt(await web3.eth.getBalance(deployerAccount.address));

    if (balance === 0n) {
        console.log(`Insufficient balance. Can't deploy contract. Please deposit funds to your Ethereum address: ${deployerAccount.address}`);
        return;
    }

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