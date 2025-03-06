# Order Book

The assignment from BTSE

## Environment

- Node.js 22

## Scripts

### Setup

Only required if it has never been run before (Administrator permission required):

```bash
corepack enable
```

### Install

```bash
yarn
```

### Run

```bash
yarn dev
```

Check the console for the URL where the website will open (usually <http://localhost:5173/>).

### Use Testnet as Server

Toggle the environment variable `VITE_WS_SERVER_HOST` in `.env` file

## Explanation of Some Code

### About the `api`/`orderBookApi`/`tradeApi` Objects

> See: `src/redux/api/*`

These are essentially the same object. Due to the limitations of `@reduxjs/toolkit`, they need to be structured this way for code splitting. They only need to be registered once in the Redux store.

### About the Theme

> See: `src/theme.ts`

I replaced the `success` and `error` colors with "buy" and "sell" colors. However, in a real-world scenario, there could be two possible solutions:

1. Using `primary` and `secondary` theme colors.
2. Defining custom color names, such as `buy` and `sell`.

I didn't choose the first option because it doesn't feel like a proper "theme." The second option could be better based on my experience, but I may not have time to implement it fully.

### About Using `alpha` for Some Translucent Colors in Components

> Search for `alpha(` in the code to find instances.

It seems to indicate the "translucent version" of the `buy` and `sell` colors, so I avoided hardcoding it. However, in `LastPriceRow.tsx`, I partially hardcoded the colors because they didn't fully match the `buy` and `sell` colors.

### About the Arrow Icon

> See: `src/components/OrderBook/LastPriceRow.tsx`

I couldn't find specifications on whether the arrow should be displayed when the price remains unchanged, so I simply hid it in that case.
