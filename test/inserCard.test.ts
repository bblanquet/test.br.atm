import { describe, expect, it } from "vitest";
import { inserCard, pinNumber, selectAccount } from "../src/index.js";
import { makeFixture } from "./fixture.js";

describe("inserCard", () => {
  it("returns true when the card number is registered", () => {
    const { context, creds } = makeFixture();
    expect(inserCard(context, creds.cardNumber)).toBe(true);
  });

  it("returns false when the card number is not registered", () => {
    const { context } = makeFixture();
    expect(inserCard(context, "9999999999999999")).toBe(false);
  });

  it("clears PIN verification so a new insert requires PIN again", () => {
    const { context, creds } = makeFixture();
    expect(pinNumber(context, creds)).toBe(true);
    expect(selectAccount(context, creds, "acc1")).toBe(true);
    expect(inserCard(context, creds.cardNumber)).toBe(true);
    expect(selectAccount(context, creds, "acc1")).toBe(false);
  });
});
