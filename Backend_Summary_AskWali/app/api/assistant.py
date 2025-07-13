from fastapi import APIRouter, Body
from fastapi.responses import JSONResponse
from services import gemini

router = APIRouter()

@router.post("/parse")
async def parse_transcription(data: dict = Body(...)):
    try:
        transcription = data.get("text")
        parsed = gemini.extract_search_query(transcription)
        return {"parsed": parsed}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
