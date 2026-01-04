# Returns Draft PoC (Shopify embedded admin app)

A small **proof-of-concept Shopify app** that demonstrates:
- OAuth install + embedded admin UI
- Admin GraphQL usage (read Orders)
- A minimal **Returns / Exchanges draft workflow** (no real refunds or gift cards executed)
- Webhooks: app/uninstalled + a useful event (orders/updated) + GDPR compliance endpoints (200 OK)

## Screens / Flow
1) Orders list (latest orders)
2) Order detail → select line items + reason + resolution
3) Create a **Return Draft** (saved locally)
4) Return Drafts list + detail

## Tech
- Shopify app template (React Router + TypeScript)
- Shopify Polaris (Admin UI)
- Prisma + SQLite (local storage)

## Local dev
### Requirements
- Node.js LTS
- Shopify CLI
- A Shopify Partners account + a development store

### Run
```bash
npm install
npm run shopify app dev
```

Follow the CLI steps to install the app on your dev store.

## Demo

60s screen recording available on request.

Suggested demo flow:

1. Open the app from Shopify Admin → Apps
2. Go to Orders → open an order
3. Select line items + reason + resolution
4. Click Create draft
5. Open Return Drafts and show the new draft

## What’s next

- Optional: map to Shopify Returns / Refund APIs (careful: refunds have real effects)

- Optional: implement “store credit” as a staged flow (e.g., note that gift card creation is a later milestone)

- Add basic tests + nicer UX
