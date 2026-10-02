import { getCatalogForModel, getProductById, products } from "@/data/products";
import { applySearchFilters, type SearchMatch } from "@/lib/ranking";
import {
  normalizeSearchSettings,
  type MatchStrictness,
  type SearchSettings,
} from "@/lib/settings";
import { noul, TypeSafeClient, type Questions } from "@typesafe-ai/sdk";

export type { SearchMatch };

export type SearchResult = {
  query: string;
  /** Every product with its Jev relevance score, sorted high → low. */
  scored: SearchMatch[];
  /** Filtered view using the request settings. */
  matches: SearchMatch[];
  hasMatch: number;
  model: string;
  settings: SearchSettings;
  usage?: {
    input_tokens: number;
    output_tokens: number;
  };
};

const STRICTNESS_CRITERIA: Record<
  MatchStrictness,
  { true: string; false: string; guidance: string }
> = {
  loose: {
    true: "The product is related enough that a shopper might consider it for this request",
    false: "The product is clearly unrelated to the request",
    guidance:
      "Be generous. Include adjacent categories and partial fits if they could still help the shopper.",
  },
  balanced: {
    true: "The shopper would reasonably want this product for their request",
    false: "This product does not satisfy the request in a useful way",
    guidance:
      "Judge fit against intent, use case, style, and constraints. Near-misses in the wrong category should score low.",
  },
  strict: {
    true: "The product is a clear, strong fit for the shopper's exact request and constraints",
    false: "Anything less than a clear fit, including loose or adjacent options",
    guidance:
      "Be picky. Budget, category, and use-case constraints must be satisfied. Prefer precision over recall.",
  },
};

function getClient() {
  const apiKey = process.env.TYPESAFE_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing TYPESAFE_API_KEY. Add it to .env.local (see .env.example).",
    );
  }
  return new TypeSafeClient({ apiKey });
}

function buildRelevanceQuestions(
  query: string,
  strictness: MatchStrictness,
): Questions {
  const criteria = STRICTNESS_CRITERIA[strictness];
  const questions: Questions = {};

  for (const product of products) {
    questions[product.id] = noul(
      {
        question: `Is product \`${product.id}\` in \`catalog\` a genuine match for what the shopper wants?`,
        shopper_request: query,
        product_id: product.id,
        guidance: criteria.guidance,
      },
      {
        true: criteria.true,
        false: criteria.false,
      },
    );
  }

  return questions;
}

export async function searchProducts(
  query: string,
  rawSettings?: Partial<SearchSettings>,
): Promise<SearchResult> {
  const trimmed = query.trim();
  if (!trimmed) {
    throw new Error("Query is required.");
  }

  const settings = normalizeSearchSettings(rawSettings);
  const client = getClient();
  const catalog = getCatalogForModel();
  const questions = buildRelevanceQuestions(trimmed, settings.strictness);

  const response = await client.systemOne({
    model: settings.model,
    state: {
      shopper_request: trimmed,
      catalog,
    },
    questions,
  });

  const scored: SearchMatch[] = products
    .map((product) => {
      const answer = response.answers[product.id];
      const relevance = answer && answer.type === "noul" ? answer.noul : 0;
      return { ...product, relevance, rank: 0 };
    })
    .sort((a, b) => b.relevance - a.relevance)
    .map((item, index) => ({ ...item, rank: index + 1 }));

  const matches = applySearchFilters(scored, settings);
  const hasMatch = scored[0]?.relevance ?? 0;

  return {
    query: trimmed,
    scored,
    matches,
    hasMatch,
    model: response.model,
    settings,
    usage: response.usage,
  };
}

export { getProductById };
