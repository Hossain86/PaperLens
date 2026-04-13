from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    papers: Mapped[list["Paper"]] = relationship("Paper", back_populates="user")


class Paper(Base):
    __tablename__ = "papers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(500), default="Untitled")
    authors: Mapped[str] = mapped_column(Text, default="")
    year: Mapped[int | None] = mapped_column(Integer)
    abstract: Mapped[str] = mapped_column(Text, default="")
    pdf_path: Mapped[str] = mapped_column(String(500), default="")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["User"] = relationship("User", back_populates="papers")


class PaperAnalysis(Base):
    __tablename__ = "paper_analysis"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    paper_id: Mapped[int] = mapped_column(ForeignKey("papers.id"), unique=True, nullable=False)
    problem_gap: Mapped[str] = mapped_column(Text, default="Not stated in the paper")
    motivation: Mapped[str] = mapped_column(Text, default="Not stated in the paper")
    hypothesis: Mapped[str] = mapped_column(Text, default="Not stated in the paper")
    methodology: Mapped[str] = mapped_column(Text, default="Not stated in the paper")
    main_finding: Mapped[str] = mapped_column(Text, default="Not stated in the paper")
    limitations: Mapped[str] = mapped_column(Text, default="Not stated in the paper")
    confidence_score: Mapped[float] = mapped_column(Float, default=0.0)
