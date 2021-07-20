const Web3 = require('web3');
const { PolyjuiceHttpProvider } = require("@polyjuice-provider/web3");
const { ethAddressToGodwokenShortAddress } = require('./utils/address');
const CompiledContractArtifact = require(`./build/contracts/ERC20.json`);

const ETHEREUM_ADDRESS = '<YOUR_ETHEREUM_ADDRESS>';
const SUDT_PROXY_CONTRACT_ADDRESS = '<YOUR_SUDT_PROXY_CONTRACT_ADDRESS>';

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

(async () => {
    console.log(`Using Ethereum address: ${ETHEREUM_ADDRESS}`);
    const polyjuiceAddress = ethAddressToGodwokenShortAddress(ETHEREUM_ADDRESS);
    console.log(`Corresponding Polyjuice address: ${polyjuiceAddress}`);

    console.log(`Checking SUDT balance...`);

    const contract = new web3.eth.Contract(CompiledContractArtifact.abi, SUDT_PROXY_CONTRACT_ADDRESS);
    console.log(await contract.methods.balanceOf(polyjuiceAddress).call({
        from: ETHEREUM_ADDRESS
    }));
})();