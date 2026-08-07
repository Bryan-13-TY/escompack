"""Punto de entrada de la API."""

from fastapi import FastAPI
from fastapi.responses import HTMLResponse

from app.api.v1.routers import router_capture
from app.api.v1.routers import router_ws

app_web = FastAPI(title="Backend para la captura y manipulación de paquetes de red")

@app_web.get("/", tags=["Root"])
async def _root():
    """Endpoint base de la API."""
    return HTMLResponse(
        content="<h1 style='text-align: center'>Backend de la aplicación web.</h1>"
    )

# Incluimos los endpoints para la captura de paquetes
app_web.include_router(router=router_capture)
app_web.include_router(router=router_ws)
