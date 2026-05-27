export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
  accent: string;
  genre?: string;
  country?: "VN" | "GLOBAL";
  year?: number;
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

export const vietnamTracks: Track[] = [
  {
    id: "vn1",
    title: "Hãy Trao Cho Anh",
    artist: "Sơn Tùng M-TP, Snoop Dogg",
    album: "Hãy Trao Cho Anh",
    duration: "4:06",
    cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80",
    accent: "#1db954",
    genre: "V-Pop",
    country: "VN",
    year: 2019,
  },
  {
    id: "vn2",
    title: "Chúng Ta Của Hiện Tại",
    artist: "Sơn Tùng M-TP",
    album: "Chúng Ta Của Hiện Tại",
    duration: "5:01",
    cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=600&q=80",
    accent: "#22c55e",
    genre: "V-Pop",
    country: "VN",
    year: 2020,
  },
  {
    id: "vn3",
    title: "Nơi Này Có Anh",
    artist: "Sơn Tùng M-TP",
    album: "Nơi Này Có Anh",
    duration: "4:20",
    cover: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?auto=format&fit=crop&w=600&q=80",
    accent: "#38bdf8",
    genre: "V-Pop",
    country: "VN",
    year: 2017,
  },
  {
    id: "vn4",
    title: "See Tình",
    artist: "Hoàng Thùy Linh",
    album: "LINK",
    duration: "3:05",
    cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80",
    accent: "#f97316",
    genre: "Dance Pop",
    country: "VN",
    year: 2022,
  },
  {
    id: "vn5",
    title: "Để Mị Nói Cho Mà Nghe",
    artist: "Hoàng Thùy Linh",
    album: "Hoàng",
    duration: "3:29",
    cover: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?auto=format&fit=crop&w=600&q=80",
    accent: "#eab308",
    genre: "Dance Pop",
    country: "VN",
    year: 2019,
  },
  {
    id: "vn6",
    title: "Bên Trên Tầng Lầu",
    artist: "Tăng Duy Tân",
    album: "Bên Trên Tầng Lầu",
    duration: "3:14",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80",
    accent: "#06b6d4",
    genre: "V-Pop",
    country: "VN",
    year: 2022,
  },
  {
    id: "vn7",
    title: "Cắt Đôi Nỗi Sầu",
    artist: "Tăng Duy Tân",
    album: "Cắt Đôi Nỗi Sầu",
    duration: "3:21",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80",
    accent: "#a3e635",
    genre: "V-Pop",
    country: "VN",
    year: 2023,
  },
  {
    id: "vn8",
    title: "Waiting For You",
    artist: "MONO, Onionn",
    album: "22",
    duration: "4:25",
    cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
    accent: "#14b8a6",
    genre: "R&B",
    country: "VN",
    year: 2022,
  },
  {
    id: "vn9",
    title: "Em Là",
    artist: "MONO, Onionn",
    album: "22",
    duration: "3:18",
    cover: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80",
    accent: "#10b981",
    genre: "R&B",
    country: "VN",
    year: 2022,
  },
  {
    id: "vn10",
    title: "Mang Tiền Về Cho Mẹ",
    artist: "Đen, Nguyên Thảo",
    album: "Mang Tiền Về Cho Mẹ",
    duration: "6:46",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80",
    accent: "#84cc16",
    genre: "Rap Việt",
    country: "VN",
    year: 2021,
  },
  {
    id: "vn11",
    title: "Đi Về Nhà",
    artist: "Đen, JustaTee",
    album: "Đi Về Nhà",
    duration: "3:20",
    cover: "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=600&q=80",
    accent: "#65a30d",
    genre: "Rap Việt",
    country: "VN",
    year: 2020,
  },
  {
    id: "vn12",
    title: "Anh Đếch Cần Gì Nhiều Ngoài Em",
    artist: "Đen, Vũ., Thành Đồng",
    album: "Anh Đếch Cần Gì Nhiều Ngoài Em",
    duration: "3:37",
    cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80",
    accent: "#facc15",
    genre: "Rap Việt",
    country: "VN",
    year: 2018,
  },
  {
    id: "vn13",
    title: "Một Bước Yêu Vạn Dặm Đau",
    artist: "Mr. Siro",
    album: "Một Bước Yêu Vạn Dặm Đau",
    duration: "5:26",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    accent: "#0284c7",
    genre: "Ballad",
    country: "VN",
    year: 2019,
  },
  {
    id: "vn14",
    title: "Ngày Mai Người Ta Lấy Chồng",
    artist: "Thành Đạt",
    album: "Ngày Mai Người Ta Lấy Chồng",
    duration: "5:07",
    cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=600&q=80",
    accent: "#0ea5e9",
    genre: "Ballad",
    country: "VN",
    year: 2023,
  },
  {
    id: "vn15",
    title: "Có Chàng Trai Viết Lên Cây",
    artist: "Phan Mạnh Quỳnh",
    album: "Mắt Biếc",
    duration: "5:10",
    cover: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?auto=format&fit=crop&w=600&q=80",
    accent: "#0891b2",
    genre: "Ballad",
    country: "VN",
    year: 2019,
  },
  {
    id: "vn16",
    title: "Hơn Cả Yêu",
    artist: "Đức Phúc",
    album: "Hơn Cả Yêu",
    duration: "5:37",
    cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
    accent: "#f43f5e",
    genre: "Ballad",
    country: "VN",
    year: 2020,
  },
  {
    id: "vn17",
    title: "Sóng Gió",
    artist: "Jack, K-ICM",
    album: "Sóng Gió",
    duration: "4:14",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80",
    accent: "#fb7185",
    genre: "V-Pop",
    country: "VN",
    year: 2019,
  },
  {
    id: "vn18",
    title: "Bạc Phận",
    artist: "Jack, K-ICM",
    album: "Bạc Phận",
    duration: "4:08",
    cover: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?auto=format&fit=crop&w=600&q=80",
    accent: "#ef4444",
    genre: "V-Pop",
    country: "VN",
    year: 2019,
  },
  {
    id: "vn19",
    title: "Thích Em Hơi Nhiều",
    artist: "Wren Evans",
    album: "Thích Em Hơi Nhiều",
    duration: "2:52",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80",
    accent: "#ec4899",
    genre: "Indie Pop",
    country: "VN",
    year: 2021,
  },
  {
    id: "vn20",
    title: "Từng Quen",
    artist: "Wren Evans",
    album: "Từng Quen",
    duration: "2:47",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80",
    accent: "#d946ef",
    genre: "Indie Pop",
    country: "VN",
    year: 2023,
  },
];

