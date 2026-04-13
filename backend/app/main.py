from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.analysis import router as analysis_router
from app.api.auth import router as auth_router
from app.api.chat import router as chat_router
from app.api.papers import router as papers_router
from app.core.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="PaperLens API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(papers_router, prefix="/papers", tags=["papers"])
app.include_router(analysis_router, prefix="/analysis", tags=["analysis"])
app.include_router(chat_router, prefix="/chat", tags=["chat"])
