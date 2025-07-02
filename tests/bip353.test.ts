
import { describe, it, expect } from "bun:test";
import { Bip353 } from "../src";

const bitcoin = "bc1qztwy6xen3zdtt7z0vrgapmjtfz8acjkfp5fp7l"
const bolt12 = "lno1zr5qyugqgskrk70kqmuq7v3dnr2fnmhukps9n8hut48vkqpqnskt2svsqwjakp7k6pyhtkuxw7y2kqmsxlwruhzqv0zsnhh9q3t9xhx39suc6qsr07ekm5esdyum0w66mnx8vdquwvp7dp5jp7j3v5cp6aj0w329fnkqqv60q96sz5nkrc5r95qffx002q53tqdk8x9m2tmt85jtpmcycvfnrpx3lr45h2g7na3sec7xguctfzzcm8jjqtj5ya27te60j03vpt0vq9tm2n9yxl2hngfnmygesa25s4u4zlxewqpvp94xt7rur4rhxunwkthk9vly3lm5hh0pqv4aymcqejlgssnlpzwlggykkajp7yjs5jvr2agkyypcdlj280cy46jpynsezrcj2kwa2lyr8xvd6lfkph4xrxtk2xc3lpq"
const silentpayment = "sp1qqgste7k9hx0qftg6qmwlkqtwuy6cycyavzmzj85c6qdfhjdpdjtdgqjuexzk6murw56suy3e0rd2cgqvycxttddwsvgxe2usfpxumr70xc9pkqwv"


describe("BIP353", () => {
    it("should encode all as string", () => {
        const result = Bip353.create({
            username: "test",
            domain: "test.com",
            bitcoin: bitcoin,
            bolt12: bolt12,
            silentpayment: silentpayment
        });
        const expected = `bitcoin:${bitcoin}?lno=${bolt12}&sp=${silentpayment}`
        expect(result.uri).toBe(expected);
    });

    it("should encode partials as string", () => {
        const result = Bip353.create({
            username: "test",
            domain: "test.com",
            bolt12: bolt12,
        });
        const expected = `bitcoin:?lno=${bolt12}`
        expect(result.uri).toBe(expected);
    });

    it("should encode dns record", () => {
        const result = Bip353.create({
            username: "test",
            domain: "test.com",
            bitcoin: bitcoin,
            bolt12: bolt12,
        });
        expect(result.dnsRecord).toEqual({
            type: "TXT",
            name: "test.user._bitcoin-payment.test.com",
            content: `"bitcoin:${bitcoin}?lno=${bolt12}"`
        });
    });
});