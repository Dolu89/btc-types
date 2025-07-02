export class Bip353 {

    static encode({ bitcoin, bolt12, silentpayment }: { bitcoin?: string, bolt12?: string, silentpayment?: string }) {
        const params = new URLSearchParams()
        if (bolt12) {
            params.set("lno", bolt12)
        }
        if (silentpayment) {
            params.set("sp", silentpayment)
        }
        return `bitcoin:${bitcoin ? bitcoin : ""}?${params.toString()}`
    }

}