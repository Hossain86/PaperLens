from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.entities import Paper, User
from app.schemas.paper import PaperCreateFromLink, PaperResponse
from app.services.paper_service import import_from_source, save_uploaded_pdf

router = APIRouter()


@router.post("/upload", response_model=PaperResponse)
def upload_paper(
    file: UploadFile = File(...),
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if file.content_type not in {"application/pdf", "application/octet-stream"}:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Only PDFs are supported")
    paper = save_uploaded_pdf(db, user.id, file.filename or "paper.pdf", file.file.read())
    return paper


@router.post("/import", response_model=PaperResponse)
def import_paper(
    payload: PaperCreateFromLink,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return import_from_source(db, user.id, payload.source)


@router.get("", response_model=list[PaperResponse])
def list_papers(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Paper).filter(Paper.user_id == user.id).order_by(Paper.created_at.desc()).all()


@router.get("/{paper_id}", response_model=PaperResponse)
def get_paper(paper_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    paper = db.query(Paper).filter(Paper.id == paper_id, Paper.user_id == user.id).first()
    if not paper:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Paper not found")
    return paper


@router.delete("/{paper_id}")
def delete_paper(paper_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    paper = db.query(Paper).filter(Paper.id == paper_id, Paper.user_id == user.id).first()
    if not paper:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Paper not found")
    db.delete(paper)
    db.commit()
    return {"message": "Paper deleted"}
