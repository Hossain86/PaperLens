from datetime import datetime

from pydantic import BaseModel


class PaperCreateFromLink(BaseModel):
    source: str


class PaperResponse(BaseModel):
    id: int
    title: str
    authors: str
    year: int | None
    abstract: str
    pdf_path: str
    created_at: datetime

    class Config:
        from_attributes = True
