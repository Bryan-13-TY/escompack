"""Módulo con el router para las peticiones de la captura de paquetes.

Este módulo incluye el endpoint `/api/capture/` que indica el estado
de la captura actual.

Endpoints:
    - _star_capture: Muestra el número de paquetes a capturar, el
    protocolo de esos paquetes y el estado activo (`True`) que
    indica que la captura esta activa.
"""

from dataclasses import asdict

from fastapi import APIRouter

from app.schemas import CaptureRequest
from app.models import capture_state

router_capture = APIRouter(prefix="/api/capture", tags=["Captura"])

@router_capture.post("/")
async def _star_capture(data: CaptureRequest):
    """
    Endpoint para monitorear la captura de paquetes.

    Tomamos los valores de los atributos `packets` y `protocol` de
    la clase `CaptureRequest` (petición proveniente del formulario)
    y los guardamos en los atributos correspondientes del modelo
    `CaptureState`, sin embargo para el atributo `is_active` de este
    último se le coloca el valor `True`.
    """
    # Guardamos los datos que llegaron del formulario
    capture_state.packets_to_capture = data.packets
    capture_state.protocol = data.protocol
    capture_state.is_active = True

    print("Captura modificada:", asdict(capture_state))

    return {"status": "ok", "received": data}


@router_capture.get("/status")
async def _capture_status():
    return asdict(capture_state)
