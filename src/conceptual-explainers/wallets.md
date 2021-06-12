# Wallets

## MetaMask

MetaMask is a cryptocurrency wallet used to interact with dapps. MetaMask initially started as a wallet designed for Ethereum, but now has some support for other cryptocurrencies as well.

Nervos has opted to support MetaMask as one of the primary wallets of the Nervos ecosystem. This decision was made because if it's proven track record, large pre-existing install-base, and its support of all major web browsers and mobile phones.

Two modes of operation are supported with MetaMask when interacting with the Nervos ecosystem.

When interacting with an Ethereum-compatible layer 2 chain using the Godwoken and Polyjuice frameworks, MetaMask should be configured to use the Godwoken RPC. This process is identical to other layer 2 chains, such as Polygon (Matic), and is used to interact with EVM-compatible Solidity-based dapps running on Nervos.

When interacting directly with Nervos' layer 1 CKB blockchain, no configuration changes are required. The flexibility of Nervos' layer 1 blockchain allows for full compatibility out-of-the-box. To facilitate this, the Nervos community supported [PW-SDK](https://github.com/lay2dev/pw-core) framework is used.

- [Official Website](https://metamask.io/)
- [Github](https://github.com/MetaMask)
- [Download](https://metamask.io/download.html)

## Portal Wallet

Portal Wallet is a popular browser based wallet for the Nervos ecosystem created by the [Lay2](https://lay2.tech/) development team. This wallet functions similar to a dapp, and allows for common Nervos operations such as transferring CKBytes and tokens and interacting with the Nervos DAO.

Lay2 are the developers of the [PW-SDK](https://github.com/lay2dev/pw-core) framework, which is used to power the Portal Wallet. This framework allows Portal Wallet to rely on the MetaMask wallet browser extension for private key management, without any configuration changes.

- [Official Website](https://ckb.pw/)
- [Github](https://github.com/lay2dev/PortalWallet)

## Keypering

Keypering is an officially supported desktop wallet for Nervos Network, with full native dapp support. Keypering runs as a desktop application with support for Windows, MacOS, and Linux.

Keypering is created by [Nervina Labs](https://nervina.cn/). Nervina is the development team for several products in the Nervos ecosystem, such as the [Neuron Wallet](https://docs.nervos.org/docs/basics/guides/neuron), the [Nervos Explorer](https://explorer.nervos.org/), and several Nervos SDKs.

- [Official Website](https://nervosnetwork.github.io/keypering/)
- [Github](https://github.com/nervosnetwork/keypering)
- [Download](https://github.com/nervosnetwork/keypering/releases)
- [Documentation](https://nervosnetwork.github.io/keypering/#/manual)
