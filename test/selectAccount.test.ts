import { describe, expect, it } from "vitest";
import { pinNumber, selectAccount } from "../src/index.js";
import { makeFixture } from "./fixture.js";

describe("selectAccount", () => {
  it("returns true when the account exists for the credentials", () => {
    const { context, creds } = makeFixture({
      accounts: [
        { id: "a", balance: 100 },
        { id: "b", balance: 200 },
      ],
    });
    expect(pinNumber(context, creds)).toBe(true);
    expect(selectAccount(context, creds, "b")).toBe(true);
  });

  it("returns false when the account id is not listed", () => {
    const { context, creds } = makeFixture();
    expect(pinNumber(context, creds)).toBe(true);
    expect(selectAccount(context, creds, "missing")).toBe(false);
  });

  it("returns false when PIN was not verified", () => {
    const { context, creds } = makeFixture();
    expect(selectAccount(context, creds, "acc1")).toBe(false);
  });

  it("returns false when credentials are invalid", () => {
    const { context, creds } = makeFixture();
    expect(
      selectAccount(
        context,
        { cardNumber: "9999999999999999", pin: creds.pin },
        "acc1",
      ),
    ).toBe(false);
  });
});
