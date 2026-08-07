from pydantic import BaseModel

class CaptureRequest(BaseModel):
    packets: int
    protocol: str

