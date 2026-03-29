export interface BalanceManager {
  witdthdraw(amount: number): number;
  deposit(amount: number): number;
  canWithdraw(amount: number): boolean;
  getBalance(): number;
}

export abstract class AbstractBalanceManager implements BalanceManager {
  constructor(private _balance: number) {}

  canWithdraw(amount: number): boolean {
    return amount <= this._balance;
  }

  getBalance(): number {
    return this._balance;
  }

  witdthdraw(amount: number): number {
    if (this.canWithdraw(amount)) {
      this._balance -= amount;
      return this._balance;
    }
    return this._balance;
  }

  deposit(amount: number): number {
    this._balance += amount;
    return this._balance;
  }
}
