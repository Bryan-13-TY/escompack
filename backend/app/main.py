from fastapi import FastAPI
from fastapi.responses import HTMLResponse

from app.api.v1.routers import router_capture

app_web = FastAPI(title="Backend para la captura y manipulación de paquetes de red")

@app_web.get("/", tags=["Root"])
async def root():
    return HTMLResponse(
        content="<h1 style='text-align: center'>Backend del TT</h1>"
    )

app_web.include_router(router=router_capture)
