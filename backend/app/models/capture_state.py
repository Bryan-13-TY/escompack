from dataclasses import dataclass

@dataclass(slots=True) #  Evita crear un diccionario interno 
class CaptureState:
    """Dataclase que representa el estado de una captura."""
    packets_to_capture: int = 0
    protocol: str = ""
    is_active: bool = False

# Instancia compartida para toda la app
capture_state = CaptureState()
