import type { Auth } from "./authContract.js";
import type { BalanceManager } from "./abstractBalanceManager.js";

export interface Context {
  auth: Auth;
  atmBalancer: BalanceManager;
}
