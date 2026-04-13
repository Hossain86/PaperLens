import json
from pathlib import Path

from ai_pipeline.rag_engine import answer_question

UPLOAD_DIR = Path("uploads")


def get_chat_answer(paper_id: int, question: str) -> dict:
    pages_file = UPLOAD_DIR / f"{paper_id}_pages.json"
    pages = json.loads(pages_file.read_text(encoding="utf-8")) if pages_file.exists() else []
    return answer_question(question, pages)
