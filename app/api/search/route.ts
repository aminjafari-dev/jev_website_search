import { searchProducts } from "@/lib/search";
import { normalizeSearchSettings, type SearchSettings } from "@/lib/settings";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type SearchBody = {
  query?: unknown;
  settings?: Partial<SearchSettings>;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SearchBody;
    const query = typeof body.query === "string" ? body.query : "";

    if (!query.trim()) {
      return NextResponse.json(
        { error: "Please describe what you are looking for." },
        { status: 400 },
      );
    }

    const settings = normalizeSearchSettings(body.settings);
    const result = await searchProducts(query, settings);
    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Search failed unexpectedly.";
    const status = message.includes("TYPESAFE_API_KEY") ? 500 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
