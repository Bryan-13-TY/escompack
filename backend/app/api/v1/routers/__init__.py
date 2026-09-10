from .captures import router_capture
from .websocket import router_ws
from .health import router_database
from .captures_index import router_captures

__all__ = [
    "router_capture",
    "router_ws",
    "router_database",
    "router_captures",
]
