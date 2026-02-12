from flask import Flask, request, jsonify
from flask_cors import CORS

from utils.loader import load_songs
from recommender.content_based import ContentBasedRecommender
from recommender.knn_model import KNNRecommender

app = Flask(__name__)
CORS(app)

df = load_songs()

content_model = ContentBasedRecommender(df)
knn_model = KNNRecommender(df)

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Music Recommendation Backend Running ✅",
        "total_songs": len(df),
        "endpoints": {
            "search": "/api/search?q=love",
            "content": "/api/recommend/content?song=Bang&n=10",
            "knn": "/api/recommend/knn?song=Bang&n=10",
            "collaborative": "/api/recommend/collaborative?song=Bang&n=10"
        }
    })

@app.route("/api/search", methods=["GET"])
def search():
    q = request.args.get("q", "").strip().lower()
    if not q:
        return jsonify([])

    results = df[df["song"].str.lower().str.contains(q)].head(20)
    return jsonify(results[["song", "artist", "link"]].to_dict(orient="records"))

@app.route("/api/recommend/content", methods=["GET"])
def recommend_content():
    song = request.args.get("song", "")
    n = int(request.args.get("n", 10))
    return jsonify(content_model.recommend(song, n=n))

# ✅ KNN route
@app.route("/api/recommend/knn", methods=["GET"])
def recommend_knn():
    song = request.args.get("song", "")
    n = int(request.args.get("n", 10))
    return jsonify(knn_model.recommend(song, n=n))

# ✅ Collaborative alias (same function)
@app.route("/api/recommend/collaborative", methods=["GET"])
def recommend_collaborative():
    song = request.args.get("song", "")
    n = int(request.args.get("n", 10))
    return jsonify(knn_model.recommend(song, n=n))

if __name__ == "__main__":
    app.run(debug=True)
