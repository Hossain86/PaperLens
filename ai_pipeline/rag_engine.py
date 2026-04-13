from __future__ import annotations

from ai_pipeline.embedding_generator import generate_embedding


def answer_question(question: str, pages: list[dict], top_k: int = 3) -> dict:
    if not pages:
        return {"answer": "Not stated in the paper", "cited_pages": [], "confidence": 0.0}

    query_vec = generate_embedding(question)
    scored: list[tuple[float, dict]] = []
    for page in pages:
        text = str(page.get("text", ""))
        score = sum(a * b for a, b in zip(query_vec, generate_embedding(text)))
        scored.append((score, page))

    top_pages = [page for _, page in sorted(scored, key=lambda item: item[0], reverse=True)[:top_k]]
    cited_pages = sorted({int(page["page_number"]) for page in top_pages})

    answer = "Not stated in the paper"
    for page in top_pages:
        snippet = str(page.get("text", "")).strip()
        if snippet:
            answer = snippet[:300]
            break

    return {"answer": answer, "cited_pages": cited_pages, "confidence": 0.6 if answer != "Not stated in the paper" else 0.0}
