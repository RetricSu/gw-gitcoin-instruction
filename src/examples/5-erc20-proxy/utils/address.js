const { utils } = require("@ckb-lumos/base");

const ROLLUP_TYPE_HASH = '0x9b260161e003972c0b699939bc164cfdcfce7fd40eb9135835008dd7e09d3dae';

module.exports = {
  ethAddressToGodwokenShortAddress(
    ethAddress
  ) {
    if (ethAddress.length !== 42 || !ethAddress.startsWith("0x")) {
      throw new Error("eth address format error!");
    }
  
    const layer2Lock = {
      code_hash: '0xfcf093a5f1df4037cea259d49df005e0e7258b4f63e67233eda5b376b7fd2290',
      hash_type: 'type',
      args: ROLLUP_TYPE_HASH + ethAddress.slice(2).toLowerCase(),
    };
    const scriptHash = utils.computeScriptHash(layer2Lock);
    const shortAddress = scriptHash.slice(0, 42);
    return shortAddress;
  }
}