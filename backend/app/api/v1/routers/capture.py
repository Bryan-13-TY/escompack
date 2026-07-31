from fastapi import (
    Path,
    APIRouter,
    HTTPException,
    status
)

from app.schemas import CaptureRequest

router_capture = APIRouter(prefix="/api/capture", tags=["Captura"])

@router_capture.post("/")
async def _capture(data: CaptureRequest):
    print("Datod recibidos:", data)
    return {"status": "ok", "received": data}


@router_capture.post("/start")
async def _start_capture():
    pass


@router_capture.post("/stop")
async def _stop_capture():
    pass


@router_capture.get("/packets")
async def _get_packets():
    pass
