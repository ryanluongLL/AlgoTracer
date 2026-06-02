from fastapi import APIRouter, HTTPException, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from app.models.step import ExplainRequest, ExplainResponse
from app.services.claude_service import get_explanation

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)


@router.post("/")
@limiter.limit("10/minute")
async def explain_step(request: Request, body: ExplainRequest):
    try:
        explanation = await get_explanation(body)
        return ExplainResponse(explanation=explanation)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))