"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Heart,
  Home,
  Library,
  ListMusic,
  LogOut,
  Mic2,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Repeat2,
  Search,
  Shuffle,
  SkipBack,
  SkipForward,
  User,
  Volume2,
} from "lucide-react";
import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { genres, normalizeSearchValue, playlists, searchCatalog, sessionKey, tracks, type Playlist, type Track, type UserSession } from "@/lib/music";

type TracksApiResponse = {
  total: number;
  tracks: Track[];
};

const navItems = [
  { label: "Home", icon: Home },
  { label: "Search", icon: Search },
  { label: "Your Library", icon: Library },
];

const quickFilters = ["Playlists", "Artists", "Albums", "Downloaded"];
const sessionChangedEvent = "spytifo-session-changed";

function CoverImage({ src, alt, className, priority = false }: { src: string; alt: string; className: string; priority?: boolean }) {
  return <Image src={src} alt={alt} width={900} height={900} priority={priority} sizes="(max-width: 768px) 100vw, 420px" className={className} />;
}

function subscribeToSession(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(sessionChangedEvent, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(sessionChangedEvent, callback);
  };
}

function getSessionSnapshot() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(sessionKey);
}

function emitSessionChanged() {
  window.dispatchEvent(new Event(sessionChangedEvent));
}

function rankTracksForQuery(catalog: Track[], query: string) {
  const value = normalizeSearchValue(query);

  if (!value) {
    return [];
  }

  return [...catalog]
    .filter((track) =>
      [track.title, track.artist, track.album].some((field) => normalizeSearchValue(field).includes(value)),
    )
    .sort((first, second) => {
      const firstTitle = normalizeSearchValue(first.title);
      const secondTitle = normalizeSearchValue(second.title);
      const firstStarts = firstTitle.startsWith(value) ? 0 : 1;
      const secondStarts = secondTitle.startsWith(value) ? 0 : 1;

      if (firstStarts !== secondStarts) {
        return firstStarts - secondStarts;
      }

      return firstTitle.localeCompare(secondTitle);
    });
}

export default function HomePage() {
  const sessionSnapshot = useSyncExternalStore(subscribeToSession, getSessionSnapshot, () => null);
  const session = useMemo(() => (sessionSnapshot ? (JSON.parse(sessionSnapshot) as UserSession) : null), [sessionSnapshot]);

  function handleLogin(nextSession: UserSession) {
    window.localStorage.setItem(sessionKey, JSON.stringify(nextSession));
    emitSessionChanged();
  }

  function handleLogout() {
    window.localStorage.removeItem(sessionKey);
    emitSessionChanged();
  }

  return (
    <AnimatePresence mode="wait">
      {session ? <MusicApp key="app" session={session} onLogout={handleLogout} /> : <LoginScreen key="login" onLogin={handleLogin} />}
    </AnimatePresence>
  );
}

function LoginScreen({ onLogin }: { onLogin: (session: UserSession) => void }) {
  const [email, setEmail] = useState("demo@spytifo.dev");
  const [name, setName] = useState("Demo Listener");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onLogin({ email, name: name || email.split("@")[0] });
  }

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-neutral-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative overflow-hidden bg-black">
          <CoverImage src="https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=1600&q=80" alt="Concert crowd with stage lighting" priority className="absolute inset-0 h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.9),rgba(0,0,0,0.25)),linear-gradient(0deg,rgba(7,7,7,0.95),rgba(7,7,7,0.1))]" />
          <div className="relative flex min-h-screen flex-col justify-between p-6 sm:p-10">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-lg bg-[#1ed760] text-black"><ListMusic size={22} /></div>
              <span className="text-xl font-black">Spytifo</span>
            </div>
            <div className="max-w-2xl pb-10">
              <p className="mb-4 text-sm font-semibold uppercase text-[#1ed760]">Music dashboard</p>
              <h1 className="text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">Spytifo</h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-neutral-200 sm:text-lg">A polished Spotify-style frontend with saved login state, mock music data, and clean API boundaries for the backend phase.</p>
            </div>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center bg-neutral-950 p-6">
          <motion.form initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.12 }} onSubmit={submit} className="w-full max-w-md rounded-lg border border-white/10 bg-neutral-900 p-6 shadow-2xl shadow-black/40">
            <div className="mb-8">
              <p className="text-sm font-semibold text-[#1ed760]">Welcome back</p>
              <h2 className="mt-2 text-3xl font-black">Log in to Spytifo</h2>
            </div>
            <label className="mb-5 block text-sm font-medium text-neutral-200">
              Display name
              <input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-[#1ed760]" placeholder="Your name" />
            </label>
            <label className="mb-6 block text-sm font-medium text-neutral-200">
              Email
              <input value={email} type="email" required onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-[#1ed760]" placeholder="you@example.com" />
            </label>
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1ed760] px-4 py-3 font-bold text-black transition hover:bg-[#3be477]"><User size={18} />Log in</button>
          </motion.form>
        </section>
      </div>
    </motion.main>
  );
}

