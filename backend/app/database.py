from fastapi import APIRouter
from motor.motor_asyncio import AsyncIOMotorClient

# Accedemos a la BD desde el backend usando el pueto mapeado
# del contenedor de MongoDB
MONGO_URL = "mongodb://localhost:27017"

client = AsyncIOMotorClient(MONGO_URL)
database = client["escompack"]
capture_collection = database["captures"]

# endpoint temporal para probar la conexión a la BD

router_database = APIRouter(prefix="/health/")

@router_database.get("db")
async def _check_database():
    try:
        await client.admin.command("ping")
        return {"status": "ok", "message": "Conexión a MongoDB exitosa"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
