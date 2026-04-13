from __future__ import annotations

SECTIONS = ["abstract", "introduction", "methods", "results", "discussion", "conclusion"]


def detect_sections(pages: list[dict[str, str | int]]) -> list[dict[str, int | str]]:
    found: list[dict[str, int | str]] = []
    for page in pages:
        text = str(page.get("text", "")).lower()
        for section in SECTIONS:
            if f"\n{section}" in text or text.startswith(section):
                found.append(
                    {
                        "section_name": section.title(),
                        "page_start": int(page["page_number"]),
                        "page_end": int(page["page_number"]),
                    }
                )
    return found
