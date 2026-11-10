"""Prueba de conectividad con el controlado de GNS3 (API v2)."""

import os
import sys

import httpx

GNS3_USER = os.getenv("GNS3_USER")
GNS3_PASSWORD = os.getenv("GNS3_PASSWORD")
GNS3_URL = os.getenv("GNS3_URL", "http://localhost:3080")
API_PREFIX = "/v2"

def main() -> int:
    """Consulta la versión, cómputos y proyectos del controlador de GNS3."""
    try:
        auth = (
            httpx.BasicAuth(GNS3_USER, GNS3_PASSWORD)
            if GNS3_USER and GNS3_PASSWORD
            else None
        )
        with httpx.Client(
            base_url=f"{GNS3_URL}{API_PREFIX}", auth=auth, timeout=5.0
        ) as client:
            version = client.get("/version")
            version.raise_for_status()
            print(f"Versión del controlador: {version.json().get('version')}")

            computes = client.get("/computes")
            computes.raise_for_status()
            for compute in computes.json():
                print(
                    f"Cómputo: {compute.get('name')}"
                    f"({compute.get('host')})"
                    f"conectado={compute.get('connected')}"
                )

            projects = client.get("/projects")
            projects.raise_for_status()
            for project in projects.json():
                print(f"Proyecto: {project.get('name')} [{project.get('status')}]")
    except httpx.HTTPError as error:
        print(f"No se pudo conectar con {GNS3_URL}: {error}", file=sys.stderr)
        return 1
    return 0

if __name__ == "__main__":
    sys.exit(main())