function MusicApp({ session, onLogout }: { session: UserSession; onLogout: () => void }) {
  const [query, setQuery] = useState("");
  const [activePlaylistId, setActivePlaylistId] = useState(playlists[0].id);
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [liked, setLiked] = useState<Set<string>>(() => new Set([tracks[0].id, tracks[4].id]));
  const [apiTracks, setApiTracks] = useState<Track[]>(tracks.filter((track) => track.country === "VN"));
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const playlistResults = useMemo(() => searchCatalog(query).playlists, [query]);
  const searchSuggestions = useMemo(() => rankTracksForQuery(apiTracks, query).slice(0, 8), [apiTracks, query]);
  const activePlaylist = playlists.find((playlist) => playlist.id === activePlaylistId) ?? playlists[0];

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setIsSearching(true);
      setSearchError("");

      try {
        const params = new URLSearchParams({ country: "VN", limit: "50" });

        if (query.trim()) {
          params.set("q", query.trim());
        }

        const response = await fetch(`/api/tracks?${params.toString()}`, { signal: controller.signal });

        if (!response.ok) {
          throw new Error("Search request failed");
        }

        const payload = (await response.json()) as TracksApiResponse;
        setApiTracks(payload.tracks);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setSearchError("Không tải được danh sách nhạc Việt từ API.");
      } finally {
        if (!controller.signal.aborted) {
          setIsSearching(false);
        }
      }
    }, 250);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  function playTrack(track: Track) {
    setCurrentTrack(track);
    setIsPlaying(true);
  }

  function toggleLiked(trackId: string) {
    setLiked((current) => {
      const next = new Set(current);
      if (next.has(trackId)) {
        next.delete(trackId);
      } else {
        next.add(trackId);
      }
      return next;
    });
  }

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-screen overflow-hidden bg-black text-white">
      <div className="grid h-[calc(100vh-92px)] grid-cols-1 gap-2 p-2 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_340px]">
        <Sidebar activePlaylist={activePlaylist} onSelectPlaylist={setActivePlaylistId} />
        <section className="scrollbar-soft overflow-y-auto rounded-lg bg-neutral-950">
          <Header session={session} query={query} setQuery={setQuery} suggestions={searchSuggestions} isSearching={isSearching} onSelectTrack={playTrack} onLogout={onLogout} />
          <Hero playlist={activePlaylist} onPlay={() => playTrack(activePlaylist.tracks[0])} />
          <div className="space-y-8 px-4 pb-8 sm:px-6">
            <QuickAccess onPlay={playTrack} />
            <PlaylistShelf playlists={playlistResults} activeId={activePlaylistId} onSelect={setActivePlaylistId} />
            <TrackTable tracks={apiTracks} currentTrack={currentTrack} liked={liked} onLike={toggleLiked} onPlay={playTrack} isLoading={isSearching} error={searchError} />
            <GenreGrid />
          </div>
        </section>
        <RightPanel currentTrack={currentTrack} queue={activePlaylist.tracks} onPlay={playTrack} />
      </div>
      <PlayerBar track={currentTrack} isPlaying={isPlaying} liked={liked.has(currentTrack.id)} onPlayPause={() => setIsPlaying((value) => !value)} onLike={() => toggleLiked(currentTrack.id)} />
    </motion.main>
  );
}

