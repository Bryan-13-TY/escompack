from fastapi import FastAPI
from fastapi.responses import HTMLResponse

tt_web_app_rc = FastAPI(
    title=
        "Aplicación web para la manipulación de paquetes de red aplicado a la unidad de"
        "aprendizaje de Redes de Computadoras en ESCOM"
    )

@tt_web_app_rc.get("/", tags=["Root"])
async def root():
    return HTMLResponse(
        content="<h1 style='text-align: center'>Backend del TT</h1>"
    )
