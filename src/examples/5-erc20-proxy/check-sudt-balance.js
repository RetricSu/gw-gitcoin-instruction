const Web3 = require('web3');
const { PolyjuiceHttpProvider } = require("@polyjuice-provider/web3");
const { AddressTranslator } = require('nervos-godwoken-integration');

const CompiledContractArtifact = require(`./build/contracts/ERC20.json`);

const ETHEREUM_ADDRESS = '<YOUR_ETHEREUM_ADDRESS>';
const SUDT_PROXY_CONTRACT_ADDRESS = '<YOUR_SUDT_PROXY_CONTRACT_ADDRESS>';

const GODWOKEN_RPC_URL = 'http://godwoken-testnet-web3-rpc.ckbapp.dev';
const polyjuiceConfig = {
    rollupTypeHash: '0x4cc2e6526204ae6a2e8fcf12f7ad472f41a1606d5b9624beebd215d780809f6a',
    ethAccountLockCodeHash: '0xdeec13a7b8e100579541384ccaf4b5223733e4a5483c3aec95ddc4c1d5ea5b22',
    web3Url: GODWOKEN_RPC_URL
};

/**
 * TEMPORARY TESTNET CONFIG UNTIL "nervos-godwoken-integration" is updated with latest config.
 */
const TESTNET_CONFIG = {
    CKB_URL: "https://testnet.ckb.dev",
    INDEXER_URL: "https://testnet.ckb.dev/indexer",
    rollup_type_script: {
        code_hash: "0x5c365147bb6c40e817a2a53e0dec3661f7390cc77f0c02db138303177b12e9fb",
        hash_type: "type",
        args: "0x213743d13048e9f36728c547ab736023a7426e15a3d7d1c82f43ec3b5f266df2"
    },
    deposit_lock_script_type_hash: "0x5a2506bb68d81a11dcadad4cb7eae62a17c43c619fe47ac8037bc8ce2dd90360",
    eth_account_lock_script_type_hash: polyjuiceConfig.ethAccountLockCodeHash,
    rollup_type_hash: polyjuiceConfig.rollupTypeHash,
    portal_wallet_lock_hash: "0x58c5f491aba6d61678b7cf7edf4910b1f5e00ec0cde2f42e0abb4fd9aff25a63"
};

const provider = new PolyjuiceHttpProvider(
    GODWOKEN_RPC_URL,
    polyjuiceConfig,
);

const web3 = new Web3(provider);

(async () => {
    console.log(`Using Ethereum address: ${ETHEREUM_ADDRESS}`);
    const addressTranslator = new AddressTranslator(TESTNET_CONFIG);
    const polyjuiceAddress = addressTranslator.ethAddressToGodwokenShortAddress(ETHEREUM_ADDRESS);
    console.log(`Corresponding Polyjuice address: ${polyjuiceAddress}`);

    console.log(`Checking SUDT balance using proxy contract with address: ${SUDT_PROXY_CONTRACT_ADDRESS}...`);

    const contract = new web3.eth.Contract(CompiledContractArtifact.abi, SUDT_PROXY_CONTRACT_ADDRESS);
    console.log(await contract.methods.balanceOf(polyjuiceAddress).call({
        from: ETHEREUM_ADDRESS
    }));
})();