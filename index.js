const converter = require('./bitcoinjs.min')

function convert(address) {
  try {
    decoded = converter.address.fromBase58Check(address)
    let version = decoded['version']

    switch (version) {
      case 5:
        // 'Mainnet p2sh address'
        version = 50
        break
      case 50:
        // 'Mainnet p2sh address (deprecated)'
        version = 5
        break
      case 196:
        // 'Testnet p2sh address'
        version = 58
        break
      case 58:
        // 'Testnet p2sh address (deprecated)'
        version = 196
        break
      default:
        throw 'unknown'
    }
    // 5 <-> 50
    // 196 <-> 58
    address = converter.address.toBase58Check(decoded['hash'], version)
  } catch (err) {
    throw new Error('Invalid address')
  }

  return address
}

module.exports = convert
