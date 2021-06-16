# Structure

## Mainnet / Testnet / Devnet

Nervos officially supports three different types of networks.

The Mainnet, also known as "Lina", is the live production network for Nervos. This public network is fully decentralized and permissionless, and relies on a robust Proof of Work (PoW) based incentive system to protect all of the assets on the network.

The Testnet, also known as "Aggron", is the public sandbox network. The software used by this network is exactly the same as the Mainnet, but all tokens and assets on the Testnet have no value. This environment provides a safe place for developers to experiment in a realistic shared environment with other developers, without the associated cost or risk.

New features are always tested on the Testnet prior to release on the Mainnet. For this reason, the Testnet may occasionally not have 100% reliability. The Testnet also uses Proof of Work, but because none of the tokens have value, there is only a minimal amount of security provided. Due to the nature of a Testnet, all data there should be viewed as imperminant.

A Devnet is a private network for testing purposes. It is similar to the Aggron Testnet, except that it is not a shared environment. Devnets normally reside entirely on the developer's computer, and are created on-demand as they are needed by the developer. Multiple Devnets can be created as needed, and they can each have slightly different configurations, and be paused or deleted as needed.

When a developer begins working on a new dapp, using a Devnet is recommended place to begin. A new network can be created instantly, without having to wait for the network to synchronize. A Devnet uses simulated mining, meaning it is centralized, but extremely efficient and low power to operate.

## Layer 1 / Layer 2

Nervos uses a multi-layer architecture to address the blockchain challenges of security, scalability, and decentralization. Achieving high levels of all three on a single layer is difficult to impossible, and there are always tradeoffs. However, different layers can each address different concerns.

- Nervos' Layer 1 focuses on security and decentralization, providing trust to higher layers.
- Nervos' Layer 2 focuses on scalability, providing nearly instantaneous transactions for millions of users.

The two layers function together to achieve higher levels of decentralization, security, and scalability than would be possible on any single layer.

The Nervos blockchain represents layer 1 in this stack. Also known as the Common Knowledge Base, is the bottom-most layer in the Nervos ecosystem. It serves as a foundation to build on and provides trust to all layers built on top. It is designed to maximize decentralization while remaining minimal, flexible, and secure. Its main purpose is the reliable preservation of any data and assets stored within it.

Layer 2 is represented by multiple separate chains, each of which may have unique characteristics both in operation and governance. Layer 2 chains can take many forms, and do not have a rigid definition on Nervos.

A discrete layer 2 chain could be used for a single project or a group of projects. The consensus could be Proof of Authority based, Proof of Stake based, or a different mechanism. Even the programming model used on the layer 2 chain can be changed from the native Cell Model, to alternative models like EVM (for Ethereum Solidity compatibility) or EOS (for EOS compatibility).

Most layer 2 chains on Nervos will have certain common characteristics:

- Ability to transfer tokens and other assets to and from layer 1.
- Process transactions in parallel to the layer 1 chain to achieve higher scalability.
- Rely on layer 1 to settle disputes and achieve higher levels of security and decentralization.

Nervos' first layer 2 offering will utilize the Godwoken and Polyjuice frameworks together to create an Ethereum compatible EVM environment that is capable of supporting Solidity based dapps. This layer 2 chain will be a community run, and will be usable permissionlessly by developers using the same tooling that is used for development with Ethereum.
