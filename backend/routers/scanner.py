from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/api/scanner",
    tags=["scanner"]
)

class ScanRequest(BaseModel):
    image_url: str

class ScanResponse(BaseModel):
    status: str
    confidence: float
    disease: str
    details: str

@router.post("/analyze", response_model=ScanResponse)
def analyze_image(request: ScanRequest):
    # Mock AI response
    return ScanResponse(
        status="success",
        confidence=0.94,
        disease="Early Blight Detected",
        details="Alternaria solani structural damage identified on lower canopy leaves. High risk of spread in current humidity conditions."
    )
