"""Módulo con la dataclase para el estado de la captura.

Esta dataclase representa el estado de la captura.

Dataclases:
    - CaptureState: Estado de la captura, que muestra el número de
    paquetes a capturar, el protocolo de dichos paquetes y el estado
    activo de la captura `False` o `True`.
"""

from dataclasses import dataclass

@dataclass(slots=True) #  Evita crear un diccionario interno 
class CaptureState:
    """Dataclase que representa el estado de una captura.
    
    El estado de la captura incluye `packets_to_capture` (cantidad de
    paquetes a capturar), `protocol` (protocolo de los paquetes),
    `is_active` (estado activo del WS) y `stop_requested` (estado
    para detener la captura). Por defecto las últimas dos están en
    False.
    """
    packets_to_capture: int = 0
    protocol: str = ""
    is_active: bool = False
    stop_requested: bool = False

# Instancia compartida para toda la app (temporal)
capture_state = CaptureState()
