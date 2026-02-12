from sklearn.neighbors import NearestNeighbors
from sklearn.feature_extraction.text import TfidfVectorizer
from fuzzywuzzy import fuzz
import numpy as np

class KNNRecommender:
    def __init__(self, df):
        self.df = df
        self.vectorizer = TfidfVectorizer(stop_words="english", max_features=10000)
        self.matrix = self.vectorizer.fit_transform(df["text"])

        self.model = NearestNeighbors(metric="cosine", algorithm="brute", n_neighbors=20, n_jobs=-1)
        self.model.fit(self.matrix)

    def _fuzzy_match(self, query):
        best = None
        best_score = 0

        for i, title in enumerate(self.df["song"]):
            score = fuzz.ratio(str(title).lower(), query.lower())
            if score > best_score:
                best_score = score
                best = i

        if best_score < 60:
            return None
        return best

    def recommend(self, song_name, n=10):
        idx = self._fuzzy_match(song_name)
        if idx is None:
            return []

        distances, indices = self.model.kneighbors(self.matrix[idx], n_neighbors=n+1)
        indices = indices.flatten()[1:]
        distances = distances.flatten()[1:]

        results = []
        for i, d in zip(indices, distances):
            results.append({
                "song": self.df.iloc[i]["song"],
                "artist": self.df.iloc[i]["artist"],
                "score": float(1 - d)
            })
        return results
