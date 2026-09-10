"""Módulo con el router para las peticiones de la captura de paquetes.

Este módulo incluye el router con el prefijo `/api/capture` para la
captura de paquetes.

Endpoints:
    - `/start`: Inicia la captura de paquetes.
    - `/stop`: Detiene la captura de paquetes.
    - `/status`: Muestra el estado de la captura.
"""

from dataclasses import asdict

from fastapi import APIRouter

from app.schemas.capture_request import CaptureRequest
from app.models.capture_state import capture_state

router_capture = APIRouter(prefix="/api/capture", tags=["Captura"])

@router_capture.post("/start")
async def _start_capture(data: CaptureRequest) -> dict[str, str | CaptureRequest]:
    """
    Endpoint para iniciar/modificar la captura de paquetes.

    Toma los valores de `packets` y `protocol` de la petición recibida.
    Los guarda en el estado de la captura y devuelve el siguiente
    estado para iniciar con la captura::

        {"status": "ok", "received": data}

    Siendo `data` el esquema (clase) `CaptureRequest` que corresponde
    a la petición recibida desde el formulario de captura::

        class CaptureRequest(BaseModel):
            packets: int = Field(ge=5, le=100)
            protocol: Protocols
    """
    # Guardamos los datos que llegaron del formulario
    capture_state.packets_to_capture = data.packets
    capture_state.protocol = data.protocol
    capture_state.is_active = True

    print("Captura modificada:", asdict(capture_state))
    return {"status": "ok", "received": data}

@router_capture.post("/stop")
async def _stop_capture() -> dict[str, str]:
    """
    Endpoint para parar la captura de paquetes.

    Modifica el estado de la captura de la siguiente manera::

        capture_state = {
            "stop_requested": True
        }

    Y devuelve el siguiente estado, indicando que la captura se esta
    deteniendo::

        {"status": "ok", "message": "Deteniendo captura..."}
    """
    capture_state.stop_requested = True
    return {"status": "ok", "message": "Deteniendo captura..."}


@router_capture.get("/status")
async def _capture_status() -> dict[str, int | str | bool]:
    """
    Endpoint para monitorear el estado de la captura de paquetes.

    Devuelve el estado con la siguiente estructura::

        capture_state = {
            "packets_to_capture": 5
            "protocol" = "tcp"
            "is_active" = True
            "stop_requested" = False | True
        }
    """
    return asdict(capture_state)
