from __future__ import annotations

import hashlib


def generate_embedding(text: str, dimensions: int = 8) -> list[float]:
    digest = hashlib.sha256(text.encode("utf-8")).digest()
    vector = [int(digest[i]) / 255 for i in range(dimensions)]
    return vector


def embed_chunks(chunks: list[dict]) -> list[dict]:
    return [{**chunk, "embedding_vector": generate_embedding(str(chunk.get("text", "")))} for chunk in chunks]
