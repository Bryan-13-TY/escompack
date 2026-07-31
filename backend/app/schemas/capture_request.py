from pydantic import BaseModel

class CaptureRequest(BaseModel):
    filename: str
    packets: str
    protocol: str

