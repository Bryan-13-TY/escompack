from fastapi import (
    Path,
    APIRouter,
    HTTPException,
    status
)

router_capture = APIRouter(prefix="/api/capture", tags=["Captura"])

@router_capture.get("/")
async def _root():
    return {"status": "ok", "message": "Conexión éxitosa desde el Backend en Docker"}


@router_capture.post("/start")
async def _start_capture():
    pass


@router_capture.post("/stop")
async def _stop_capture():
    pass


@router_capture.get("/packets")
async def _get_packets():
    pass
