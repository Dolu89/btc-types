# 🪙 btc-types

A TypeScript library providing type-safe utilities for Bitcoin and Lightning Network operations.

## 📦 Installation

```bash
npm install @dolu/btc-types
# or
bun add @dolu/btc-types
# or  
yarn add @dolu/btc-types
```

## 🚀 Usage

### Amount

Handle Bitcoin amounts with automatic conversion between satoshi and millisatoshi:

```typescript
import { Amount } from '@dolu/btc-types';

// Create amounts
const amount1 = Amount.fromSatoshi(1000);        // 1000 sats
const amount2 = Amount.fromMilliSatoshi(1500);   // 1.5 sats

// Access values
console.log(amount1.sat);   // 1000
console.log(amount1.mSat);  // 1000000

console.log(amount2.sat);   // 1.5  
console.log(amount2.mSat);  // 1500
```

### Lightning Invoice

Parse and extract information from BOLT11 Lightning invoices:

```typescript
import { LightningInvoice } from '@dolu/btc-types';

const invoice = LightningInvoice.fromBolt11('lnbc1500n1...');

// Access invoice properties
console.log(invoice.paymentRequest);  // Original BOLT11 string
console.log(invoice.amount.sat);      // Amount in satoshi
console.log(invoice.amount.mSat);     // Amount in millisatoshi
console.log(invoice.creationDate);    // Creation date as Date object
console.log(invoice.expireDate);      // Expiration date as Date object  
console.log(invoice.isExpired);       // Boolean: is the invoice expired?
```

### BIP353 

Create human-readable Bitcoin payment addresses with DNS support (BIP353):

```typescript
import { Bip353 } from '@dolu/btc-types';

// Create a BIP353 payment address with all payment methods
const payment = Bip353.create({
    username: "alice",
    domain: "example.com",
    bitcoin: "bc1qztwy6xen3zdtt7z0vrgapmjtfz8acjkfp5fp7l",
    bolt12: "lno1zr5qyugqgskrk70kqmuq7v3dnr2fnmhukps9n8hut48vkqpqnskt2svsqwjakp7k6pyhtkuxw7y2kqmsxlwruhzqv0zsnhh9q3t9xhx39suc6qsr07ekm5esdyum0w66mnx8vdquwvp7dp5jp7j3v5cp6aj0w329fnkqqv60q96sz5nkrc5r95qffx002q53tqdk8x9m2tmt85jtpmcycvfnrpx3lr45h2g7na3sec7xguctfzzcm8jjqtj5ya27te60j03vpt0vq9tm2n9yxl2hngfnmygesa25s4u4zlxewqpvp94xt7rur4rhxunwkthk9vly3lm5hh0pqv4aymcqejlgssnlpzwlggykkajp7yjs5jvr2agkyypcdlj280cy46jpynsezrcj2kwa2lyr8xvd6lfkph4xrxtk2xc3lpq",
    silentpayment: "sp1qqgste7k9hx0qftg6qmwlkqtwuy6cycyavzmzj85c6qdfhjdpdjtdgqjuexzk6murw56suy3e0rd2cgqvycxttddwsvgxe2usfpxumr70xc9pkqwv"
});

// Get the Bitcoin payment URI
console.log(payment.uri);
// Output: bitcoin:bc1qztwy6xen3zdtt7z0vrgapmjtfz8acjkfp5fp7l?lno=lno1zr5qyugq...&sp=sp1qqgste7k9hx0q...

// Get DNS record information for setting up the address
console.log(payment.dnsRecord);
// Output: {
//   type: "TXT",
//   name: "alice.user._bitcoin-payment.example.com", 
//   content: '"bitcoin:bc1qztwy6xen3zdtt7z0vrgapmjtfz8acjkfp5fp7l?lno=lno1zr5qyugq...&sp=sp1qqgste7k9hx0q..."'
// }

// Create with partial payment methods (Lightning only)
const lightningOnly = Bip353.create({
    username: "bob",
    domain: "lightning.com",
    bolt12: "lno1zr5qyugq..."
});
console.log(lightningOnly.uri);
// Output: bitcoin:?lno=lno1zr5qyugq...
```

## 📚 API Reference

### Amount

| Method | Description | Returns |
|--------|-------------|---------|
| `Amount.fromSatoshi(sats)` | Create amount from satoshi | `Amount` |
| `Amount.fromMilliSatoshi(mSats)` | Create amount from millisatoshi | `Amount` |
| `amount.sat` | Get amount in satoshi | `number` |
| `amount.mSat` | Get amount in millisatoshi | `number` |

### LightningInvoice

| Method/Property | Description | Returns |
|-----------------|-------------|---------|
| `LightningInvoice.fromBolt11(bolt11)` | Parse BOLT11 invoice | `LightningInvoice` |
| `invoice.paymentRequest` | Original BOLT11 string | `string` |
| `invoice.amount` | Invoice amount | `Amount` |
| `invoice.creationDate` | Invoice creation date | `Date \| null` |
| `invoice.expireDate` | Invoice expiration date | `Date \| null` |
| `invoice.isExpired` | Check if invoice is expired | `boolean` |

### Bip353

| Method/Property | Description | Returns |
|-----------------|-------------|---------|
| `Bip353.create(params)` | Create BIP353 payment address | `Bip353` |
| `payment.uri` | Get Bitcoin payment URI | `string` |
| `payment.dnsRecord` | Get DNS TXT record configuration | `object` |

**Parameters for `Bip353.create()`:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | `string` | Yes | Username for the payment address |
| `domain` | `string` | Yes | Domain for the payment address |
| `bitcoin` | `string` | No | Bitcoin address (legacy, segwit, or taproot) |
| `bolt12` | `string` | No | Lightning BOLT12 offer string |
| `silentpayment` | `string` | No | Silent payment address |

**DNS Record Object:**

| Property | Type | Description |
|----------|------|-------------|
| `type` | `string` | Always "TXT" |
| `name` | `string` | DNS record name (`username.user._bitcoin-payment.domain`) |
| `content` | `string` | DNS record content (quoted Bitcoin URI) |

## 🛠️ Development

This project uses [Bun](https://bun.sh) for fast development and testing.

### Prerequisites

Install Bun:
```bash
curl -fsSL https://bun.sh/install | bash
```

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/btc-types
cd btc-types

# Install dependencies
bun install
```

### Scripts

```bash
# Run tests
bun test

# Build the project
bun run build

# Clean build artifacts
bun run clean
```


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
