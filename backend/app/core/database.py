"""
Módulo para la conexión asíncrona a MongoDB mediante PyMongo Async.
"""

from pymongo import AsyncMongoClient

# Accedemos a la BD desde el backend usando el pueto mapeado
# del contenedor de MongoDB directamente en localhost
MONGO_URL = "mongodb://localhost:27017"

client = AsyncMongoClient(MONGO_URL)
database = client["escompack"]
capture_collection = database["captures"]
