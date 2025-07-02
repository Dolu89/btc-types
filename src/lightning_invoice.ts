import { decode } from 'light-bolt11-decoder'
import type { DecodedInvoice } from 'light-bolt11-decoder'
import { Amount } from './amount'

export class LightningInvoice {
	private readonly _decoded: DecodedInvoice

	constructor(paymentRequest: string) {
		this._decoded = decode(paymentRequest)
	}

	get paymentRequest(): string {
		return this._decoded.paymentRequest
	}

	get amount(): Amount {
		const section = this._decoded.sections.find((s) => s.name === 'amount')
		if (!section || !section.value) {
			return Amount.fromSatoshi(0)
		}
		return Amount.fromMilliSatoshi(Number(section.value))
	}

	get expireDate(): Date | null {
		const section = this._decoded.sections.find((s) => s.name === 'expiry')
		const creationDate = this.creationDate
		if (!section || !section.value || !creationDate) {
			return null
		}
		const expireSeconds = Number(section.value)
		return new Date(creationDate.getTime() + expireSeconds * 1000)
	}

	get creationDate(): Date | null {
		const section = this._decoded.sections.find((s) => s.name === 'timestamp')
		return section?.value ? new Date(Number(section.value) * 1000) : null
	}

	get isExpired(): boolean {
		const expireDate = this.expireDate
		return expireDate ? expireDate < new Date() : false
	}

	static fromBolt11(paymentRequest: string): LightningInvoice {
		return new LightningInvoice(paymentRequest)
	}
}
