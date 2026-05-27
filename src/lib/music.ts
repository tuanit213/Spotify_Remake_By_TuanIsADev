export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
  accent: string;
};

export type Playlist = {
  id: string;
  title: string;
  description: string;
  cover: string;
  followers: string;
  color: string;
  tracks: Track[];
};

export type UserSession = {
  name: string;
  email: string;
};

export const sessionKey = "spytifo.session";

export const tracks: Track[] = [
  {
    id: "t1",
    title: "Neon City Drive",
    artist: "Mira Lane",
    album: "After Hours Maps",
    duration: "3:42",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80",
    accent: "#1db954",
  },
  {
    id: "t2",
    title: "Late Train Home",
    artist: "Aster North",
    album: "Platform 8",
    duration: "4:08",
    cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
    accent: "#34d399",
  },
  {
    id: "t3",
    title: "Velvet Signal",
    artist: "Kairo Bloom",
    album: "Soft Static",
    duration: "2:57",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80",
    accent: "#f97316",
  },
  {
    id: "t4",
    title: "Moonlit Version",
    artist: "June Atlas",
    album: "Quiet Lines",
    duration: "3:19",
    cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80",
    accent: "#06b6d4",
  },
  {
    id: "t5",
    title: "Deep Green Room",
    artist: "The Low Notes",
    album: "Basement Sessions",
    duration: "5:01",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80",
    accent: "#84cc16",
  },
  {
    id: "t6",
    title: "Glass Coast",
    artist: "Soma Vale",
    album: "Shoreline Keys",
    duration: "3:33",
    cover: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?auto=format&fit=crop&w=600&q=80",
    accent: "#38bdf8",
  },
];

export const playlists: Playlist[] = [
  {
    id: "p1",
    title: "Daily Pulse",
    description: "Fresh pop, indie, and electronic tracks for focused work.",
    cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    followers: "1.8M",
    color: "from-emerald-500 to-cyan-500",
    tracks: tracks.slice(0, 4),
  },
  {
    id: "p2",
    title: "Night Ride",
    description: "Low-lit synths, soft bass, and late drive energy.",
    cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80",
    followers: "842K",
    color: "from-orange-500 to-rose-500",
    tracks: [tracks[2], tracks[0], tracks[5], tracks[3]],
  },
  {
    id: "p3",
    title: "Acoustic Desk",
    description: "Warm vocals and calm guitars for long sessions.",
    cover: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?auto=format&fit=crop&w=800&q=80",
    followers: "529K",
    color: "from-lime-500 to-emerald-500",
    tracks: [tracks[1], tracks[3], tracks[4]],
  },
  {
    id: "p4",
    title: "Studio Selects",
    description: "Polished beats and modern R&B from the edit room.",
    cover: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
    followers: "318K",
    color: "from-sky-500 to-emerald-400",
    tracks: [tracks[5], tracks[4], tracks[2], tracks[0]],
  },
];

export const genres = ["Pop", "Hip-Hop", "Electronic", "Indie", "R&B", "Lo-fi", "Acoustic", "Rock"];

export function searchCatalog(query: string) {
  const value = query.trim().toLowerCase();

  if (!value) {
    return { tracks, playlists };
  }

  return {
    tracks: tracks.filter((track) =>
      [track.title, track.artist, track.album].some((field) => field.toLowerCase().includes(value)),
    ),
    playlists: playlists.filter((playlist) =>
      [playlist.title, playlist.description].some((field) => field.toLowerCase().includes(value)),
    ),
  };
}
