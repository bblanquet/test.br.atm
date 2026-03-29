import { describe, expect, it } from "vitest";
import { pinNumber } from "../src/index.js";
import { makeFixture } from "./fixture.js";

describe("pinNumber", () => {
  it("returns true when card and PIN match a user with accounts", () => {
    const { context, creds } = makeFixture();
    expect(pinNumber(context, creds)).toBe(true);
  });

  it("returns false when the card is unknown", () => {
    const { context, creds } = makeFixture();
    expect(
      pinNumber(context, { cardNumber: "9999999999999999", pin: creds.pin }),
    ).toBe(false);
  });

  it("returns false when the PIN does not match the stored PIN", () => {
    const { context, creds } = makeFixture();
    expect(
      pinNumber(context, { cardNumber: creds.cardNumber, pin: "wrong" }),
    ).toBe(false);
  });
});
