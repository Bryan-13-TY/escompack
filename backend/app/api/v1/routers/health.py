"""Módulo con el router para verificar la conexión con MongoDB.

Este módulo incluye el router con el prefijo `/health` para
verificar la conexión con MongoDB.

Endpoints:
    - `/db`: Verifica la conexión con MongoDB.
"""

from fastapi import APIRouter

from app.core.database import client

router_database = APIRouter(prefix="/health", tags=["Database"])

@router_database.get("/db")
async def _check_database():
    """
    Endpoint para verificar la conexión del backend con MongoDB.

    Crea una conexión con MongoDB y mediante un ping verifica si la
    conexión está activa o no.

    Si la conexión se encuentra activa se devolverá lo siguiente::

        {"status": "ok", "message": "Conexión a MongoDB exitosa"}
    
    En caso contrario se delvolverá un error.
    """
    try:
        await client.admin.command("ping")
        return {"status": "ok", "message": "Conexión a MongoDB exitosa"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
