"""Punto de entrada de la API."""

from fastapi import FastAPI
from fastapi.responses import HTMLResponse

from app.api.v1.routers import router_capture
from app.api.v1.routers import router_ws
from app.api.v1.routers import router_database

escom_pack = FastAPI(title="Backend para ESCOMPack")

@escom_pack.get("/", tags=["Root"])
async def _root():
    """Endpoint base de la API."""
    return HTMLResponse(
        content="<h1 style='text-align: center'>Backend de la aplicación web.</h1>"
    )

# Incluimos los endpoints para la captura de paquetes
escom_pack.include_router(router=router_capture)
escom_pack.include_router(router=router_ws)
escom_pack.include_router(router=router_database)
