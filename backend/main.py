from fastapi import FastAPI, UploadFile, File
import random

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # your React app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    # Mock threat classification
    threat_levels = ["low", "medium", "high"]
    threat = random.choice(threat_levels)
    confidence = round(random.uniform(0.5, 0.9), 2)

    # Just return info, no real image analysis
    return {
        "filename": file.filename,
        "threat_level": threat,
        "confidence": confidence
    }
