"""
Dominium Sociale - FastAPI Backend
Entry point for the application
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn

app = FastAPI(
    title="Dominium Sociale API",
    description="Social Mastery - Trend Analysis & Content Creation Platform",
    version="0.1.0"
)

# CORS für React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React Dev Server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static Files (Bilder, Videos)
app.mount("/assets", StaticFiles(directory="src/presentation/static/assets"), name="assets")


@app.get("/")
async def root():
    """Health Check"""
    return {
        "message": "Dominium Sociale API is running",
        "version": "0.1.0",
        "status": "healthy"
    }


@app.get("/api/health")
async def health_check():
    """API Health Check"""
    return {"status": "ok"}


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
