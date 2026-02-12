import pandas as pd

DATA_PATH = "data/songdata.xlsx"

def load_songs():
    df = pd.read_excel(DATA_PATH)

    # Ensure columns exist
    for col in ["song", "artist", "text", "link"]:
        if col not in df.columns:
            df[col] = ""

    # Convert everything to string safely
    df["song"] = df["song"].fillna("").astype(str)
    df["artist"] = df["artist"].fillna("").astype(str)
    df["text"] = df["text"].fillna("").astype(str)
    df["link"] = df["link"].fillna("").astype(str)

    # Remove "nan" strings if any appeared
    df["song"] = df["song"].replace("nan", "")
    df["artist"] = df["artist"].replace("nan", "")

    df["full_title"] = (df["song"] + " - " + df["artist"]).str.strip()
    df = df.reset_index(drop=True)

    return df
