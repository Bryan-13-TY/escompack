from dataclasses import asdict

from fastapi import APIRouter

from app.schemas import CaptureRequest
from app.models import capture_state

router_capture = APIRouter(prefix="/api/capture", tags=["Captura"])

@router_capture.post("/")
async def _star_capture(data: CaptureRequest):
    # Guardamos los datos que llegaron del formulario
    capture_state.packets_to_capture = data.packets
    capture_state.protocol = data.protocol
    capture_state.is_active = True

    print("Captura modificada:", asdict(capture_state))

    return {"status": "ok", "received": data}


@router_capture.get("/status")
async def _capture_status():
    return asdict(capture_state)
