# Shelf

Natural-language product search powered by [TypeSafe Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev).

Describe what you want — *“lightweight waterproof jacket for hiking under $150”* — and Shelf asks Jev which products in the catalog actually fit. Results are ranked by calibrated probabilities, not keyword overlap alone.

## How it works

1. Your query and the product catalog are sent as **state** to Jev.
2. One **Noul** (yes/no probability) per product scores relevance independently — all in a single parallel request.
3. Code keeps products above the relevance threshold and sorts them for the UI.

This follows TypeSafe’s [search / retrieval](https://docs.typesafe.ai/concepts/use-case-map.md) and [rerank](https://docs.typesafe.ai/cookbooks/rerank_typesafe.md) patterns.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Add your TypeSafe API key:

```bash
cp .env.example .env.local
```

Put your key from [console.typesafe.ai](https://console.typesafe.ai/) in `.env.local`:

```
TYPESAFE_API_KEY=your_api_key_here
```

3. Start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project layout

| Path | Role |
| --- | --- |
| `data/products.ts` | Demo catalog (36 products) |
| `lib/search.ts` | Jev search: Choice + Noul |
| `app/api/search/route.ts` | Search API |
| `app/page.tsx` | Search UI |

## Swap in your catalog

Edit `data/products.ts` (or load products from your database) and keep `id` unique. Choice supports up to **255** options per request. For larger catalogs, shortlist first (keyword/embeddings), then pass candidates to Jev to rerank.
