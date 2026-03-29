import { AbstractBalanceManager } from "../abstractBalanceManager.js";
import { Account } from "../account.js";

export class BalanceManagerImpl extends AbstractBalanceManager {
  constructor(private _account:Account) {
    super(_account.balance);
  }

  witdthdraw(amount: number): number {
    const newBalance = super.witdthdraw(amount);
    this._account.balance = newBalance;
    return this._account.balance;
  }

  deposit(amount: number): number {
    const newBalance = super.deposit(amount);
    this._account.balance = newBalance;
    return this._account.balance;
  }
}
