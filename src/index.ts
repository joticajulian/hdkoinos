/**
 * Hierarchical Deterministic Wallet for Koinos
 *
 * The HDKoinos follows the BIP44 standard as follows
 * (see https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki):
 *
 * path levels
 * m / purpose' / coin_type' / account' / change / address_index
 *
 * purpose: 44
 *
 * coin_type: 659
 * This value was selected by taking the word "koinos", converting it
 * to ascii [107 111 105 110 111 115], and adding their values.
 *
 * account:
 * index of the account
 *
 * change:
 * Koinos doesn't use an UTXO model as bitcoin does, so there is no
 * change. However, we take the philosophy around change: internal and
 * external use.
 * - 0 for external use: Accounts. Addresses to receive payments and store
 *   assets.
 * - 1 for internal use: Signers. In Koinos these addresses are not
 *   meant to be used to store assets (like tokens or NTFs) but to
 *   define signers for multisig wallets.
 *
 * address_index:
 * - 0 for accounts, or
 * - index for signers (when change = 1)
 */

import { Signer } from "koilib";
import { utils } from "ethers";

const KOINOS_PATH = "m/44'/659'/";

export class HDKoinos {
  private hdNode: utils.HDNode;

  constructor(mnemonic: string) {
    this.hdNode = utils.HDNode.fromMnemonic(mnemonic);
  }

  static randomMnemonic() {
    return utils.entropyToMnemonic(utils.randomBytes(16));
  }

  static parsePath(keyPath: string) {
    if (!keyPath) throw new Error("Account not derived from a seed");

    const matchs = keyPath.match(
      /^m\/44'\/659'\/([0-9]*)'\/([0-9]*)\/([0-9]*)/
    );
    if (!matchs) throw new Error(`Invalid keyPath ${keyPath}`);
    const [, accountIndex, change, signerIndex] = matchs;
    if (change !== "0" && change !== "1")
      throw new Error(`Invalid 'change' in keyPath ${keyPath}`);
    return {
      accountIndex,
      ...(change === "1" && { signerIndex }),
    };
  }

  deriveKey(keyPath: string) {
    const key = this.hdNode.derivePath(keyPath);
    const signer = new Signer({
      privateKey: key.privateKey.slice(2),
    });

    return {
      privateKey: signer.getPrivateKey("hex", true),
      privateKeyWif: signer.getPrivateKey("wif", true),
      address: signer.getAddress(),
    };
  }

  deriveKeyAccount(accIndex: string | number) {
    return this.deriveKey(`${KOINOS_PATH}${accIndex}'/0/0`);
  }

  deriveKeySigner(accIndex: string | number, signerIndex: string | number) {
    return this.deriveKey(`${KOINOS_PATH}${accIndex}'/1/${signerIndex}`);
  }
}

export default HDKoinos;
