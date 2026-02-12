from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from fuzzywuzzy import fuzz


class ContentBasedRecommender:
    def __init__(self, df):
        self.df = df
        self.vectorizer = TfidfVectorizer(stop_words="english")
        self.tfidf_matrix = self.vectorizer.fit_transform(df["text"])

    def _fuzzy_match(self, query):
        best_idx = None
        best_score = 0

        for i, title in enumerate(self.df["song"]):
            score = fuzz.ratio(str(title).lower(), query.lower())
            if score > best_score:
                best_score = score
                best_idx = i

        if best_score < 60:
            return None
        return best_idx

    def recommend(self, song_name, n=10):
        idx = self._fuzzy_match(song_name)
        if idx is None:
            return []

        similarity_scores = cosine_similarity(
            self.tfidf_matrix[idx],
            self.tfidf_matrix
        ).flatten()

        similar_indices = similarity_scores.argsort()[::-1][1:n+1]

        results = []
        for i in similar_indices:
            results.append({
                "song": self.df.iloc[i]["song"],
                "artist": self.df.iloc[i]["artist"],
                "score": float(similarity_scores[i])
            })

        return results
