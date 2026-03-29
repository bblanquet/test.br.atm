# test.br.atm

Small **ATM-style flow** modeled in **TypeScript** (Node, ESM): validate a card, check PIN against registered users, pick an account, then withdraw or deposit cash against both the customer balance and the ATM’s cash dispenser.

This repo is structured as a **library**: `src/index.ts` exports the step functions; there is no interactive CLI yet.

## Requirements

- [Node.js](https://nodejs.org/) (current LTS is fine)

## Setup

```bash
npm install
```

## Scripts

| Command        | Description                                      |
| -------------- | ------------------------------------------------ |
| `npm run build` | Compile `src/` → `dist/` with `tsc`              |
| `npm start`     | Run `node dist/index.js` (loads the module)      |
| `npm test`      | Run [Vitest](https://vitest.dev/) unit tests     |

## Layout

| Path | Role |
| ---- | ---- |
| `src/index.ts` | Flow helpers: `inserCard`, `pinNumber`, `selectAccount`, `witdthdraw`, `deposit` |
| `src/account.ts` | `CardCredentials`, `Account` |
| `src/authContract.ts` | `Auth` interface (card validity, PIN, accounts, session) |
| `src/local/authImpl.ts` | In-memory `AuthImpl`: registered cards + per-card profile `Map` |
| `src/abstractBalanceManager.ts` | `BalanceManager` interface and `AbstractBalanceManager` base class |
| `src/local/balanceManagerImpl.ts` | `BalanceManagerImpl`: wraps an `Account` and syncs `balance` after each operation |
| `src/context.ts` | `Context`: `auth` + `atmBalancer` (both satisfy the contracts above) |
| `src/externalBank/` | Stubs (`bankAuthImpl`, `bankBalanceManagerImpl`) for a future **remote bank** |
| `test/` | One test file per exported flow function, plus `fixture.ts` for shared test data |

## Behavior notes

- **`Auth`** separates **PIN check** (`verifyPin(cardNumber, pin)`) from **loading accounts** (`getAccounts(cardNumber)`). After a correct PIN, that card is marked verified until `clearSession()` runs (called from `inserCard` when starting a new card session).

## Tests

Tests live under `test/` and target the five exported functions. Run:

```bash
npm test
```
