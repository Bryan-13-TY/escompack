"""Captura el tráfico de un enlace de GNS3 (API v2) y lo guarda en un PCAP."""

import argparse
import asyncio
import os
import sys
from pathlib import Path

import httpx

GNS3_URL = os.getenv("GNS3_URL", "http://localhost:3080")
GNS3_USER = os.getenv("GNS3_USER")
GNS3_PASSWORD = os.getenv("GNS3_PASSWORD")
API_PREFIX = "/v2"

def crear_cliente() -> httpx.AsyncClient:
    """Construye un cliente HTTP asíncrono autenticado para GNS3."""
    auth = (
        httpx.BasicAuth(GNS3_USER, GNS3_PASSWORD)
        if GNS3_USER and GNS3_PASSWORD
        else None
    )
    return httpx.AsyncClient(
        base_url=f"{GNS3_URL}{API_PREFIX}", auth=auth, timeout=10.0
    )


async def obtener_enlace(client: httpx.AsyncClient, project_id: str) -> str:
    """Devuelve el id del primer enlace del proyecto."""
    response = await client.get(f"/projects/{project_id}/links")
    response.raise_for_status()
    enlaces = response.json()
    if not enlaces:
        raise LookupError("El proyecto no tiene enlaces.")
    return enlaces[0]["link_id"]


async def iniciar_captura(
        client: httpx.AsyncClient,
        project_id: str,
        link_id: str,
    ) -> None:
    """Inicia la captura en el enlace, con encapsulador Ethernet."""
    response = await client.post(
        f"/projects/{project_id}/links/{link_id}/start_capture",
        json={"data_link_type": "DLT_EN10MB"},
    )
    response.raise_for_status()


async def detener_captura(
        client: httpx.AsyncClient,
        project_id: str,
        link_id: str,
    ) -> None:
    """Detiene la captura del enlace."""
    response = await client.post(
        f"/projects/{project_id}/links/{link_id}/stop_capture"
    )
    response.raise_for_status()


async def descargar_pcap(
        client: httpx.AsyncClient,
        project_id: str,
        link_id: str,
        salida: Path,
        segundos: float,
    ) -> int:
    """Lee el flujo PCAP del enlace duramte `segundos` y lo guarda en disco."""
    total = 0
    url = f"/projects/{project_id}/links/{link_id}/pcap"
    try:
        async with asyncio.timeout(segundos):
            async with client.stream("GET", url, timeout=None) as response:
                response.raise_for_status()
                with salida.open("wb") as archivo:
                    async for fragmento in response.aiter_bytes():
                        archivo.write(fragmento)
                        total += len(fragmento)
    except TimeoutError:
        pass  # Fin esperado de la ventana del captura.
    return total


async def ejecutar(project_id: str, segundos: float, salida: Path) -> None:
    """Orquesta la captura: iniciar, leer el flujo y detener."""
    async with crear_cliente() as client:
        link_id = await obtener_enlace(client, project_id)
        await iniciar_captura(client, project_id, link_id)
        print(f"Capturando {segundos:.0f} s en el enlace {link_id}...")
        try:
            total = await descargar_pcap(
                client, project_id, link_id, salida, segundos,
            )
        finally:
            await detener_captura(client, project_id, link_id)
        print(f"Recibidos {total} bytes en {salida}")


def main() -> int:
    """Punto de entrada: lee argumentos y ejecuta la captura."""
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("project_id", help="Identificador del proyecto")
    parser.add_argument("-s", "--segundos", type=float, default=20.0)
    parser.add_argument("-o", "--salida", type=Path, default=Path("captura.pcap"))
    args = parser.parse_args()

    try:
        asyncio.run(ejecutar(args.project_id, args.segundos, args.salida))
    except httpx.HTTPStatusError as error:
        print(
            f"GNS3 respondió {error.response.status_code}: {error.response.text}",
            file=sys.stderr,
        )
        return 1
    except (httpx.HTTPError, LookupError) as error:
        print(f"Error: {error}", file=sys.stderr)
        return 1
    return 0

if __name__ == "__main__":
    sys.exit(main())
