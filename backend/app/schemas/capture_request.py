"""Módulo con el esquema para la captura de paquetes.

Este esquema representa la petición a la API que indica los parametros
para la captura de paquetes de red.

Clases:
    - Protocols: Enum en el que se especifican los protocolos
    soportados para la captura.
    - CaptureRequest: Clase que representa la petición con
    los parametros con la captura.
"""

from enum import Enum

from pydantic import (
    BaseModel,
    Field,
)

class Protocols(str, Enum):
    """Enum para los protocolo soportados."""
    ARP = "arp"
    ICMP = "icmp"
    IGMP = "igmp"
    DVMRP = "dvmrp"
    PIM = "pim"
    MSDP = "msdp"
    TCP = "tcp"
    UDP = "udp"


class CaptureRequest(BaseModel):
    """
    Esquema que representa la petición para la captura de paquetes.

    Cada petición necesita el número de paquetes, que en este caso
    se limita a un rango de mínimo 5 y máximo 100 paquetes por
    petición. También incluye el protocolo del paquete a capturar,
    que de igual forma se limita a los protocolos: `ARP`, `ICMP`,
    `IGMP`, `DVMRP`, `PIM`, `MSDP`, `TCP` y `UDP`.
    """
    packets: int = Field(ge=5, le=100)
    protocol: Protocols

    model_config = {
        "json_schema_extra": {
            "example": {
                "packets": 5,
                "protocol": "tcp",
            }
        }
    }
