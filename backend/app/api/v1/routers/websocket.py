"""Módulo con el router para el Websocket para la captura de paquetes
en tiempo real.

Este módulo incluye el endpoint `/ws/capture/` que abre un Websocket
entre el navegador (frontend) y el servidor (API), es decir abre un
canal bidireccional. Esto permite que el frontend y el backend se
envíen datos al mismo tiempo sin necesidad de pedir información
repetidamente logrando así una velocidad en tiempo real. 
"""

from fastapi import (
    APIRouter,
    WebSocket,
    WebSocketDisconnect,
)
from scapy.all import sniff
import asyncio

from app.models import capture_state
from app.protocol_filters import PROTOCOLS_FILTER

router_ws = APIRouter(prefix="/ws/capture", tags=["Captura"])

@router_ws.websocket("/")
async def _websocket_captue(websocket: WebSocket):
    """
    Endpoint con un Websocket para la captura de paquetes de red en
    tiempo real.

    Creamos un Websocket para abrir un canal bidireccional entre el
    frontend y el backend, para que por medio de una sola petición
    la API pueda transmitirle al frontend los paquetes al mismo
    tiempo que se van capturando logrando así una velocidad en
    tiempo real.

    Para ello tomamos los atributos `packets_to_capture` y `protocol`
    de la instancia compartida de la dataclase `CaptureState` en donde
    se guardan los atributos de la petición del frontend
    (`CaptureRequest`), para tomar la cantidad de paquetes a capturar
    y el protocolo respectivamente.

    Para filtrar los paquetes por protocolo usamos su filtro BPF
    correspondiente.

    Cuando se capture un paquete, el endpoint devolvera un objeto con
    las claves: `number`, `origin`, `destination`, `protocol`, `lenght`
    y `summary` de los cuales se tomará el valor de cada uno y se
    colocará en una tabla para representar el paquete capturado.

    Nota: El valor de la clave `protocol` contiene la última capa
    del paquete o capas genericas en caso de que no se pueda
    determinar.

    Cuando la captura de todos los paquetes termine el canal se
    cerrará.
    """
    await websocket.accept()
    loop = asyncio.get_event_loop()

    def _packect_process(pkt):
        """
        Función que se encarga de procesar el paquete capturado `pkt`
        obtendiendo de el su origen, destino, protocolo, tamaño y un
        resumen de su contenido para estructurarlo en un diccionario
        y enviarlo al frontend a través del canal creado.
        """
        summary = {
            "number": _packect_process.count,
            "source": pkt[0][1].src if pkt.haslayer("Ether") else None,
            "destination": pkt[0][1].dst if pkt.haslayer("Ether") else None,
            "protocol": pkt.lastlayer().name,
            "length": len(pkt),
            "summary": pkt.summary(),
        }

        _packect_process.count += 1

        asyncio.run_coroutine_threadsafe(websocket.send_json(summary), loop)

    _packect_process.count = 1

    # Traducimos el protocolo elegido a su filtro BPF
    bpf_filter = PROTOCOLS_FILTER.get(capture_state.protocol, "")

    try:
        # count=0 = captura indefinida hasta que el usuario detenga
        await loop.run_in_executor(
            None,
            lambda: sniff(
                prn=_packect_process,
                count=capture_state.packets_to_capture,
                filter=bpf_filter,
            ),
        )
    except WebSocketDisconnect:
        print("Cliente desconectado")
