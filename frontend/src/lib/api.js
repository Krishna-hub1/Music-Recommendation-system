import axios from "axios";

export const API_BASE = "http://127.0.0.1:5000";

export async function apiSearchSongs(query) {
  const res = await axios.get(`${API_BASE}/api/search?q=${query}`);
  return res.data || [];
}

export async function apiGetRecommendations(mode, songName, n = 10) {
  const endpoint =
    mode === "content"
      ? "/api/recommend/content"
      : "/api/recommend/collaborative";

  const url = `${API_BASE}${endpoint}?song=${encodeURIComponent(songName)}&n=${n}`;
  const res = await axios.get(url);
  return res.data || [];
}
