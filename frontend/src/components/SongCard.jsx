import { Heart, Music2, Play } from "lucide-react";

export default function SongCard({
  song,
  artist,
  score,
  isFav,
  onToggleFav,
  onPlay,
  isActive,
}) {
  return (
    <div className={isActive ? "card active" : "card"}>
      <div className="cover">
        <div className="coverGlow" />
        <Music2 className="coverIcon" />
      </div>

      <div className="cardBody">
        <div className="cardTop">
          <div>
            <div className="songName">{song}</div>
            <div className="artistName">{artist}</div>
          </div>

          <button
            className={isFav ? "heart active" : "heart"}
            onClick={onToggleFav}
            title="Like"
          >
            <Heart size={18} />
          </button>
        </div>

        <div className="scoreRow">
          <div className="scoreBar">
            <div
              className="scoreFill"
              style={{ width: `${Math.round((score || 0) * 100)}%` }}
            />
          </div>
          <div className="scoreText">{(score || 0).toFixed(3)}</div>
        </div>

        <button className="playMini" onClick={onPlay}>
          <Play size={16} />
          Play
        </button>
      </div>
    </div>
  );
}
