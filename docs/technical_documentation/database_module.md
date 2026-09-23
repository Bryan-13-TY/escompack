# Documentación técnica — Módulo de base de datos e índice de capturas
 
**Proyecto:** ESCOMPack — Aplicación web para la manipulación de paquetes de red aplicado a la unidad de aprendizaje de Redes de Computadoras en ESCOM
**Trabajo Terminal No.:** 2027-A020
**Módulo documentado:** Almacenamiento e índice de capturas (extensión de la Iteración 2 del módulo de captura)
 
---
 
## 1. Propósito del módulo
 
Cada captura realizada por el usuario se guarda como un archivo `.pcap` en disco, y sus metadatos (protocolo, fecha, número de paquetes, ruta del archivo) se indexan en MongoDB. Este índice permite que la vista de manipulación de paquetes ofrezca un modal de búsqueda, donde el usuario filtra las capturas disponibles por protocolo y/o fecha antes de elegir un archivo específico para editar.
 
MongoDB no almacena los paquetes en sí — únicamente actúa como un catálogo de referencia hacia los archivos `.pcap` guardados en el sistema de archivos del backend.
 
## 2. Por qué MongoDB en vez de una base de datos relacional
 
Aunque el caso de uso (un índice de metadatos) también sería viable en una base relacional, se mantuvo MongoDB por dos razones concretas:
 
1. **Flexibilidad de esquema entre protocolos.** Distintos protocolos podrían requerir metadatos adicionales en el futuro (por ejemplo, puertos para TCP/UDP, que no aplican a ARP). MongoDB permite que los documentos varíen ligeramente sin necesidad de migraciones de esquema, a diferencia de agregar/quitar columnas en una tabla relacional.
2. **Consistencia con la propuesta original del TT**, que ya comprometía MongoDB como gestor de base de datos ante el comité evaluador.

## 3. Conceptos base de MongoDB aplicados en el proyecto
 
MongoDB es una base de datos **no relacional de tipo documental**. Su jerarquía equivale conceptualmente a la de una base relacional, pero con nombres y comportamiento distintos:
 
| Concepto relacional | Equivalente en MongoDB |
|---|---|
| Base de datos | Base de datos (`escompack`) |
| Tabla | Colección (`captures`) |
| Fila | Documento (un objeto tipo JSON) |
| Columna | Campo dentro del documento |
 
A diferencia de una base relacional, **no es necesario definir el esquema de antemano**: tanto la base de datos como la colección se crean automáticamente en cuanto se inserta el primer documento. La validación de estructura, en este proyecto, se impone a nivel de aplicación mediante esquemas de Pydantic (`CaptureIndex`), no a nivel del motor de base de datos.
 
Cada documento de la colección `captures` incluye, además de los campos definidos por la aplicación, un identificador único generado automáticamente por MongoDB (`_id`), de tipo `ObjectId` — un tipo de dato propio de MongoDB que no es serializable a JSON de forma nativa y debe convertirse explícitamente a texto (`str(_id)`) antes de devolverlo en una respuesta HTTP.
 
## 4. Conexión a la base de datos
 
```python
# app/core/database.py
 
from motor.motor_asyncio import AsyncIOMotorClient
 
MONGO_URL = "mongodb://localhost:27017"
 
client = AsyncIOMotorClient(MONGO_URL)
database = client["escompack"]
capture_collection = database["captures"]
```
 
Se utiliza `motor`, el driver oficial **asíncrono** de MongoDB para Python, en lugar de `pymongo` (el driver síncrono estándar). Esta elección sigue el mismo principio ya aplicado con Scapy: una operación bloqueante ejecutada directamente dentro de una función `async def` de FastAPI congelaría el *event loop*, impidiendo que el servidor atienda otras peticiones mientras espera respuesta de la base de datos. `motor` permite usar `await` sobre las operaciones de base de datos sin ese efecto colateral.
 
