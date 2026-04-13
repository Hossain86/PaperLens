from pydantic import BaseModel


class AnalysisResponse(BaseModel):
    title: str
    authors: str
    year: int | None
    TLDR: str
    problem_gap: str
    motivation: str
    hypothesis: str
    methodology: str
    main_finding: str
    limitations: str
    confidence_score: float
