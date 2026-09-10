"""Módulo para la conexión con MongoDB."""

from motor.motor_asyncio import AsyncIOMotorClient

# Accedemos a la BD desde el backend usando el pueto mapeado
# del contenedor de MongoDB
MONGO_URL = "mongodb://localhost:27017"

client = AsyncIOMotorClient(MONGO_URL)
database = client["escompack"]
capture_collection = database["captures"]
