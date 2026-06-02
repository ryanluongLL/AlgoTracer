from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import algorithms, explain

app = FastAPI(title="Tracer", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(algorithms.router, prefix="/api/algorithms", tags=["algorithms"])
app.include_router(explain.router, prefix="/api/explain", tags=["explain"])


@app.get("/health")
def health():
    return {"status": "ok"}
