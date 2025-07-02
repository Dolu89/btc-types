import { describe, it, expect } from "bun:test";
import { LightningInvoice } from "../src";

const goodInvoice = "lnbc15u1p3xnhl2pp5jptserfk3zk4qy42tlucycrfwxhydvlemu9pqr93tuzlv9cc7g3sdqsvfhkcap3xyhx7un8cqzpgxqzjcsp5f8c52y2stc300gl6s4xswtjpc37hrnnr3c9wvtgjfuvqmpm35evq9qyyssqy4lgd8tj637qcjp05rdpxxykjenthxftej7a2zzmwrmrl70fyj9hvj0rewhzj7jfyuwkwcg9g2jpwtk3wkjtwnkdks84hsnu8xps5vsq4gj5hs"

describe("Lightning invoice", () => {
    it("should parse invoice", () => {
        const invoice = LightningInvoice.fromBolt11(goodInvoice);
        expect(invoice).toBeDefined();
    });


    it("should parse amount mSat", () => {
        const invoice = LightningInvoice.fromBolt11(goodInvoice);
        expect(invoice.amount.mSat).toBe(1500000);
    });


    it("should parse amount sat", () => {
        const invoice = LightningInvoice.fromBolt11(goodInvoice);
        expect(invoice.amount.sat).toBe(1500);
    });

    it("should parse expire date", () => {
        const invoice = LightningInvoice.fromBolt11(goodInvoice);
        expect(invoice.expireDate?.toISOString()).toBe(new Date("2022-04-28T00:39:30.000Z").toISOString());
    });

    it("should parse creation date", () => {
        const invoice = LightningInvoice.fromBolt11(goodInvoice);
        expect(invoice.creationDate?.toISOString()).toBe(new Date("2022-04-28T00:29:30.000Z").toISOString());
    });

    it("should be expired", () => {
        const invoice = LightningInvoice.fromBolt11(goodInvoice);
        expect(invoice.isExpired).toBe(true);
    });
});