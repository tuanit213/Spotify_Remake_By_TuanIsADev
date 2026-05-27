import { NextRequest, NextResponse } from "next/server";
import { normalizeSearchValue, searchTracks, tracks, vietnamTracks, type Track } from "@/lib/music";

export const dynamic = "force-dynamic";

type ITunesTrack = {
  wrapperType?: string;
  kind?: string;
  trackId: number;
  trackName?: string;
  artistName?: string;
  collectionName?: string;
  trackTimeMillis?: number;
  artworkUrl100?: string;
  primaryGenreName?: string;
  releaseDate?: string;
  previewUrl?: string;
  trackViewUrl?: string;
};

type ITunesResponse = {
  resultCount: number;
  results: ITunesTrack[];
};

function formatDuration(milliseconds?: number) {
  if (!milliseconds) {
    return "0:00";
  }

  const totalSeconds = Math.round(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${minutes}:${seconds}`;
}

function upgradeArtwork(url?: string) {
  return url?.replace("100x100bb", "600x600bb") ?? "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80";
}

function mapITunesTrack(track: ITunesTrack): Track {
  return {
    id: `itunes-${track.trackId}`,
    title: track.trackName ?? "Unknown track",
    artist: track.artistName ?? "Unknown artist",
    album: track.collectionName ?? "Single",
    duration: formatDuration(track.trackTimeMillis),
    cover: upgradeArtwork(track.artworkUrl100),
    accent: "#1db954",
    genre: track.primaryGenreName ?? "Music",
    country: "VN",
    year: track.releaseDate ? new Date(track.releaseDate).getFullYear() : undefined,
    previewUrl: track.previewUrl,
    sourceUrl: track.trackViewUrl,
    provider: "itunes",
  };
}

async function searchITunesVietnam(query: string, limit: number) {
  if (query.trim().length < 2) {
    return [];
  }

  const params = new URLSearchParams({
    term: query,
    country: "VN",
    media: "music",
    entity: "song",
    limit: String(limit),
  });

  const response = await fetch(`https://itunes.apple.com/search?${params.toString()}`, {
    next: { revalidate: 60 * 60 },
  });

  if (!response.ok) {
    return [];
  }

  const payload = (await response.json()) as ITunesResponse;

  return payload.results
    .filter((item) => item.wrapperType === "track" && item.kind === "song")
    .map(mapITunesTrack);
}

function dedupeTracks(catalog: Track[]) {
  const seen = new Set<string>();

  return catalog.filter((track) => {
    const key = `${normalizeSearchValue(track.title)}-${normalizeSearchValue(track.artist)}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") ?? "";
  const country = (searchParams.get("country") ?? "VN").toUpperCase();
  const genre = searchParams.get("genre") ?? "";
  const provider = (searchParams.get("provider") ?? "hybrid").toLowerCase();
  const limit = Number(searchParams.get("limit") ?? "50");
  const baseCatalog = country === "ALL" ? tracks : vietnamTracks;
  const genreValue = genre.trim().toLowerCase();

  const filteredByGenre = genreValue
    ? baseCatalog.filter((track) => track.genre?.toLowerCase() === genreValue)
    : baseCatalog;

  const safeLimit = Number.isFinite(limit) ? Math.min(100, Math.max(1, limit)) : 50;
  const localResults = searchTracks(query, filteredByGenre);
  const liveResults = provider === "local" ? [] : await searchITunesVietnam(query, safeLimit);
  const result = dedupeTracks([...localResults, ...liveResults]).slice(0, safeLimit);

  return NextResponse.json({
    dataSource: provider === "local" ? "local-vietnam-seed-catalog" : "local-seed-plus-itunes-vn-search",
    note: "Live search uses the public iTunes Search API for Vietnam storefront metadata/previews. For a complete licensed catalog, connect Spotify/Apple Music/Zing/YouTube Music through a backend provider agreement.",
    query,
    country,
    genre: genre || null,
    provider,
    total: result.length,
    tracks: result,
  });
}
