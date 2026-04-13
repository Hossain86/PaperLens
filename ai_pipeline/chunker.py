from __future__ import annotations


def chunk_paper(
    pages: list[dict[str, str | int]],
    section_name: str = "Unknown",
    max_chars: int = 1200,
) -> list[dict[str, str | int]]:
    chunks: list[dict[str, str | int]] = []
    chunk_id = 1
    for page in pages:
        page_text = str(page.get("text", ""))
        for start in range(0, len(page_text), max_chars):
            text = page_text[start : start + max_chars].strip()
            if not text:
                continue
            chunks.append(
                {
                    "chunk_id": chunk_id,
                    "section_name": section_name,
                    "page_number": int(page["page_number"]),
                    "text": text,
                }
            )
            chunk_id += 1
    return chunks
