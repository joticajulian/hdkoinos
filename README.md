# HD Koinos

Hierarchical Deterministic Wallet for Koinos. The HDKoinos follows the BIP44 standard as follows (see https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki):

path levels

```sh
m / purpose' / coin_type' / account' / change / address_index
```

**purpose:** 44

**coin_type:** 659. This value was selected by taking the word "koinos", converting it to ascii [107 111 105 110 111 115], and adding their values.

**account:** index of the account

**change:** Koinos doesn't use an UTXO model as bitcoin does, so there is no change. However, we take the philosophy around change: internal and external use.

- 0 for external use: Accounts. Addresses to receive payments and store assets.
- 1 for internal use: Signers. In Koinos these addresses are not meant to be used to store assets like tokens or NTFs) but to define signers for multisig wallets.

**address_index:**

- 0 for accounts, or
- index for signers (when change = 1)

## Install

Install the package from NPM

```
npm install @koinosbox/hdkoinos
```

## Usage

```
import { HDKoinos } from "@koinosbox/hdkoinos";

const mnemonic = "fine calm dignity journey grass fire jewel leader float foil crime power";
const hd = new HDKoinos(mnemonic);
const account0 = hd.deriveKeyAccount(0);
const account1 = hd.deriveKeyAccount(1);

console.log(account0);
// {
//   privateKey: "7d4179794f04789276f127611acf9b93b1ec50469d0556c38fe355f6efc76e54",
//   privateKeyWif: "L1RC5AhM8B5tZEGqEfW9AeAMWQSC9pm3G9KxK4gCcSJvShBngXS5",
//   address: "1HtjGZVVhyh1k5ZZnSVx5fNbZBK9sXrVnx",
// }

console.log(account1);
// {
//   privateKey: "f39cd5748669aa5f0235d66c94e023fa0a7caa08c20a3a9f5c485c894786ca55",
//   privateKeyWif: "L5PG9doSYNNRdKbgHCrX7VS3jnU9fHjhNidErTWnJUJGV6usWCYK",
//   address: "16FZn9eniH2KS18oCoYaGNX4rzSKYYtSUU",
// }
```
