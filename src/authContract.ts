import type { Account } from "./account.js";

export interface Auth {
  isValid(cardNumber: string): boolean;
  /** ATM sends PIN; bank answers yes/no without ever returning the stored PIN. */
  verifyPin(cardNumber: string, pin: string): boolean;
  /** Accounts for this card only after PIN was verified for this session. */
  getAccounts(cardNumber: string): Account[];
  /** Call when the user inserts or replaces a card; drops PIN verification state. */
  clearSession(): void;
}
