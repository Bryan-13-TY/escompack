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
from typing import Optional

from fastapi import (
    APIRouter,
    Query,
)

from app.core.database import capture_collection
from app.schemas.capture_request import Protocols

router_captures = APIRouter(prefix="/api/captures", tags=["Índice de captura"])

@router_captures.get("/")
async def _search_captures(
    protocol: Optional[Protocols] = Query(default=None),
    captured_date: Optional[date] = Query(default=None)
) -> list:
    """
    Endpoint para filtrar las capturas.

    De acuerdo con el `protocol` y `captured_date` se devuelven las
    capturas que cumplan con alguno/ninguno de los dos filtros. 
    """
    # guardamos la consulta Query en un diccionario
    query = {}
    
    if protocol is not None:
        # guardamos el valor del protocolo en el diccionario
        query["protocol"] = protocol.value

    if captured_date is not None:
        query["captured_at"] = {
            # definimos un rango: desde el inicio del día hasta el
            # final (de 00:00:00 hasta 23:59:59), para poder capturar
            # cualquier documento de ese día sin importar la hora
            "$gte": datetime.combine(captured_date, datetime.min.time()),
            "$lt": datetime.combine(captured_date, datetime.max.time()),
        }

    # devuelve un cursor asíncrono, con límite de 100 archivos
    # indexados
    cursor = capture_collection.find(query)
    # devuelve la lista de los paquetes encontrados 
    results: list = await cursor.to_list(length=100)

    for r in results:
        # convertimos el ID de tipo 'ObjectId' que usa MongoDB en un string
        # ya que este no es serializable a JSON
        r["_id"] = str(r["_id"])

    return results
