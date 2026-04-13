from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.entities import Paper, User
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import get_chat_answer

router = APIRouter()


@router.post("/{paper_id}", response_model=ChatResponse)
def chat_with_paper(
    paper_id: int,
    payload: ChatRequest,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    paper = db.query(Paper).filter(Paper.id == paper_id, Paper.user_id == user.id).first()
    if not paper:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Paper not found")
    answer = get_chat_answer(paper.id, payload.question)
    return ChatResponse(**answer)