`client`, `database` y `capture_collection` se instancian una única vez al cargarse este módulo. El resto de la aplicación no crea nuevas conexiones — importa esta misma referencia compartida donde se necesite (por ejemplo, `from app.core.database import capture_collection`), evitando múltiples conexiones redundantes hacia el mismo servidor.
 
### 4.1 Consideración de infraestructura: acceso desde un backend en `network_mode: host`
 
Como el contenedor del backend corre en `network_mode: host` (ver sección 8 de `documentacion_modulo_captura.md`), no pertenece a la red bridge de Docker Compose donde normalmente se resolvería el servicio `mongodb` por nombre. Al compartir la red de la propia VM, el backend accede a MongoDB a través del puerto mapeado directamente en el host: `mongodb://localhost:27017`, en lugar de `mongodb://mongodb:27017` como sería en una configuración de red estándar.
 
### 4.2 Nota sobre la versión de la imagen de MongoDB
 
Se utiliza la imagen `mongo:4.4` en lugar de una versión más reciente, debido a que MongoDB 5.0 en adelante requiere soporte de instrucciones **AVX** en el procesador — capacidad que la VM de VirtualBox utilizada para el desarrollo no expone al sistema invitado, causando que el contenedor de MongoDB terminara inmediatamente al iniciar. Esta restricción de versión se documenta como una decisión de compatibilidad de entorno, no como una limitación funcional del proyecto.
 
## 5. Esquema de una captura indexada
 
```python
# app/schemas/capture_index.py
 
from pydantic import BaseModel, Field
from datetime import datetime
from app.schemas.capture_request import Protocols
 
class CaptureIndex(BaseModel):
    filename: str
    filepath: str
    protocol: Protocols
    packet_count: int = Field(ge=5, le=100)
    captured_at: datetime
```
 
`CaptureIndex` reutiliza el mismo `Enum Protocols` definido para `CaptureRequest`, evitando duplicar la validación de protocolos soportados en dos lugares distintos del código.
 
Este esquema se aplica en dos puntos del flujo:
 
- **Al insertar un documento nuevo** (en el WebSocket de captura), validando la estructura antes de escribir en Mongo.
- **Como `response_model` del endpoint de búsqueda**, validando y documentando automáticamente la forma de cada resultado devuelto.
## 6. Guardado e indexado de una captura
 
Al finalizar una captura exitosa dentro del WebSocket (`app/api/v1/routers/websocket.py`), ocurren dos operaciones en secuencia:
 
```python
os.makedirs(CAPTURES_DIR, exist_ok=True)
 
timestamp = datetime.now(timezone.utc)
filename = f"captura_{capture_state.protocol}_{timestamp.strftime('%Y%m%d_%H%M%S')}.pcap"
filepath = os.path.join(CAPTURES_DIR, filename)
 
if captured_packets:
    wrpcap(filepath, captured_packets)
 
    new_capture = CaptureIndex(
        filename=filename,
        filepath=filepath,
        protocol=capture_state.protocol,
        packet_count=len(captured_packets),
        captured_at=timestamp,
    )
 
    await capture_collection.insert_one(new_capture.model_dump())
```
 
- **`wrpcap(filepath, captured_packets)`** — función de Scapy que serializa una lista de paquetes capturados al formato binario estándar `.pcap`, compatible con herramientas externas como Wireshark.
- **`CAPTURES_DIR = "/app/captures"`** — al coincidir con el volumen ya definido en `docker-compose.yml` (`./backend:/app`), cualquier archivo escrito ahí persiste automáticamente en el sistema de archivos de la VM, sin necesidad de un volumen adicional.
- **`new_capture.model_dump()`** — convierte la instancia validada de `CaptureIndex` a un diccionario plano de Python, que es lo que `capture_collection.insert_one()` espera recibir. Validar con Pydantic antes de insertar evita que un error de tipo (por ejemplo, un `packet_count` como texto en vez de número) llegue a guardarse silenciosamente en la base de datos.
- **`if captured_packets:`** — evita generar un archivo e insertar un documento si el usuario detuvo la captura antes de que llegara siquiera un paquete.
## 7. Búsqueda de capturas indexadas
 
