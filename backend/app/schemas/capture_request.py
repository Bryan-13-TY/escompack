from pydantic import BaseModel

class CaptureRequest(BaseModel):
    packets: str
    protocol: str

