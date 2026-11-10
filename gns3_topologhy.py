"""Crea una topología mínima en GNS3 (API v2): dos nodos VPCS conectados."""

import os
import sys

import httpx

GNS3_URL = os.getenv("GNS3_URL", "http://localhost:3080")
GNS3_USER = os.getenv("GNS3_USER")
GNS3_PASSWORD = os.getenv("GNS3_PASSWORD")
COMPUTE_ID = os.getenv("GNS3_COMPUTE_ID", "local")
API_PREFIX = "/v2"
PROJECT_NAME = "escompack-prueba_2"

def crear_cliente() -> httpx.Client:
    """Construye un cliente HTTP autenticado para el controlador de GNS3."""
    auth = (
        httpx.BasicAuth(GNS3_USER, GNS3_PASSWORD)
        if GNS3_USER and GNS3_PASSWORD
        else None
    )
    return httpx.Client(
        base_url=f"{GNS3_URL}{API_PREFIX}", auth=auth, timeout=10.0
    )


def obtener_plantilla_vpcs(client: httpx.Client) -> str:
    """Devuelve el identificador de la primera plantilla de tipo VPCS."""
    response = client.get("/templates")
    response.raise_for_status()
    for template in response.json():
        if template.get("template_type") == "vpcs":
            return template["template_id"]
    raise LookupError("No existe una plantilla VPCS en GNS3.")


def crear_proyecto(client: httpx.Client, name: str) -> str:
    """Crear un proyecto y devuelve su identificador."""
    response = client.post("/projects", json={"name": name})
    response.raise_for_status()
    return response.json()["project_id"]


def crear_nodo(
        client: httpx.Client,
        project_id: str,
        template_id: str,
        x: int,
        y: int,
    ) -> str:
    """Instancia una plantilla en el lienzo y devuelve el id del nodo."""
    response = client.post(
        f"/projects/{project_id}/templates/{template_id}",
        json={"x": x, "y": y, "compute_id": COMPUTE_ID},
    )
    response.raise_for_status()
    return response.json()["node_id"]


def crear_enlace(
        client: httpx.Client,
        project_id: str,
        node_a: str,
        node_b: str,
    ) -> str:
    """Conecta el puerto 0 del adaptador 0 de ambos nodos."""
    body = {
        "nodes": [
            {"node_id": node_a, "adapter_number": 0, "port_number": 0},
            {"node_id": node_b, "adapter_number": 0, "port_number": 0},
        ]
    }
    response = client.post(f"/projects/{project_id}/links", json=body)
    response.raise_for_status()
    return response.json()["link_id"]


def iniciar_nodos(client: httpx.Client, project_id: str) -> None:
    """Arranca todos los nodos del proyecto."""
    response = client.post(f"/projects/{project_id}/nodes/start", json={})
    response.raise_for_status()


def eliminar_proyecto(client: httpx.Client, project_id: str) -> None:
    """Elimina un proyecto; se usa para limpiar si la creación falla."""
    response = client.delete(f"/projects/{project_id}")
    response.raise_for_status() 


def main() -> int:
    """Crear el proyecto de prueba y muestra los indentificadores creados."""
    try:
        with crear_cliente() as client:
            template_id = obtener_plantilla_vpcs(client)
            project_id = crear_proyecto(client, PROJECT_NAME)
            print(f"Proyecto: {PROJECT_NAME} ({project_id})")
            try:
                node_a = crear_nodo(client, project_id, template_id, -150, 0)
                node_b = crear_nodo(client, project_id, template_id, 150, 0)
                print(f"Nodos: {node_a}, {node_b}")

                link_id = crear_enlace(client, project_id, node_a, node_b)
                print(f"Enlace: {link_id}")

                iniciar_nodos(client, project_id)
                print("Nodos iniciados.")
            except httpx.HTTPError:
                eliminar_proyecto(client, project_id)
                raise
    except httpx.HTTPStatusError as error:
        detalle = error.response.text
        print(f"GNS3 respondió {error.response.status_code}: {detalle}", file=sys.stderr)
        return 1
    except (httpx.HTTPError, LookupError) as error:
        print(f"Error: {error}", file=sys.stderr)
        return 1
    return 0

if __name__ == "__main__":
    sys.exit(main())
