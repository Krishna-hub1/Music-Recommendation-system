import { useEffect } from "react";
import { Search, Sparkles, Users } from "lucide-react";
import SearchDropdown from "./SearchDropdown";
import SongCard from "./SongCard";

const GENRES = ["All", "Pop", "Rock", "Hip-Hop", "Electronic", "Jazz"];

export default function LeftPanel({
  query,
  setQuery,
  genre,
  setGenre,
  mode,
  setMode,
  loadingSearch,
  loadingRecs,
  searchResults,
  onSelectSong,
  recommendations,
  favorites,
  toggleFav,
  currentIndex,
  onPlaySong,
}) {
  // close dropdown when query is empty
  useEffect(() => {
    if (!query.trim()) return;
  }, [query]);

  return (
    <section className="panel left">
      <header className="panelHeader">
        <h1>Discover Songs</h1>
        <div className="divider" />
      </header>

      {/* Search + Mode */}
      <div className="searchRow">
        <div className="searchBox">
          <Search size={18} className="iconDim" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for songs..."
          />
          <span className="pill">{loadingSearch ? "Searching…" : "Enter"}</span>
        </div>

        <div className="modeToggle">
          <button
            className={mode === "content" ? "active" : ""}
            onClick={() => setMode("content")}
            title="Content Based"
          >
            <Sparkles size={16} />
          </button>

          <button
            className={mode === "collaborative" ? "active" : ""}
            onClick={() => setMode("collaborative")}
            title="Collaborative (KNN)"
          >
            <Users size={16} />
          </button>
        </div>

        <SearchDropdown results={searchResults} onSelect={onSelectSong} />
      </div>

      {/* Genre */}
      <div className="chips">
        {GENRES.map((g) => (
          <button
            key={g}
            className={g === genre ? "chip active" : "chip"}
            onClick={() => setGenre(g)}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Recommendations */}
      <div className="sectionTitle">
        <span>Recommended for You</span>
        <div className="divider" />
      </div>

      <div className="grid">
        {loadingRecs && (
          <div className="emptyState">
            <div className="spinner" />
            <p>Generating recommendations…</p>
          </div>
        )}

        {!loadingRecs && recommendations.length === 0 && (
          <div className="emptyState">
            <p>Search and select a song to get recommendations.</p>
          </div>
        )}

        {!loadingRecs &&
          recommendations.map((r, idx) => {
            const key = `${r.song}-${r.artist}`;
            const fav = favorites.has(key);

            return (
              <SongCard
                key={idx}
                song={r.song}
                artist={r.artist}
                score={r.score}
                isFav={fav}
                isActive={idx === currentIndex}
                onToggleFav={() => toggleFav(key)}
                onPlay={() => onPlaySong(r, idx)}
              />
            );
          })}
      </div>
    </section>
  );
}
