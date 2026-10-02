export type MatchStrictness = "loose" | "balanced" | "strict";

export type SearchSettings = {
  minRelevance: number;
  maxResults: number;
  strictness: MatchStrictness;
  model: string;
};

export const DEFAULT_SEARCH_SETTINGS: SearchSettings = {
  minRelevance: 0.45,
  maxResults: 8,
  strictness: "balanced",
  model: "jev-latest",
};

export const MODEL_OPTIONS = [
  { value: "jev-latest", label: "jev-latest" },
  { value: "jev-preview", label: "jev-preview" },
  { value: "jev-1.13.0", label: "jev-1.13.0" },
] as const;

export const STRICTNESS_OPTIONS: {
  value: MatchStrictness;
  label: string;
  hint: string;
}[] = [
  {
    value: "loose",
    label: "Loose",
    hint: "Accept related / adjacent products",
  },
  {
    value: "balanced",
    label: "Balanced",
    hint: "Useful matches for the request",
  },
  {
    value: "strict",
    label: "Strict",
    hint: "Only clear, high-confidence fits",
  },
];

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function normalizeSearchSettings(
  input: Partial<SearchSettings> | null | undefined,
): SearchSettings {
  const minRelevance = clamp(
    typeof input?.minRelevance === "number" ? input.minRelevance : DEFAULT_SEARCH_SETTINGS.minRelevance,
    0,
    1,
  );
  const maxResults = Math.round(
    clamp(
      typeof input?.maxResults === "number" ? input.maxResults : DEFAULT_SEARCH_SETTINGS.maxResults,
      1,
      36,
    ),
  );
  const strictness = STRICTNESS_OPTIONS.some((option) => option.value === input?.strictness)
    ? (input!.strictness as MatchStrictness)
    : DEFAULT_SEARCH_SETTINGS.strictness;
  const model =
    typeof input?.model === "string" && input.model.trim()
      ? input.model.trim()
      : DEFAULT_SEARCH_SETTINGS.model;

  return { minRelevance, maxResults, strictness, model };
}
