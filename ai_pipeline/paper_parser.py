from __future__ import annotations

import fitz


def parse_pdf_pages(pdf_path: str) -> list[dict[str, str | int]]:
    doc = fitz.open(pdf_path)
    pages: list[dict[str, str | int]] = []
    for index, page in enumerate(doc):
        pages.append({"page_number": index + 1, "text": page.get_text("text")})
    return pages
