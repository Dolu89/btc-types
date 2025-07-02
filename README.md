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

Create unified Bitcoin payment URIs supporting multiple payment methods (BIP353):

```typescript
import { Bip353 } from '@dolu/btc-types';

// Encode with all payment methods
const uri = Bip353.encode({
    bitcoin: "bc1qztwy6xen3zdtt7z0vrgapmjtfz8acjkfp5fp7l",
    bolt12: "lno1zr5qyugqgskrk70kqmuq7v3dnr2fnmhukps9n8hut48vkqpqnskt2svsqwjakp7k6pyhtkuxw7y2kqmsxlwruhzqv0zsnhh9q3t9xhx39suc6qsr07ekm5esdyum0w66mnx8vdquwvp7dp5jp7j3v5cp6aj0w329fnkqqv60q96sz5nkrc5r95qffx002q53tqdk8x9m2tmt85jtpmcycvfnrpx3lr45h2g7na3sec7xguctfzzcm8jjqtj5ya27te60j03vpt0vq9tm2n9yxl2hngfnmygesa25s4u4zlxewqpvp94xt7rur4rhxunwkthk9vly3lm5hh0pqv4aymcqejlgssnlpzwlggykkajp7yjs5jvr2agkyypcdlj280cy46jpynsezrcj2kwa2lyr8xvd6lfkph4xrxtk2xc3lpq",
    silentpayment: "sp1qqgste7k9hx0qftg6qmwlkqtwuy6cycyavzmzj85c6qdfhjdpdjtdgqjuexzk6murw56suy3e0rd2cgqvycxttddwsvgxe2usfpxumr70xc9pkqwv"
});
console.log(uri); 
// Output: bitcoin:bc1qztwy6xen3zdtt7z0vrgapmjtfz8acjkfp5fp7l?lno=lno1zr5qyugq...&sp=sp1qqgste7k9hx0q...

// Encode with partial payment methods
const lightningOnly = Bip353.encode({
    bolt12: "lno1zr5qyugq..."
});
console.log(lightningOnly);
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

| Method | Description | Returns |
|--------|-------------|---------|
| `Bip353.encode(options)` | Create unified Bitcoin payment URI | `string` |

**Options for `Bip353.encode()`:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bitcoin` | `string` | No | Bitcoin address (legacy, segwit, or taproot) |
| `bolt12` | `string` | No | Lightning BOLT12 offer string |
| `silentpayment` | `string` | No | Silent payment address |

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
