import json
from pathlib import Path

from sqlalchemy.orm import Session

from ai_pipeline.paper_parser import parse_pdf_pages
from app.models.entities import Paper

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


def save_uploaded_pdf(db: Session, user_id: int, filename: str, content: bytes) -> Paper:
    file_path = UPLOAD_DIR / filename
    file_path.write_bytes(content)
    pages = parse_pdf_pages(str(file_path))
    paper = Paper(
        user_id=user_id,
        title=filename,
        authors="",
        year=None,
        abstract=(pages[0]["text"][:1200] if pages else ""),
        pdf_path=str(file_path),
    )
    db.add(paper)
    db.commit()
    db.refresh(paper)

    (UPLOAD_DIR / f"{paper.id}_pages.json").write_text(json.dumps(pages), encoding="utf-8")
    return paper


def import_from_source(db: Session, user_id: int, source: str) -> Paper:
    paper = Paper(
        user_id=user_id,
        title=f"Imported: {source}",
        authors="Not stated in the paper",
        year=None,
        abstract="Not stated in the paper",
        pdf_path=source,
    )
    db.add(paper)
    db.commit()
    db.refresh(paper)
    return paper
