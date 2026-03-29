import { Account, CardCredentials } from "../src/account";
import { Context } from "../src/context";
import { BalanceManagerImpl } from "../src/local/balanceManagerImpl";
import { AuthImpl } from "../src/local/authImpl";

export function makeFixture(overrides?: {
  accounts?: Account[];
  atmBalance?: number;
  cardNumber?: string;
  pin?: string;
}): { context: Context; creds: CardCredentials } {
  const cardNumber = overrides?.cardNumber ?? "4111111111111111";
  const pin = overrides?.pin ?? "1234";
  const creds: CardCredentials = { cardNumber, pin };
  const profiles = new Map([
    [
      cardNumber,
      {
        pin,
        accounts: overrides?.accounts ?? [{ id: "acc1", balance: 500 }],
      },
    ],
  ]);
  const auth = new AuthImpl(new Set([cardNumber]), profiles);
  const atmBalance = overrides?.atmBalance ?? 10_000;
  const atmBalancer = new BalanceManagerImpl({
    id: "__atm__",
    balance: atmBalance,
  });
  return { context: { auth, atmBalancer }, creds };
}
