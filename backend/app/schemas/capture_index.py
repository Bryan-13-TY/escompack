"""Módulo con el esquema para el índice de paquetes.

Este esquema representa la estructura de cada captura indexada,
es decir; es la información que se mostrará al elegir una captuar
para su posterior manipulación.

Clases:
    - CaptureIndex: Clase que representa una captura indexada, que
    muestra información sobre la misma.
"""

from datetime import datetime

from pydantic import (
    BaseModel,
    Field
)

from app.schemas.capture_request import Protocols

class CaptureIndex(BaseModel):
    """
    Esquema que representa una captura indexada.

    Cada captura se indexa, mostrando información sobre la misma:
    - `filename`: Nombre del archivo de la capturar en formato .pcap.
    - `filepath`: Ruta en donde se encuentra el archivo de la captura.
    - `protocol`: Protocolo correspondiente a la captura.
    - `packet_count`: Número de paquetes capturados.
    - `captured_at`: Fecha en la que se realizo la captura (como una
    marca de tiempo completa).    
    """
    filename: str
    filepath: str
    protocol: Protocols
    packet_count: int = Field(ge=5, le=100)
    captured_at: datetime

    model_config = {
        "json_schema_extra": {
            "example": {
                "filename": "captura_tcp_20260805.pcap",
                "filepath": "/data/captures/capture_tcp_20260805.pcap",
                "protocol": "tcp",
                "packet_count": 20,
                "captured_at": "2026-08-05T04:33:42Z",
            }
        }
    }
