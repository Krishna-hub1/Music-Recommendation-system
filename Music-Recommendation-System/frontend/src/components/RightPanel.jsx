import { Heart, Music2 } from "lucide-react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

export default function RightPanel({
  nowPlaying,
  isPlaying,
  setIsPlaying,
  progress,
  playPrev,
  playNext,
  favorites,
  toggleFav,
  mode,
}) {
  const key = `${nowPlaying.song}-${nowPlaying.artist}`;
  const fav = favorites.has(key);

  return (
    <section className="panel right">
      <header className="panelHeader">
        <h1>Now Playing</h1>
        <div className="divider" />
      </header>

      <div className="nowCard">
        <div className="nowCover">
          <div className="nowGlow" />
          <Music2 className="nowIcon" />
        </div>

        <div className="nowMeta">
          <div className="nowSong">{nowPlaying.song}</div>
          <div className="nowArtist">{nowPlaying.artist}</div>
        </div>

        <div className="wave">
          {Array.from({ length: 32 }).map((_, i) => (
            <span
              key={i}
              style={{
                height: `${10 + (i % 8) * 6}px`,
                animationDelay: `${i * 0.03}s`,
                opacity: isPlaying ? 1 : 0.35,
              }}
            />
          ))}
        </div>

        <div className="controls">
          <button className="ctrlBtn" onClick={playPrev}>
            <SkipBack />
          </button>

          <button className="ctrlBtn main" onClick={() => setIsPlaying((p) => !p)}>
            {isPlaying ? <Pause /> : <Play />}
          </button>

          <button className="ctrlBtn" onClick={playNext}>
            <SkipForward />
          </button>
        </div>

        <div className="timeline">
          <div className="time">1:24</div>
          <div className="track">
            <div className="trackFill" style={{ width: `${progress * 100}%` }} />
          </div>
          <div className="time">3:45</div>
        </div>

        <div className="actions">
          <button
            className={fav ? "actionBtn heartActive" : "actionBtn"}
            onClick={() => toggleFav(key)}
          >
            <Heart size={18} />
          </button>

          <button className="actionBtn">
            <Music2 size={18} />
          </button>
        </div>
      </div>

      <div className="note">
        Mode: <b>{mode === "content" ? "Content-Based (TF-IDF)" : "KNN Based"}</b>
      </div>
    </section>
  );
}
