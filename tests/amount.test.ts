import { describe, it, expect } from "bun:test";
import { Amount } from "../src";

describe("Amount", () => {
    it("should parse 1 sat to 1000 mSats", () => {
        const amount = Amount.fromSatoshi(1);
        expect(amount.mSat).toBe(1000);
    });

        it("should parse 1000 mSat to 1000 sat", () => {
        const amount = Amount.fromMilliSatoshi(1000);
        expect(amount.sat).toBe(1);
    });

    it("should parse 1 mSat to 1 mSat", () => {
        const amount = Amount.fromMilliSatoshi(1);
        expect(amount.mSat).toBe(1);
    });

    it("should parse 1.5 mSat to 1.5 mSat", () => {
        const amount = Amount.fromMilliSatoshi(1.5);
        expect(amount.mSat).toBe(1.5);
    });

    it("should parse 1.5 sat to 1500 mSats", () => {
        const amount = Amount.fromSatoshi(1.5);
        expect(amount.mSat).toBe(1500);
    });
});