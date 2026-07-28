from fastapi import (
    Path,
    APIRouter,
    HTTPException,
    status
)

router_capture = APIRouter(prefix="/capture", tags=["Captura"])

@router_capture.get("")
async def _root():
    pass


@router_capture.post("/start")
async def _start_capture():
    pass


@router_capture.post("/stop")
async def _stop_capture():
    pass


@router_capture.get("/packets")
async def _get_packets():
    pass
