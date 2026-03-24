from fastapi import APIRouter
from pydantic import BaseModel
from app.services.predictor import predict_scam

router = APIRouter()

class TextRequest(BaseModel):
    text: str

@router.post("/predict")
def predict(request: TextRequest):
    result = predict_scam(request.text)
    return result
