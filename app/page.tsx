"use client";

import { useState, type FormEvent } from "react";

type SearchMatch = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  tone: string;
  relevance: number;
  rank: number;
};

type SearchResponse = {
  query: string;
  matches: SearchMatch[];
  hasMatch: number;
  model: string;
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

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SearchResponse | null>(null);

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
        body: JSON.stringify({ query: trimmed }),
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

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/">
          <span className="brand-mark" aria-hidden />
          <span className="brand-name">Shelf</span>
        </a>
        <p className="brand-meta">Product search with Jev</p>
      </header>

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

        {!loading && result && (
          <>
            <div className="results-header">
              <h2>
                {result.matches.length > 0
                  ? "Matched products"
                  : "No strong matches"}
              </h2>
              <p className="results-meta">
                {result.matches.length > 0
                  ? `${result.matches.length} picks · match confidence ${formatPercent(result.hasMatch)} · ${result.model}`
                  : `Jev found little overlap (${formatPercent(result.hasMatch)}) · ${result.model}`}
              </p>
            </div>

            {result.matches.length === 0 ? (
              <div className="empty-card">
                Nothing in this catalog fits “{result.query}” well enough. Try a
                different need, or broaden the request.
              </div>
            ) : (
              <div className="product-grid">
                {result.matches.map((product, index) => (
                  <article
                    key={product.id}
                    className="product-card"
                    style={{ animationDelay: `${index * 70}ms` }}
                  >
                    <div
                      className="product-visual"
                      style={{ background: product.tone }}
                      aria-hidden
                    >
                      <span className="match-badge">
                        {formatPercent(product.relevance)} match
                      </span>
                      {product.name
                        .split(" ")
                        .slice(0, 2)
                        .map((part) => part[0])
                        .join("")}
                    </div>
                    <div className="product-body">
                      <p className="product-category">{product.category}</p>
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-desc">{product.description}</p>
                      <div className="product-footer">
                        <span className="product-price">
                          {formatPrice(product.price)}
                        </span>
                        <div
                          className="relevance-bar"
                          title={`Relevance ${formatPercent(product.relevance)}`}
                        >
                          <div
                            className="relevance-fill"
                            style={{ width: `${Math.max(product.relevance * 100, 8)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <p className="catalog-note">
        Demo catalog: 36 products. Search uses TypeSafe Jev (one{" "}
        <code>Noul</code> relevance score per product, scored in parallel) so
        results stay tied to your inventory—no hallucinated items.
      </p>
    </main>
  );
}
