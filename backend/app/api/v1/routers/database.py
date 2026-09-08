"""Módulo con el router para verificar la conexión con MongoDB
"""

from fastapi import APIRouter

from app.database_conection import client

router_database = APIRouter(prefix="/health", tags=["Database"])

@router_database.get("/db")
async def _check_database():
    try:
        await client.admin.command("ping")
        return {"status": "ok", "message": "Conexión a MongoDB exitosa"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
