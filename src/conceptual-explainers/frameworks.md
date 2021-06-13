# Frameworks

## Godwoken

Godwoken is a layer 2 rollup framework for use with the Nervos CKB layer 1 blockchain. When combined with the EVM-compatible Polyjuice framework, Solidity dapps can be run on Nervos' layer 2.

Godwoken is highly flexible and extensible, allowing it to support optimistic rollups, and potentially other rollup methods such as ZK-rollups in the future. Godwoken currently uses Proof of Authority based consensus, but will add Proof of Stake as an alternative in the near future.

Godwoken is designed to be used with a second framework which defines the programming model used within the layer 2 environment. Polyjuice is the first such implementation, which provides Ethereum EVM compatibility, but other implementations can be created to support compatibility with other chains such as EOS, Stellar, and Libra.

[Github](https://github.com/nervosnetwork/godwoken)
[Documentation](https://github.com/nervosnetwork/godwoken/tree/master/docs)

## Godwoken Kicker

Godwoken Kicker is a tool which allows developers to quickly launch an instance of Godwoken-Polyjuice Devnet.

This is useful to developers who need a quick solution to setup an Ethereum compatible Nervos environment to test compatibility with an existing Solidity dapp.

[Github](https://github.com/RetricSu/godwoken-kicker)

## Polyjuice

Polyjuice is an Ethereum EVM-compatible execution environment, which allows Solidity based smart contracts to run on Nervos. The goal of the project is 100% compatibility, allowing all Ethereum contracts to run on Nervos without any modification.

Polyjuice is designed to be used with the Godwoken rollup framework. This allows Polyjuice to completely moving smart contract execution to layer 2, and allows scaling far beyond what the Ethereum Mainnet is capable of today.

[Github](https://github.com/nervosnetwork/godwoken-polyjuice)
