import { describe, expect, it } from "vitest";
import { deposit, pinNumber } from "../src/index.js";
import { makeFixture } from "./fixture.js";

describe("deposit", () => {
  it("deposits into the ATM and returns true", () => {
    const { context, creds } = makeFixture();
    expect(pinNumber(context, creds)).toBe(true);
    expect(deposit(context, creds, "acc1", 250)).toBe(true);
    expect(context.atmBalancer.getBalance()).toBe(10_250);
  });

  it("returns false when the account id is wrong", () => {
    const { context, creds } = makeFixture();
    expect(pinNumber(context, creds)).toBe(true);
    expect(deposit(context, creds, "nope", 10)).toBe(false);
    expect(context.atmBalancer.getBalance()).toBe(10_000);
  });
});
