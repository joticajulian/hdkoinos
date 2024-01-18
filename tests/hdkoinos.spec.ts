import { HDKoinos } from "../src";

describe("HD Koinos", () => {
  it("should derive private keys from mnemonic", () => {
    const mnemonic =
      "fine calm dignity journey grass fire jewel leader float foil crime power";
    const hd = new HDKoinos(mnemonic);

    expect(hd.deriveKeyAccount(0)).toStrictEqual({
      privateKey:
        "7d4179794f04789276f127611acf9b93b1ec50469d0556c38fe355f6efc76e54",
      privateKeyWif: "L1RC5AhM8B5tZEGqEfW9AeAMWQSC9pm3G9KxK4gCcSJvShBngXS5",
      address: "1HtjGZVVhyh1k5ZZnSVx5fNbZBK9sXrVnx",
    });

    expect(hd.deriveKeyAccount(1)).toStrictEqual({
      privateKey:
        "f39cd5748669aa5f0235d66c94e023fa0a7caa08c20a3a9f5c485c894786ca55",
      privateKeyWif: "L5PG9doSYNNRdKbgHCrX7VS3jnU9fHjhNidErTWnJUJGV6usWCYK",
      address: "16FZn9eniH2KS18oCoYaGNX4rzSKYYtSUU",
    });
  });
});
