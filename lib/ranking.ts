import type { Product } from "@/data/products";
import type { SearchSettings } from "@/lib/settings";

export type SearchMatch = Product & {
  relevance: number;
  rank: number;
};

export function applySearchFilters(
  scored: SearchMatch[],
  settings: Pick<SearchSettings, "minRelevance" | "maxResults">,
): SearchMatch[] {
  return scored
    .filter((item) => item.relevance >= settings.minRelevance)
    .slice(0, settings.maxResults)
    .map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
}
