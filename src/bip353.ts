type Bip353Params = {
    username: string,
    domain: string,
    bitcoin?: string,
    bolt12?: string,
    silentpayment?: string
}

export class Bip353 {

    private constructor(
        private readonly username: string,
        private readonly domain: string,
        private readonly bitcoin?: string,
        private readonly bolt12?: string,
        private readonly silentpayment?: string
    ) { }

    static create({ username, domain, bitcoin, bolt12, silentpayment }: Bip353Params) {
        return new Bip353(username, domain, bitcoin, bolt12, silentpayment)
    }

    get uri() {
        const params = new URLSearchParams()
        if (this.bolt12) {
            params.set("lno", this.bolt12)
        }
        if (this.silentpayment) {
            params.set("sp", this.silentpayment)
        }
        return `bitcoin:${this.bitcoin ? this.bitcoin : ""}?${params.toString()}`
    }

    get dnsRecord() {
        return {
            type: "TXT",
            name: `${this.username}.user._bitcoin-payment.${this.domain}`,
            content: `"${this.uri}"`
        }
    }

}