function Sidebar({ activePlaylist, onSelectPlaylist }: { activePlaylist: Playlist; onSelectPlaylist: (id: string) => void }) {
  return (
    <aside className="hidden h-full flex-col gap-2 lg:flex">
      <div className="rounded-lg bg-neutral-950 p-4">
        <div className="mb-6 flex items-center gap-3"><div className="grid size-9 place-items-center rounded-lg bg-[#1ed760] text-black"><ListMusic size={20} /></div><span className="text-lg font-black">Spytifo</span></div>
        <nav className="space-y-1">
          {navItems.map((item, index) => (
            <button key={item.label} className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-bold transition ${index === 0 ? "bg-white/10 text-white" : "text-neutral-400 hover:bg-white/5 hover:text-white"}`}><item.icon size={20} />{item.label}</button>
          ))}
        </nav>
      </div>
      <div className="scrollbar-soft flex min-h-0 flex-1 flex-col rounded-lg bg-neutral-950 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm font-bold text-neutral-300"><Library size={20} />Your Library</div>
          <button className="grid size-8 place-items-center rounded-full text-neutral-400 transition hover:bg-white/10 hover:text-white" aria-label="Create playlist"><Plus size={18} /></button>
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {quickFilters.map((filter) => <button key={filter} className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-neutral-200 transition hover:bg-white/15">{filter}</button>)}
        </div>
        <div className="space-y-2 overflow-y-auto pr-1">
          {playlists.map((playlist) => (
            <button key={playlist.id} onClick={() => onSelectPlaylist(playlist.id)} className={`flex w-full items-center gap-3 rounded-lg p-2 text-left transition ${playlist.id === activePlaylist.id ? "bg-white/10" : "hover:bg-white/5"}`}>
              <CoverImage src={playlist.cover} alt={playlist.title} className="size-12 rounded-lg object-cover" />
              <span className="min-w-0"><span className="block truncate text-sm font-semibold">{playlist.title}</span><span className="block truncate text-xs text-neutral-400">Playlist - {playlist.followers}</span></span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function Header({ session, query, setQuery, suggestions, isSearching, onSelectTrack, onLogout }: { session: UserSession; query: string; setQuery: (query: string) => void; suggestions: Track[]; isSearching: boolean; onSelectTrack: (track: Track) => void; onLogout: () => void }) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const normalizedQuery = normalizeSearchValue(query);
  const shouldShowSuggestions = isSearchFocused && normalizedQuery.length > 0;

  return (
    <header className="sticky top-0 z-20 flex flex-col gap-3 border-b border-white/5 bg-neutral-950/90 px-4 py-4 backdrop-blur md:flex-row md:items-center md:justify-between sm:px-6">
      <div className="flex items-center gap-2">
        <button className="grid size-9 place-items-center rounded-full bg-black/80 text-neutral-300 transition hover:text-white" aria-label="Back"><ChevronLeft size={20} /></button>
        <button className="grid size-9 place-items-center rounded-full bg-black/80 text-neutral-300 transition hover:text-white" aria-label="Forward"><ChevronRight size={20} /></button>
      </div>
      <div className="relative w-full md:max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} onFocus={() => setIsSearchFocused(true)} onBlur={() => window.setTimeout(() => setIsSearchFocused(false), 120)} placeholder="Search Vietnamese songs" className="w-full rounded-lg border border-white/10 bg-black py-2.5 pl-10 pr-4 text-sm text-white outline-none transition focus:border-[#1ed760]" />
        <AnimatePresence>
          {shouldShowSuggestions ? (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 8, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="absolute left-0 right-0 top-full z-50 overflow-hidden rounded-lg border border-white/10 bg-neutral-900 shadow-2xl shadow-black/60"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 text-xs font-semibold uppercase text-neutral-500">
                <span>Search suggestions</span>
                <span>{isSearching ? "Loading" : "Starts first"}</span>
              </div>
              <div className="max-h-[360px] overflow-y-auto p-1">
                {suggestions.length > 0 ? (
                  suggestions.map((track, index) => {
                    const startsWithQuery = normalizeSearchValue(track.title).startsWith(normalizedQuery);

                    return (
                      <motion.button
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.025 }}
                        key={`${track.provider ?? "local"}-${track.id}`}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => {
                          onSelectTrack(track);
                          setQuery(track.title);
                          setIsSearchFocused(false);
                        }}
                        className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition hover:bg-white/10"
                      >
                        <CoverImage src={track.cover} alt={track.title} className="size-11 rounded-lg object-cover" />
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="truncate text-sm font-bold text-white">{track.title}</span>
                            {startsWithQuery ? <span className="shrink-0 rounded bg-[#1ed760]/15 px-1.5 py-0.5 text-[10px] font-black uppercase text-[#1ed760]">Top</span> : null}
                          </span>
                          <span className="block truncate text-xs text-neutral-400">{track.artist} - {track.album}</span>
                        </span>
                        <Play size={16} className="text-neutral-500" fill="currentColor" />
                      </motion.button>
                    );
                  })
                ) : (
                  <div className="px-3 py-6 text-sm text-neutral-400">Không tìm thấy bài phù hợp.</div>
                )}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-between gap-3 md:justify-end">
        <button className="grid size-9 place-items-center rounded-full bg-black/80 text-neutral-300 transition hover:text-white" aria-label="Notifications"><Bell size={18} /></button>
        <div className="flex items-center gap-2 rounded-lg bg-black px-2 py-1.5"><span className="grid size-7 place-items-center rounded-full bg-[#1ed760] text-xs font-black text-black">{session.name.slice(0, 1).toUpperCase()}</span><span className="hidden max-w-32 truncate text-sm font-bold sm:block">{session.name}</span></div>
        <button onClick={onLogout} className="grid size-9 place-items-center rounded-full bg-black/80 text-neutral-300 transition hover:text-white" aria-label="Log out"><LogOut size={18} /></button>
      </div>
    </header>
  );
}

function Hero({ playlist, onPlay }: { playlist: Playlist; onPlay: () => void }) {
  return (
    <section className={`bg-gradient-to-b ${playlist.color} px-4 py-6 sm:px-6`}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end">
        <motion.img layoutId={`playlist-${playlist.id}`} src={playlist.cover} alt={playlist.title} className="size-44 rounded-lg object-cover shadow-2xl shadow-black/40 sm:size-52" />
        <div className="min-w-0 pb-2"><p className="text-sm font-bold uppercase text-white/80">Playlist</p><h1 className="mt-2 text-5xl font-black leading-none sm:text-6xl lg:text-7xl">{playlist.title}</h1><p className="mt-4 max-w-2xl text-sm leading-6 text-white/85 sm:text-base">{playlist.description}</p><div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-semibold text-white/85"><span>Spytifo</span><span>{playlist.followers} saves</span><span>{playlist.tracks.length} songs</span></div></div>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <button onClick={onPlay} className="grid size-14 place-items-center rounded-full bg-[#1ed760] text-black shadow-lg shadow-black/30 transition hover:scale-105" aria-label="Play playlist"><Play size={26} fill="currentColor" /></button>
        <button className="grid size-11 place-items-center rounded-full text-white transition hover:bg-white/10" aria-label="Save playlist"><Heart size={24} /></button>
        <button className="grid size-11 place-items-center rounded-full text-white transition hover:bg-white/10" aria-label="More options"><MoreHorizontal size={24} /></button>
      </div>
    </section>
  );
}

function QuickAccess({ onPlay }: { onPlay: (track: Track) => void }) {
  return (
    <section>
      <SectionTitle title="Good evening" />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {tracks.slice(0, 6).map((track) => (
          <motion.button whileHover={{ y: -2 }} key={track.id} onClick={() => onPlay(track)} className="group flex h-20 items-center gap-3 overflow-hidden rounded-lg bg-white/10 text-left transition hover:bg-white/15">
            <CoverImage src={track.cover} alt={track.title} className="h-20 w-20 object-cover" />
            <span className="min-w-0 flex-1 pr-2"><span className="block truncate text-sm font-bold">{track.title}</span><span className="block truncate text-xs text-neutral-400">{track.artist}</span></span>
            <span className="mr-3 grid size-10 place-items-center rounded-full bg-[#1ed760] text-black opacity-0 shadow-lg transition group-hover:opacity-100"><Play size={18} fill="currentColor" /></span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

function PlaylistShelf({ playlists: shelfPlaylists, activeId, onSelect }: { playlists: Playlist[]; activeId: string; onSelect: (id: string) => void }) {
  return (
    <section>
      <SectionTitle title="Made for you" action="Show all" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 2xl:grid-cols-4">
        {shelfPlaylists.map((playlist) => (
          <motion.button whileHover={{ y: -4 }} key={playlist.id} onClick={() => onSelect(playlist.id)} className={`group rounded-lg p-3 text-left transition ${playlist.id === activeId ? "bg-white/15" : "bg-white/5 hover:bg-white/10"}`}>
            <div className="relative aspect-square overflow-hidden rounded-lg"><motion.img layoutId={`playlist-${playlist.id}`} src={playlist.cover} alt={playlist.title} className="h-full w-full object-cover" /><span className="absolute bottom-2 right-2 grid size-11 place-items-center rounded-full bg-[#1ed760] text-black opacity-0 shadow-lg transition group-hover:opacity-100"><Play size={20} fill="currentColor" /></span></div>
            <h3 className="mt-3 truncate text-sm font-bold">{playlist.title}</h3><p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-400">{playlist.description}</p>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

function TrackTable({ tracks: tableTracks, currentTrack, liked, onLike, onPlay, isLoading, error }: { tracks: Track[]; currentTrack: Track; liked: Set<string>; onLike: (id: string) => void; onPlay: (track: Track) => void; isLoading: boolean; error: string }) {
  return (
    <section>
      <SectionTitle title="Vietnam tracks" action={isLoading ? "Searching" : `${tableTracks.length} songs`} />
      <div className="overflow-hidden rounded-lg border border-white/10">
        <div className="hidden grid-cols-[48px_minmax(0,1.5fr)_minmax(0,1fr)_84px_56px] border-b border-white/10 px-4 py-3 text-xs font-semibold uppercase text-neutral-500 md:grid"><span>#</span><span>Title</span><span>Album</span><span className="flex items-center justify-end"><Clock3 size={15} /></span><span /></div>
        {error ? <div className="border-b border-white/10 px-4 py-3 text-sm text-rose-300">{error}</div> : null}
        {!error && !isLoading && tableTracks.length === 0 ? <div className="px-4 py-8 text-sm text-neutral-400">Không tìm thấy bài nhạc Việt phù hợp.</div> : null}
        <div className="divide-y divide-white/5">
          {tableTracks.map((track, index) => (
            <div key={track.id} className={`grid grid-cols-[1fr_auto] gap-3 px-3 py-3 transition hover:bg-white/5 md:grid-cols-[48px_minmax(0,1.5fr)_minmax(0,1fr)_84px_56px] md:items-center md:px-4 ${currentTrack.id === track.id ? "bg-[#1ed760]/10" : ""}`}>
              <button onClick={() => onPlay(track)} className="hidden size-8 place-items-center rounded-full text-sm text-neutral-400 transition hover:bg-white/10 hover:text-white md:grid" aria-label={`Play ${track.title}`}>{currentTrack.id === track.id ? <Play size={16} fill="currentColor" /> : index + 1}</button>
              <button onClick={() => onPlay(track)} className="flex min-w-0 items-center gap-3 text-left"><CoverImage src={track.cover} alt={track.title} className="size-11 rounded-lg object-cover" /><span className="min-w-0"><span className={`block truncate text-sm font-semibold ${currentTrack.id === track.id ? "text-[#1ed760]" : "text-white"}`}>{track.title}</span><span className="block truncate text-xs text-neutral-400">{track.artist}</span></span></button>
              <span className="hidden truncate text-sm text-neutral-400 md:block">{track.album}</span><span className="hidden text-right text-sm text-neutral-400 md:block">{track.duration}</span>
              <button onClick={() => onLike(track.id)} className="grid size-9 place-items-center rounded-full text-neutral-400 transition hover:bg-white/10 hover:text-white" aria-label={`Like ${track.title}`}><Heart size={18} className={liked.has(track.id) ? "fill-[#1ed760] text-[#1ed760]" : ""} /></button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GenreGrid() {
  const colors = ["bg-emerald-600", "bg-orange-600", "bg-cyan-600", "bg-rose-600", "bg-lime-600", "bg-zinc-700", "bg-sky-600", "bg-fuchsia-700"];
  return <section><SectionTitle title="Browse genres" /><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{genres.map((genre, index) => <motion.button whileHover={{ y: -2 }} key={genre} className={`${colors[index % colors.length]} relative h-28 overflow-hidden rounded-lg p-4 text-left font-black`}>{genre}<span className="absolute -bottom-6 -right-5 grid size-24 rotate-12 place-items-center rounded-lg bg-black/25"><Mic2 size={34} /></span></motion.button>)}</div></section>;
}

function RightPanel({ currentTrack, queue, onPlay }: { currentTrack: Track; queue: Track[]; onPlay: (track: Track) => void }) {
  return (
    <aside className="hidden h-full overflow-y-auto rounded-lg bg-neutral-950 p-4 xl:block">
      <div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-black">Now playing</h2><button className="grid size-8 place-items-center rounded-full text-neutral-400 transition hover:bg-white/10 hover:text-white" aria-label="More options"><MoreHorizontal size={20} /></button></div>
      <CoverImage src={currentTrack.cover} alt={currentTrack.title} className="aspect-square w-full rounded-lg object-cover" />
      <div className="mt-4"><h3 className="truncate text-2xl font-black">{currentTrack.title}</h3><p className="mt-1 truncate text-sm text-neutral-400">{currentTrack.artist}</p></div>
      <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
        <div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-bold">Up next</h3><ListMusic size={18} className="text-neutral-400" /></div>
        <div className="space-y-2">{queue.map((track) => <button key={track.id} onClick={() => onPlay(track)} className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition hover:bg-white/10"><CoverImage src={track.cover} alt={track.title} className="size-10 rounded-lg object-cover" /><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{track.title}</span><span className="block truncate text-xs text-neutral-500">{track.artist}</span></span><span className="text-xs text-neutral-500">{track.duration}</span></button>)}</div>
      </div>
    </aside>
  );
}

function PlayerBar({ track, isPlaying, liked, onPlayPause, onLike }: { track: Track; isPlaying: boolean; liked: boolean; onPlayPause: () => void; onLike: () => void }) {
  return (
    <footer className="grid h-[92px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-white/10 bg-black px-3 text-white md:grid-cols-[minmax(0,1fr)_minmax(320px,520px)_minmax(0,1fr)] md:px-4">
      <div className="flex min-w-0 items-center gap-3"><CoverImage src={track.cover} alt={track.title} className="size-14 rounded-lg object-cover" /><div className="min-w-0"><p className="truncate text-sm font-bold">{track.title}</p><p className="truncate text-xs text-neutral-400">{track.artist}</p></div><button onClick={onLike} className="hidden size-9 place-items-center rounded-full text-neutral-400 transition hover:bg-white/10 hover:text-white sm:grid" aria-label="Like current track"><Heart size={18} className={liked ? "fill-[#1ed760] text-[#1ed760]" : ""} /></button></div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2"><button className="hidden size-9 place-items-center rounded-full text-neutral-400 transition hover:text-white sm:grid" aria-label="Shuffle"><Shuffle size={17} /></button><button className="grid size-9 place-items-center rounded-full text-neutral-300 transition hover:text-white" aria-label="Previous"><SkipBack size={19} /></button><button onClick={onPlayPause} className="grid size-11 place-items-center rounded-full bg-white text-black transition hover:scale-105" aria-label={isPlaying ? "Pause" : "Play"}>{isPlaying ? <Pause size={21} fill="currentColor" /> : <Play size={21} fill="currentColor" />}</button><button className="grid size-9 place-items-center rounded-full text-neutral-300 transition hover:text-white" aria-label="Next"><SkipForward size={19} /></button><button className="hidden size-9 place-items-center rounded-full text-neutral-400 transition hover:text-white sm:grid" aria-label="Repeat"><Repeat2 size={17} /></button></div>
        <div className="hidden w-full items-center gap-2 text-xs text-neutral-500 md:flex"><span>1:18</span><div className="h-1 flex-1 overflow-hidden rounded-full bg-neutral-700"><div className="h-full w-[38%] rounded-full bg-white" /></div><span>{track.duration}</span></div>
      </div>
      <div className="hidden items-center justify-end gap-3 text-neutral-400 md:flex"><ListMusic size={18} /><Volume2 size={18} /><div className="h-1 w-28 overflow-hidden rounded-full bg-neutral-700"><div className="h-full w-2/3 rounded-full bg-white" /></div></div>
    </footer>
  );
}

function SectionTitle({ title, action }: { title: string; action?: string }) {
  return <div className="mb-4 flex items-center justify-between gap-3"><h2 className="text-2xl font-black">{title}</h2>{action ? <button className="text-xs font-bold uppercase text-neutral-400 transition hover:text-white">{action}</button> : null}</div>;
}
