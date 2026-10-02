import { searchProducts } from "@/lib/search";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { query?: unknown };
    const query = typeof body.query === "string" ? body.query : "";

    if (!query.trim()) {
      return NextResponse.json(
        { error: "Please describe what you are looking for." },
        { status: 400 },
      );
    }

    const result = await searchProducts(query);
    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Search failed unexpectedly.";
    const status = message.includes("TYPESAFE_API_KEY") ? 500 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
