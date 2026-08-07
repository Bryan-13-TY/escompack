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
    await websocket.accept()
    loop = asyncio.get_event_loop()

    def _packect_process(pkt):
        summary = {
            "number": _packect_process.count,
            "origin": pkt[0][1].src if pkt.haslayer("Ether") else None,
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
