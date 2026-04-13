from __future__ import annotations

FIELDS = [
    "problem_gap",
    "motivation",
    "hypothesis",
    "methodology",
    "main_finding",
    "limitations",
]


def analyze_paper(pages: list[dict]) -> dict[str, str]:
    text = "\n".join(str(page.get("text", "")) for page in pages).lower()

    def pick(keyword: str) -> str:
        if keyword in text:
            return f"Evidence found for {keyword}."
        return "Not stated in the paper"

    return {
        "problem_gap": pick("gap"),
        "motivation": pick("motivation"),
        "hypothesis": pick("hypothesis"),
        "methodology": pick("method"),
        "main_finding": pick("result"),
        "limitations": pick("limitation"),
    }
