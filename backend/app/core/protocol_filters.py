"""Filtro BPF correspondiente para cada protocolo.

Protocolos:
    - `arp`, `icmp`, `igmp`, `tcp`, `udp` tienen una palabra clave BPF
    directa y simple.
    - `pim` y `dvmrp` no tienen palabra clave directa en BPF, hay que
    filtrar por el número de protocolo IP (`pim` es el protocolo IP
    103; `dvmrp` en realidad viaja dentro de mensajes IGMP con un
    tipo específico, `0x13`).
    - `msdp` no es un protocolo de capa 3/4 propio, corre sobre TCP
    puerto 639, así que se filtra distinto (por puerto, no por
    protocolo).
"""

PROTOCOLS_FILTER = {
    "arp": "arp",
    "icmp": "icmp",
    "igmp": "igmp",
    "tcp": "tcp",
    "udp": "udp",
    "pim": "ip proto 103",
    "dvmrp": "igmp and igmp[0] = 0x13",
    "msdp": "tcp port 639",
}
