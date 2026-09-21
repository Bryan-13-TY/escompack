"""Módulo con el router para el filtrado de capturas.

Este módulo incluye el router con el prefijo `/api/captures` para
filtrar las capturas, previo a la manipulación de paquetes.

Endpoints:
    - `/`: Devuelve información sobre las capturas correspondientes
    al filtrado.
"""

from datetime import (
    date,
    datetime,
)
from typing import Optional, List

from fastapi import (
    APIRouter,
    Query,
)

from app.core.database import capture_collection
from app.schemas.capture_request import Protocols
from app.schemas.capture_index import CaptureIndex

router_captures = APIRouter(prefix="/api/captures", tags=["Índice de captura"])

@router_captures.get("/", response_model=List[CaptureIndex])
async def _search_captures(
    protocol: Optional[Protocols] = Query(default=None),
    captured_date: Optional[date] = Query(default=None)
) -> list[dict]:
    """
    Endpoint para filtrar las capturas.

    Este endpoint acepta llamadas tipo:
    - `/api/captures/?protocol=tcp`
    - `/api/captures/?captured_date=2026-08-05`
    - `/api/captures/?protocol=icmp&captured_date=2026-08-05`
    - `/api/captures/`

    Y extrae los parámetros opciones query string `protocol` y
    `captured_date`.
    
    Utiliza un diccionario `query` que se pasa a MongoDB y que toma
    el papel de una consulta. `query` puede tomar las siguientes formas
    de acuerdo a cada llamada respectivamente::

        # Documentos con el protocolo TCP 
        query = {
            "protocol": "tcp"
        }

        # Documentos del día 5 de Agosto de 2026
        query = {
            "captured_at": {
                "$gte": datetime(2026, 8, 5, 0, 0, 0),
                "$lt": datetime(2206, 8, 5, 23, 59, 59, 999999)
            }
        }

        # Documentos del día 5 de Agosto de 2026 con el protocolo ICMP
        query = {
            "protocol": "icmp",
            "captured_at": {
                "$gte": datetime(2026, 8, 5, 0, 0, 0),
                "$lt": datetime(2206, 8, 5, 23, 59, 59, 999999)
            }
        }

        # Todos los documentos
        query = {}

    Y devuelve un documento como sigue::

        {
            "filename": "captura_tcp_20260805.pcap",
            "filepath": "/data/captures/capture_tcp_20260805.pcap",
            "protocol": "tcp",
            "packet_count": 20,
            "captured_at": "2026-08-05T04:33:42Z",
        }
    """

    # diccionario de filtro que se pasa a MongoDB
    query = {}

    # se van aagregando filtros al diccionario
    if protocol is not None:
        query["protocol"] = protocol.value

    if captured_date is not None:
        query["captured_at"] = {
            "$gte": datetime.combine(captured_date, datetime.min.time()),
            "$lt": datetime.combine(captured_date, datetime.max.time()),
        }

    # ejecuta la búsqueda (consulta)
    cursor = capture_collection.find(query)

    # devuelve la lista de los paquetes encontrados 
    results: list[dict] = await cursor.to_list(length=100)

    #for r in results:
        # convertimos el ID de tipo 'ObjectId' que usa MongoDB en un string
        # ya que este no es serializable a JSON
    #    r["_id"] = str(r["_id"])

    return results
