import { NextRequest, NextResponse } from "next/server";
import { searchTracks, tracks, vietnamTracks } from "@/lib/music";

export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") ?? "";
  const country = (searchParams.get("country") ?? "VN").toUpperCase();
  const genre = searchParams.get("genre") ?? "";
  const limit = Number(searchParams.get("limit") ?? "50");
  const baseCatalog = country === "ALL" ? tracks : vietnamTracks;
  const genreValue = genre.trim().toLowerCase();

  const filteredByGenre = genreValue
    ? baseCatalog.filter((track) => track.genre?.toLowerCase() === genreValue)
    : baseCatalog;

  const safeLimit = Number.isFinite(limit) ? Math.min(100, Math.max(1, limit)) : 50;
  const result = searchTracks(query, filteredByGenre).slice(0, safeLimit);

  return NextResponse.json({
    dataSource: "local-vietnam-seed-catalog",
    note: "Seed metadata only. Replace this route with a licensed music provider when connecting real backend/audio APIs.",
    query,
    country,
    genre: genre || null,
    total: result.length,
    tracks: result,
  });
}
