from fastapi import APIRouter, HTTPException
from app.models.step import ExplainRequest, ExplainResponse
from app.services.claude_service import get_explanation

router = APIRouter()

@router.post("/")
async def explain_step(request: ExplainRequest):
    try:
        explanation = await get_explanation(request)
        return ExplainResponse(explanation=explanation)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))