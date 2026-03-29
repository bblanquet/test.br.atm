import { describe, expect, it } from "vitest";
import { pinNumber, witdthdraw } from "../src/index.js";
import { makeFixture } from "./fixture.js";

describe("witdthdraw", () => {
  it("withdraws from ATM when account and ATM have enough cash", () => {
    const { context, creds } = makeFixture({
      accounts: [{ id: "acc1", balance: 500 }],
      atmBalance: 10_000,
    });
    expect(pinNumber(context, creds)).toBe(true);
    expect(witdthdraw(context, creds, "acc1", 100)).toBe(true);
    expect(context.atmBalancer.getBalance()).toBe(9900);
  });

  it("returns false when the account balance is insufficient", () => {
    const { context, creds } = makeFixture({
      accounts: [{ id: "acc1", balance: 50 }],
    });
    expect(pinNumber(context, creds)).toBe(true);
    expect(witdthdraw(context, creds, "acc1", 100)).toBe(false);
    expect(context.atmBalancer.getBalance()).toBe(10_000);
  });

  it("returns false when the ATM cannot cover the amount", () => {
    const { context, creds } = makeFixture({
      accounts: [{ id: "acc1", balance: 5000 }],
      atmBalance: 30,
    });
    expect(pinNumber(context, creds)).toBe(true);
    expect(witdthdraw(context, creds, "acc1", 100)).toBe(false);
    expect(context.atmBalancer.getBalance()).toBe(30);
  });
});
