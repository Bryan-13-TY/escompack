"""Elimina proyectos de prueba de GNS3 cuyo nombre empieza con un prefijo."""

import os
import sys

import httpx

GNS3_URL = os.getenv("GNS3_URL", "http://localhost:3080")
GNS3_USER = os.getenv("GNS3_USER")
GNS3_PASSWORD = os.getenv("GNS3_PASSWORD")
API_PREFIX = "/v2"
PREFIJO = "escompack-prueba"

def main() -> int:
    """Lista los proyectos con el prefijo y los elimina tras confirmar."""
    auth = (
        httpx.BasicAuth(GNS3_USER, GNS3_PASSWORD)
        if GNS3_USER and GNS3_PASSWORD
        else None
    )
    try:
        with httpx.Client(
            base_url=f"{GNS3_URL}{API_PREFIX}", auth=auth, timeout=10.0
        ) as client:
            response = client.get("/projects")
            response.raise_for_status()
            candidatos = [
                project
                for project in response.json()
                if project["name"].startswith(PREFIJO)
            ]
            if not candidatos:
                print("No hay proyectos con ese prefijo.")
                return 0

            for project in candidatos:
                print(f"{project['name']} ({project['project_id']})")
            if input("¿Eliminar esos proyectos? [s/N]: ").lower() != "s":
                print("Cancelado.")
                return 0

            for project in candidatos:
                result = client.delete(f"/projects/{project['project_id']}")
                print(f"{project['name']}: {result.status_code}")
    except httpx.HTTPError as error:
        print(f"Error: {error}", file=sys.stderr)
        return 1
    return 0

if __name__ == "__main__":
    sys.exit(main())
