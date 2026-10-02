"use client";

import { JevSettingsPanel } from "@/components/JevSettingsPanel";
import { products, type Product } from "@/data/products";
import { applySearchFilters, type SearchMatch } from "@/lib/ranking";
import {
  DEFAULT_SEARCH_SETTINGS,
  type SearchSettings,
} from "@/lib/settings";
import { useMemo, useState, type FormEvent } from "react";

type SearchResponse = {
  query: string;
  scored: SearchMatch[];
  matches: SearchMatch[];
  hasMatch: number;
  model: string;
  settings: SearchSettings;
  usage?: {
    input_tokens: number;
    output_tokens: number;
  };
  error?: string;
};

const EXAMPLES = [
  "lightweight waterproof jacket for hiking under $150",
  "gift for someone who loves morning coffee",
  "quiet headphones for long flights",
  "cozy blanket for winter evenings",
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}

function productInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function ProductCard({
  product,
  relevance,
  delayMs = 0,
}: {
  product: Product;
  relevance?: number;
  delayMs?: number;
}) {
  return (
    <article
      className="product-card"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div
        className="product-visual"
        style={{ background: product.tone }}
        aria-hidden
      >
        {typeof relevance === "number" && (
          <span className="match-badge">{formatPercent(relevance)} match</span>
        )}
        {productInitials(product.name)}
      </div>
      <div className="product-body">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">{formatPrice(product.price)}</span>
          {typeof relevance === "number" ? (
            <div
              className="relevance-bar"
              title={`Relevance ${formatPercent(relevance)}`}
            >
              <div
                className="relevance-fill"
                style={{ width: `${Math.max(relevance * 100, 8)}%` }}
              />
            </div>
          ) : (
            <span className="product-id">{product.id}</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SearchResponse | null>(null);
  const [settings, setSettings] = useState<SearchSettings>(DEFAULT_SEARCH_SETTINGS);

  const visibleMatches = useMemo(() => {
    if (!result?.scored?.length) return [];
    return applySearchFilters(result.scored, settings);
  }, [result, settings.minRelevance, settings.maxResults]);

  const needsResearch =
    !!result &&
    (result.settings.strictness !== settings.strictness ||
      result.settings.model !== settings.model);

  async function runSearch(nextQuery: string) {
    const trimmed = nextQuery.trim();
    if (!trimmed || loading) return;

    setQuery(trimmed);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed, settings }),
      });
      const data = (await response.json()) as SearchResponse;
      if (!response.ok) {
        throw new Error(data.error || "Search failed.");
      }
      setResult(data);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Search failed.");
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void runSearch(query);
  }

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/">
          <span className="brand-mark" aria-hidden />
          <span className="brand-name">Shelf</span>
        </a>
        <nav className="topbar-nav">
          <a className="topbar-link" href="#settings">
            Jev settings
          </a>
          <a className="topbar-link" href="#catalog">
            All products ({products.length})
          </a>
        </nav>
      </header>

      <div id="settings">
        <JevSettingsPanel
          settings={settings}
          onChange={setSettings}
          disabled={loading}
        />
      </div>

      <section className="hero" aria-label="Search">
        <h1 className="hero-brand">Shelf</h1>
        <p className="hero-copy">
          Describe what you want in plain language. Jev reads your catalog and
          ranks the products that actually fit.
        </p>

        <div className="search-panel">
          <form className="search-form" onSubmit={onSubmit}>
            <input
              className="search-input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="e.g. warm packable layer for cold city walks"
              aria-label="What are you looking for?"
              autoComplete="off"
            />
            <button className="search-button" type="submit" disabled={loading}>
              {loading ? "Searching…" : "Find products"}
            </button>
          </form>

          <div className="examples" aria-label="Example searches">
            {EXAMPLES.map((example) => (
              <button
                key={example}
                type="button"
                className="example-chip"
                onClick={() => void runSearch(example)}
                disabled={loading}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="results" aria-live="polite">
        {loading && (
          <div className="status-card">
            Asking Jev which products match your request…
          </div>
        )}

        {error && <div className="error-card">{error}</div>}

        {!loading && needsResearch && (
          <div className="status-card settings-notice">
            Model or strictness changed.{" "}
            <button
              type="button"
              className="inline-action"
              onClick={() => void runSearch(result.query)}
            >
              Re-run search
            </button>{" "}
            to apply those Jev settings. Min relevance and max results update
            instantly.
          </div>
        )}

        {!loading && result && (
          <>
            <div className="results-header">
              <h2>
                {visibleMatches.length > 0
                  ? "Matched products"
                  : "No strong matches"}
              </h2>
              <p className="results-meta">
                {visibleMatches.length > 0
                  ? `${visibleMatches.length} shown · threshold ${formatPercent(settings.minRelevance)} · ${result.model}`
                  : `Nothing above ${formatPercent(settings.minRelevance)} · top score ${formatPercent(result.hasMatch)} · ${result.model}`}
              </p>
            </div>

            {visibleMatches.length === 0 ? (
              <div className="empty-card">
                Nothing in this catalog clears your current threshold for “
                {result.query}”. Lower min relevance, loosen strictness, or
                broaden the request.
              </div>
            ) : (
              <div className="product-grid">
                {visibleMatches.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    relevance={product.relevance}
                    delayMs={index * 70}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <section className="catalog" id="catalog">
        <div className="results-header">
          <h2>All products</h2>
          <p className="results-meta">
            {products.length} items · {categories.length} categories
          </p>
        </div>

        <div className="category-list" aria-label="Categories">
          {categories.map((category) => (
            <span key={category} className="category-pill">
              {category}
            </span>
          ))}
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              delayMs={Math.min(index * 30, 400)}
            />
          ))}
        </div>
      </section>

      <p className="catalog-note">
        Demo catalog: {products.length} products. Search uses TypeSafe Jev (one{" "}
        <code>Noul</code> relevance score per product, scored in parallel) so
        results stay tied to your inventory—no hallucinated items.
      </p>
    </main>
  );
}
