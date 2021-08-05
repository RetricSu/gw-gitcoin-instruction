import Web3 from "web3";
import { PolyjuiceHttpProvider } from "@polyjuice-provider/web3";

import { POLYJUICE_CONFIG } from "./config.mjs";
import { sendTronTransaction } from "./helpers.mjs";

const ACCOUNT_PRIVATE_KEY =
  "0x45777e4dbd55d4f4db25b7f3b4c7d8ac38677b4e6a4d74030b787ef63c2a29bb"; // Replace this with your Tron private key with funds on Layer 2.

const TRON_ADDRESS = "TFrSJCrSJai8H2Kc32TP3nEzuWsXu8YnUJ";

const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
    ],
    name: "set",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "get",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const CONTRACT_ADDRESS = "0x3E3b7616812290B60ceEcF412C9CDf941Da841A9";

const provider = new PolyjuiceHttpProvider(
  POLYJUICE_CONFIG.web3Url,
  POLYJUICE_CONFIG,
);

const web3 = new Web3(provider);

async function readCall() {
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  const callResult = await contract.methods.get().call();

  console.log(`Read call result: ${callResult}`);
}

async function writeCall() {
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  const callData = contract.methods.set(400).encodeABI();

  const txHash = await sendTronTransaction(
    { address: TRON_ADDRESS, privateKey: ACCOUNT_PRIVATE_KEY },
    CONTRACT_ADDRESS,
    callData
  );

  console.log(`Write call transaction hash: ${txHash}`);

  console.log(`Waiting for tx receipt doesn't work for Tron calls, but if transaction was submitted then you can check the smart-contract state after 120s and the state should be changed successfully. Waiting 2 minutes...`);
  await new Promise(r => setTimeout(r, 120 * 1000));

  console.log(`Write call finished.`);
}

(async () => {
  console.log("Calling contract...");

  // Check smart contract state before state change.
  await readCall();

  // Change smart contract state.
  await writeCall();

  // Check smart contract state after state change.
  await readCall();
})();
