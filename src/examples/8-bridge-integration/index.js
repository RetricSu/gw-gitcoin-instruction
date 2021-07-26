const Web3 = require('web3');
const { PolyjuiceHttpProvider } = require("@polyjuice-provider/web3");
const { AddressTranslator } = require('nervos-godwoken-integration');

const ETHEREUM_ADDRESS = '<YOUR_ETHEREUM_ADDRESS>';

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
    const addressTranslator = new AddressTranslator();
    const polyjuiceAddress = addressTranslator.ethAddressToGodwokenShortAddress(ETHEREUM_ADDRESS);
    console.log(`Corresponding Polyjuice address: ${polyjuiceAddress}\n`);

    const depositAddress = await addressTranslator.getLayer2DepositAddress(web3, ETHEREUM_ADDRESS);

    console.log(`Deposit to Layer 2 address on Layer 1: \n${depositAddress.addressString}`);
})();