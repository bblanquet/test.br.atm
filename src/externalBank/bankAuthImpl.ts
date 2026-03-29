import type { Account } from "../account.js";
import type { Auth } from "../authContract.js";

export class BankAuthImpl implements Auth {
  clearSession(): void {
    throw new Error("Method not implemented.");
  }

  isValid(_cardNumber: string): boolean {
    throw new Error("Method not implemented.");
  }

  verifyPin(_cardNumber: string, _pin: string): boolean {
    throw new Error("Method not implemented.");
  }

  getAccounts(_cardNumber: string): Account[] {
    throw new Error("Method not implemented.");
  }
}
