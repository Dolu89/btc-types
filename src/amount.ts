export class Amount {
	private readonly _mSat: number

	constructor(mSat: number) {
		this._mSat = mSat
	}

	get mSat(): number {
		return this._mSat
	}

	get sat(): number {
		return this._mSat / 1000
	}

	static fromSatoshi(satoshi: number): Amount {
		return new Amount(satoshi * 1000)
	}

	static fromMilliSatoshi(mSat: number): Amount {
		return new Amount(mSat)
	}
}
