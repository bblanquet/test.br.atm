import type { Account } from "../account.js";
import type { Auth } from "../authContract.js";

type CardProfile = { pin: string; accounts: Account[] };

export class AuthImpl implements Auth {
  private readonly _pinVerifiedForCard = new Set<string>();

  constructor(
    private readonly _cards: Set<string>,
    private readonly _profiles: Map<string, CardProfile>,
  ) {}

  clearSession(): void {
    this._pinVerifiedForCard.clear();
  }

  isValid(cardNumber: string): boolean {
    return this._cards.has(cardNumber);
  }

  verifyPin(cardNumber: string, pin: string): boolean {
    if (!this.isValid(cardNumber)) {
      return false;
    }
    const profile = this._profiles.get(cardNumber);
    if (!profile) {
      return false;
    }
    const ok = profile.pin === pin;
    if (ok) {
      this._pinVerifiedForCard.add(cardNumber);
    }
    return ok;
  }

  getAccounts(cardNumber: string): Account[] {
    if (!this._pinVerifiedForCard.has(cardNumber)){
      return [];
    };
    return this._profiles.get(cardNumber)?.accounts ?? [];
  }
}
