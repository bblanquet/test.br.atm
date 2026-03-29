import { CardCredentials } from "./account.js";
import { Context } from "./context.js";
import { BalanceManagerImpl } from "./local/balanceManagerImpl.js";

const inserCard = (context: Context, cardNumber: string): boolean => {
  context.auth.clearSession();
  return context.auth.isValid(cardNumber);
};

const pinNumber = (
  context: Context,
  cardCredentials: CardCredentials,
): boolean => {
  return context.auth.verifyPin(
    cardCredentials.cardNumber,
    cardCredentials.pin,
  );
};

const selectAccount = (
  context: Context,
  cardCredentials: CardCredentials,
  accountId: string,
): boolean => {
  const accounts = context.auth.getAccounts(cardCredentials.cardNumber);
  const account = accounts.find((a) => a.id === accountId);
  return account !== undefined;
};

const witdthdraw = (
  context: Context,
  cardCredentials: CardCredentials,
  accountId: string,
  amount: number,
): boolean => {
  const accounts = context.auth.getAccounts(cardCredentials.cardNumber);
  const account = accounts.find((a) => a.id === accountId);
  if (account) {
    const balance = new BalanceManagerImpl(account);
    if (balance.canWithdraw(amount) && context.atmBalancer.canWithdraw(amount)) {
      context.atmBalancer.witdthdraw(amount);
      balance.witdthdraw(amount);
      return true;
    }
  }
  return false;
};

const deposit = (
  context: Context,
  cardCredentials: CardCredentials,
  accountId: string,
  amount: number,
): boolean => {
  const accounts = context.auth.getAccounts(cardCredentials.cardNumber);
  const account = accounts.find((a) => a.id === accountId);
  if (account) {
    const balance = new BalanceManagerImpl(account);
    context.atmBalancer.deposit(amount);
    balance.deposit(amount);
    return true;
  }
  return false;
};

export { deposit, inserCard, pinNumber, selectAccount, witdthdraw };
