export class Amount {
    readonly #mSat: number = 0

    get mSat() {
        return this.#mSat
    }

    get sat() {
        return this.#mSat / 1000
    }

    private constructor(mSat: number) {
        this.#mSat = mSat
    }

    static fromSatoshi(satoshi: number) {
        return new Amount(satoshi * 1000)
    }

    static fromMilliSatoshi(mSat: number) {
        return new Amount(mSat)
    }
}
