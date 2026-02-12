import { useEffect, useState } from "react";
import LeftPanel from "./components/LeftPanel.jsx";
import RightPanel from "./components/RightPanel.jsx";
import SearchDropdown from "./components/SearchDropdown";
import { apiGetRecommendations, apiSearchSongs } from "./lib/api.js";


export default function App() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");

  const [searchResults, setSearchResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  const [mode, setMode] = useState("content");
  const [recommendations, setRecommendations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingRecs, setLoadingRecs] = useState(false);

  const [favorites, setFavorites] = useState(() => new Set());

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0.25);

  // Fake progress animation
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      setProgress((p) => (p >= 1 ? 0 : Math.min(1, p + 0.004)));
    }, 40);
    return () => clearInterval(id);
  }, [isPlaying]);

  // Search while typing
  useEffect(() => {
    const t = setTimeout(async () => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        setLoadingSearch(true);
        const data = await apiSearchSongs(query);
        setSearchResults(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoadingSearch(false);
      }
    }, 350);

    return () => clearTimeout(t);
  }, [query]);

  function toggleFav(key) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  async function onSelectSong(songObj) {
    setSelectedSong(songObj);
    setQuery(songObj.song);
    setSearchResults([]);

    try {
      setLoadingRecs(true);
      setRecommendations([]);

      const recs = await apiGetRecommendations(mode, songObj.song, 12);
      setRecommendations(recs);

      setCurrentIndex(0);

      if (recs.length > 0) {
        setSelectedSong({ song: recs[0].song, artist: recs[0].artist });
        setIsPlaying(true);
        setProgress(0);
      }
    } catch (e) {
      console.log(e);
      alert("Backend error. Check Flask running on port 5000.");
    } finally {
      setLoadingRecs(false);
    }
  }

  function onPlaySong(songObj, idx) {
    setSelectedSong({ song: songObj.song, artist: songObj.artist });
    setCurrentIndex(idx);
    setIsPlaying(true);
    setProgress(0);
  }

  function playNext() {
    if (!recommendations.length) return;

    const nextIndex = (currentIndex + 1) % recommendations.length;
    setCurrentIndex(nextIndex);

    const nextSong = recommendations[nextIndex];
    setSelectedSong({ song: nextSong.song, artist: nextSong.artist });

    setIsPlaying(true);
    setProgress(0);
  }

  function playPrev() {
    if (!recommendations.length) return;

    const prevIndex =
      (currentIndex - 1 + recommendations.length) % recommendations.length;
    setCurrentIndex(prevIndex);

    const prevSong = recommendations[prevIndex];
    setSelectedSong({ song: prevSong.song, artist: prevSong.artist });

    setIsPlaying(true);
    setProgress(0);
  }

  const nowPlaying = selectedSong || { song: "Select a song", artist: "—" };

  return (
    <div className="page">
      <div className="pageGlow" />

      <div className="shell">
        <LeftPanel
          query={query}
          setQuery={setQuery}
          genre={genre}
          setGenre={setGenre}
          mode={mode}
          setMode={setMode}
          loadingSearch={loadingSearch}
          loadingRecs={loadingRecs}
          searchResults={searchResults}
          onSelectSong={onSelectSong}
          recommendations={recommendations}
          favorites={favorites}
          toggleFav={toggleFav}
          currentIndex={currentIndex}
          onPlaySong={onPlaySong}
        />

        <RightPanel
          nowPlaying={nowPlaying}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          progress={progress}
          playPrev={playPrev}
          playNext={playNext}
          favorites={favorites}
          toggleFav={toggleFav}
          mode={mode}
        />
      </div>
    </div>
  );
}
