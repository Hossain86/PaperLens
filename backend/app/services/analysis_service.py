import json
from pathlib import Path

from ai_pipeline.paper_analyzer import analyze_paper
from app.models.entities import Paper, PaperAnalysis


UPLOAD_DIR = Path("uploads")


def run_analysis(db, paper: Paper) -> PaperAnalysis:
    pages_file = UPLOAD_DIR / f"{paper.id}_pages.json"
    pages = []
    if pages_file.exists():
        pages = json.loads(pages_file.read_text(encoding="utf-8"))

    analysis_data = analyze_paper(pages)

    existing = db.query(PaperAnalysis).filter(PaperAnalysis.paper_id == paper.id).first()
    if existing:
        for key, value in analysis_data.items():
            setattr(existing, key, value)
        existing.confidence_score = max(existing.confidence_score, 0.55)
        db.commit()
        db.refresh(existing)
        return existing

    analysis = PaperAnalysis(paper_id=paper.id, confidence_score=0.55, **analysis_data)
    db.add(analysis)
    db.commit()
    db.refresh(analysis)
    return analysis