export const tracks: Track[] = [
  ...vietnamTracks,
  {
    id: "t1",
    title: "Neon City Drive",
    artist: "Mira Lane",
    album: "After Hours Maps",
    duration: "3:42",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80",
    accent: "#1db954",
    genre: "Pop",
    country: "GLOBAL",
  },
  {
    id: "t2",
    title: "Late Train Home",
    artist: "Aster North",
    album: "Platform 8",
    duration: "4:08",
    cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
    accent: "#34d399",
    genre: "Indie",
    country: "GLOBAL",
  },
  {
    id: "t3",
    title: "Velvet Signal",
    artist: "Kairo Bloom",
    album: "Soft Static",
    duration: "2:57",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80",
    accent: "#f97316",
    genre: "Electronic",
    country: "GLOBAL",
  },
  {
    id: "t4",
    title: "Moonlit Version",
    artist: "June Atlas",
    album: "Quiet Lines",
    duration: "3:19",
    cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80",
    accent: "#06b6d4",
    genre: "Acoustic",
    country: "GLOBAL",
  },
  {
    id: "t5",
    title: "Deep Green Room",
    artist: "The Low Notes",
    album: "Basement Sessions",
    duration: "5:01",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80",
    accent: "#84cc16",
    genre: "R&B",
    country: "GLOBAL",
  },
  {
    id: "t6",
    title: "Glass Coast",
    artist: "Soma Vale",
    album: "Shoreline Keys",
    duration: "3:33",
    cover: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?auto=format&fit=crop&w=600&q=80",
    accent: "#38bdf8",
    genre: "Rock",
    country: "GLOBAL",
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

export const genres = ["V-Pop", "Ballad", "Rap Việt", "Dance Pop", "R&B", "Indie Pop", "Acoustic", "Rock"];

export function normalizeSearchValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

export function searchTracks(query: string, catalog: Track[] = tracks) {
  const value = normalizeSearchValue(query);

  if (!value) {
    return catalog;
  }

  return catalog.filter((track) =>
    [track.title, track.artist, track.album, track.genre ?? "", track.country ?? ""].some((field) =>
      normalizeSearchValue(field).includes(value),
    ),
  );
}

export function searchCatalog(query: string) {
  const value = query.trim().toLowerCase();

  if (!value) {
    return { tracks, playlists };
  }

  return {
    tracks: searchTracks(query),
    playlists: playlists.filter((playlist) =>
      [playlist.title, playlist.description].some((field) => field.toLowerCase().includes(value)),
    ),
  };
}
