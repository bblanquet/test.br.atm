import { AbstractBalanceManager } from "../abstractBalanceManager.js";

export class BankBalanceManagerImpl extends AbstractBalanceManager {
  constructor(balance: number) {
    super(balance);
  }

  witdthdraw(amount: number): number {
    const value = super.witdthdraw(amount);
    // TODO
    // implement BANK integration
    throw new Error("Method not implemented.");
  }
  deposit(amount: number): number {
    const value = super.deposit(amount);
    // TODO
    // implement BANK integration
    throw new Error("Method not implemented.");
  }
}
