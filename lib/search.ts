import { getCatalogForModel, getProductById, products, type Product } from "@/data/products";
import { noul, TypeSafeClient, type Questions } from "@typesafe-ai/sdk";

export type SearchMatch = Product & {
  relevance: number;
  rank: number;
};

export type SearchResult = {
  query: string;
  matches: SearchMatch[];
  hasMatch: number;
  model: string;
  usage?: {
    input_tokens: number;
    output_tokens: number;
  };
};

const MIN_RELEVANCE = 0.45;
const TOP_N = 8;

function getClient() {
  const apiKey = process.env.TYPESAFE_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing TYPESAFE_API_KEY. Add it to .env.local (see .env.example).",
    );
  }
  return new TypeSafeClient({ apiKey });
}

function buildRelevanceQuestions(query: string): Questions {
  const questions: Questions = {};

  for (const product of products) {
    questions[product.id] = noul(
      {
        question: `Is product \`${product.id}\` in \`catalog\` a genuine match for what the shopper wants?`,
        shopper_request: query,
        product_id: product.id,
        guidance:
          "Judge fit against the shopper's intent, use case, style, and constraints (budget, weather, activity). Near-misses in the wrong category should score low.",
      },
      {
        true: "The shopper would reasonably want this product for their request",
        false: "This product does not satisfy the request in a useful way",
      },
    );
  }

  return questions;
}

export async function searchProducts(query: string): Promise<SearchResult> {
  const trimmed = query.trim();
  if (!trimmed) {
    throw new Error("Query is required.");
  }

  const client = getClient();
  const catalog = getCatalogForModel();
  const questions = buildRelevanceQuestions(trimmed);

  const response = await client.systemOne({
    model: "jev-latest",
    state: {
      shopper_request: trimmed,
      catalog,
    },
    questions,
  });

  const ranked = products
    .map((product) => {
      const answer = response.answers[product.id];
      const relevance =
        answer && answer.type === "noul" ? answer.noul : 0;
      return { ...product, relevance };
    })
    .sort((a, b) => b.relevance - a.relevance);

  const hasMatch = ranked[0]?.relevance ?? 0;

  const matches: SearchMatch[] = ranked
    .filter((item) => item.relevance >= MIN_RELEVANCE)
    .slice(0, TOP_N)
    .map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

  return {
    query: trimmed,
    matches,
    hasMatch,
    model: response.model,
    usage: response.usage,
  };
}

// Keep helper available for future product lookups in routes/tests.
export { getProductById };