```python
# app/api/v1/routers/captures_index.py
 
@router_captures.get("/", response_model=List[CaptureIndex])
async def _search_captures(
    protocol: Optional[Protocols] = Query(default=None),
    captured_date: Optional[date] = Query(default=None),
):
    query = {}
 
    if protocol is not None:
        query["protocol"] = protocol.value
 
    if captured_date is not None:
        query["captured_at"] = {
            "$gte": datetime.combine(captured_date, datetime.min.time()),
            "$lt": datetime.combine(captured_date, datetime.max.time()),
        }
 
    cursor = capture_collection.find(query)
    results = await cursor.to_list(length=100)
 
    return results
```
 
### 7.1 Construcción dinámica del filtro (`query`)
 
El diccionario `query` se construye de forma incremental, comenzando vacío y agregando condiciones únicamente para los parámetros que el usuario efectivamente proporcionó. Un diccionario vacío (`{}`) pasado a `find()` equivale a "sin restricciones" — devuelve todos los documentos de la colección.
 
Ejemplos de cómo queda `query` según los parámetros recibidos en la URL:
 
| Petición | `query` resultante |
|---|---|
| `/api/captures/` | `{}` |
| `/api/captures/?protocol=tcp` | `{"protocol": "tcp"}` |
| `/api/captures/?captured_date=2026-08-05` | `{"captured_at": {"$gte": ..., "$lt": ...}}` |
| `/api/captures/?protocol=icmp&captured_date=2026-08-05` | `{"protocol": "icmp", "captured_at": {"$gte": ..., "$lt": ...}}` |
 
Cuando el diccionario contiene más de una llave, MongoDB las interpreta como una condición `AND` implícita entre todas ellas.
 
### 7.2 Filtro de fecha por rango, no por igualdad
 
El campo `captured_at` almacena una marca de tiempo completa (fecha y hora exacta), mientras que el filtro que recibe el usuario es solo una fecha. Comparar por igualdad exacta prácticamente nunca encontraría resultados, ya que la hora exacta rara vez coincidiría. Por ello, se construye un rango entre el inicio (`00:00:00`) y el fin (`23:59:59.999999`) del día solicitado, usando los operadores de comparación propios de MongoDB:
 
- **`$gte`** (*greater than or equal*) — mayor o igual que.
- **`$lt`** (*less than*) — menor que.
### 7.3 El cursor de MongoDB
 
`capture_collection.find(query)` no devuelve los resultados directamente, sino un **cursor**: una referencia que permite recorrer los resultados de la consulta de forma perezosa (*lazy*), sin cargar en memoria todos los documentos de golpe. `await cursor.to_list(length=100)` materializa ese cursor en una lista real de diccionarios de Python, limitando el resultado a un máximo de 100 documentos como salvaguarda.
 
## 8. Cambios en la organización del backend
 
Como parte de este módulo, se reorganizaron algunos archivos para mayor claridad:
 
```
app/
├── core/
│   ├── database.py           # antes: database_conection.py (raíz de app/)
│   └── protocol_filters.py   # antes: en la raíz de app/
├── api/v1/routers/
│   ├── captures.py           # antes: capture.py
│   ├── captures_index.py
│   ├── health.py             # antes: database.py (router)
│   └── websocket.py          # antes: weobsocket.py (corrección de typo)
├── models/
│   └── capture_state.py
├── schemas/
│   ├── capture_index.py
│   └── capture_request.py
└── main.py
```
 
Se introdujo la carpeta `core/` para agrupar configuración y conexiones transversales (base de datos, filtros de protocolo) que no pertenecen naturalmente a `api/`, `models/` ni `schemas/`, dejando `main.py` como el único archivo suelto en la raíz de `app/`.
 
---
 
*Documento en desarrollo — pendiente de complementar con el endpoint de lectura de un archivo `.pcap` específico para la vista de manipulación de paquetes.*