from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.entities import Paper, PaperAnalysis, User
from app.schemas.analysis import AnalysisResponse
from app.services.analysis_service import run_analysis

router = APIRouter()


@router.post("/run/{paper_id}", response_model=AnalysisResponse)
def run_paper_analysis(
    paper_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    paper = db.query(Paper).filter(Paper.id == paper_id, Paper.user_id == user.id).first()
    if not paper:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Paper not found")
    analysis = run_analysis(db, paper)
    return _to_response(paper, analysis)


@router.get("/{paper_id}", response_model=AnalysisResponse)
def get_paper_analysis(
    paper_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    paper = db.query(Paper).filter(Paper.id == paper_id, Paper.user_id == user.id).first()
    analysis = db.query(PaperAnalysis).filter(PaperAnalysis.paper_id == paper_id).first()
    if not paper or not analysis:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Analysis not found")
    return _to_response(paper, analysis)


def _to_response(paper: Paper, analysis: PaperAnalysis) -> AnalysisResponse:
    return AnalysisResponse(
        title=paper.title,
        authors=paper.authors,
        year=paper.year,
        TLDR=analysis.main_finding,
        problem_gap=analysis.problem_gap,
        motivation=analysis.motivation,
        hypothesis=analysis.hypothesis,
        methodology=analysis.methodology,
        main_finding=analysis.main_finding,
        limitations=analysis.limitations,
        confidence_score=analysis.confidence_score,
    )
