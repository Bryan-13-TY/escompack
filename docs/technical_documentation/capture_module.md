# Documentación técnica - Módulo de captura de paquetes

**Proyecto:** ESCOMPack - Aplicación web para la manipulación de paquetes
de red aplicada a la unidad de aprendizaje de Redes de Computadoras en
ESCOM
**Trabajo Terminal No.:** 2027-A020
**Módulo documentado:** Captura de paquetes (Iteraciones 1 y 2)

---

## 1. Propósito del módulo

El módulo de captura de paquetes permite al usuario (estudiante o profesor)
ininiciar una captura de tráfico de red en tiempo real, filtrada por
protocolo (ARP, ICMP, IGMP, DVMRP, PIM, MSDP, TCP, UDP), visualizar los
paquetes conforme llegan en una tabla, y detener la captura manualmente
antes de alcanzar el número de paquetes solicitado.

## 2. Arquitectura general del módulo

El módulo combina dos mecanismos de comunicación complementarios entre
frontend y backend:

| Canal | Protocolo | Propósito |
|---|---|---|
| `POST /api/capture/start` | HTTP REST | Configura los parámetros de la captura (número de paquetes, protocolo objetivo) e inicializa el estado compartido |
| `POST /api/capture/stop` | HTTP REST | Solicita la detención anticipada de una captura en curso |
| `WS /ws/capture/` | WebSocket | Transmite cada paquete capturado al frontend en tiempo real, conforme Scapy los va procesando |

Se decidió usar dos canales distintos en vez de uno solo porque cumplen roles
fundamentales diferentes: el REST es una interacción de "solicitud única con
respuesta única" (ideal para configurar o interrumpir), mientras que el
WebSocket permite que el servidor empuje datos de forma continua al cliente,
algo que un POST tradicional no puede hacer.

## 3. Estado compartido: `CaptureState`

```python
@dataclass(slots=True)
class CaptureState:
    packets_to_capture: int = 0
    protocol: str = ""
    is_active: bool = False
    stop_requested: bool = False
    iface: str = "enp0s8"

capture_state = CaptureState()
```

Este objeto, instanciado una sola vez y compartido entre los routers de
captura y de WebSocket, actúa como el puente entre le petición REST que
configura la captura y el WebSocket que la ejecuta. Sin este estado
compartido, ambos endpoints estarían aislados entre sí y no habría forma de
comunicar, por ejemplo, cuántos paquetes debe capturar Scapy.

## 4. Flujo completo de una captura

1. El usuario llena el formulario (número de paquetes, protocolo) y da clic en "Capturar".
2. El frontend envía `POST /api/capture/start` con los datos validados por el esquema Pydantic `CaptureRequest`.
3. El backend guarda esos valores en `capture_state` y responde `200 OK` de inmediato.
4. El frontend abre una conexión `WebSocket` hacia `/ws/capture/`.
5. Al aceptarse la conexión, el backend reinicia `capture_state.stop_requested = False` (para que capturas anteriores detenidas no afecten a la nueva) y lanza `sniff()` de Scapy en un hilo secundario.
6. Por cada paquete capturado, Scapy invoca una función callback (`_packet_process`) que arma un resumen del paquete (número, origen, destino, protocolo, longitud, resumen) y lo envía al frontend a través del WebSocket.
7. La captura se detiene cuando ocurre la primera de estas dos condiciones: se alcanza el número de paquetes solicitado, o el usuario solicitó detenerla manualmente (`stop_filter`).
8. Al finalizar, el backend envía un mensaje de control `{"event": "capture_finished"}`, distinto de los mensajes de paquetes, para que el frontend sepa que la captura terminó y pueda actualizar la interfaz (deshabilitar el botón "Detener", por ejemplo).

## 5. El reto técnico central: código bloqueante dentro de un servidor asíncrono

FastAPI funciona sobre un *event loop* de `asyncio`: un solo hilo que atiende múltiples peticiones de forma cooperativa, cediendo el control constantemente mediante `await`. `sniff()` de Scapy, en cambio, es una función síncrona y bloqueante — una vez llamada, no libera el control hasta terminar.
 
Ejecutar `sniff()` directamente dentro de una función `async def` congelaría todo el servidor, impidiendo procesar cualquier otra petición mientras dura la captura. La solución adoptada fue delegar `sniff()` a un hilo del sistema operativo mediante `loop.run_in_executor()`, dejando el *event loop* libre para seguir atendiendo otras conexiones mientras la captura ocurre en paralelo.
 
```python
await loop.run_in_executor(
    None,
    lambda: sniff(
        prn=_packet_process,
        count=capture_state.packets_to_capture,
        filter=bpf_filter,
        stop_filter=_stop_filter,
        iface=capture_state.iface,
    ),
)
```

Como consecuencia, el callback `_packet_process` se ejecuta en ese hilo secundario, no en el *event loop*. Para poder enviar cada paquete de vuelta al cliente WebSocket (una operación que solo puede ejecutarse dentro del *event loop*), se utiliza `asyncio.run_coroutine_threadsafe()`, que actúa como puente seguro entre ambos hilos:
 
```python
asyncio.run_coroutine_threadsafe(websocket.send_json(summary), loop)
```

### 5.1 Cómo trabajan en conjunto ambos hilos
 
A partir de este punto conviven, de forma simultánea, dos hilos de ejecución completamente distintos, con responsabilidades y reglas propias:
 
- **Hilo principal (el *event loop* de `asyncio`, gestionado por FastAPI/uvicorn):** es el único hilo capaz de ejecutar código `async` — como `websocket.send_json()`, o cualquier otra petición HTTP que llegue mientras tanto (por ejemplo, el `POST /api/capture/stop`). Nunca ejecuta código bloqueante directamente; en vez de eso, delega ese trabajo a otros hilos y sigue atendiendo lo que le corresponde.
- **Hilo secundario (creado por `run_in_executor`):** es un hilo de sistema operativo normal y síncrono, sin ninguna noción de `async`/`await`. Aquí es donde vive `sniff()` durante todo el tiempo que dura la captura, bloqueado esperando paquetes de la interfaz de red.

El punto de contacto entre ambos ocurre en cada paquete capturado, siguiendo esta secuencia:

1. Scapy captura un paquete en la interfaz de red y, **dentro del hilo secundario**, invoca `_packet_process(pkt)`.
2. `_packet_process` arma el diccionario `summary` con los datos del paquete — esto es trabajo síncrono normal, no involucra a `asyncio` todavía.
3. Al llegar a `asyncio.run_coroutine_threadsafe(websocket.send_json(summary), loop)`, el hilo secundario no envía nada por sí mismo — en vez de eso, **programa** esa tarea (`websocket.send_json(...)`) en la cola de pendientes del `loop` (el *event loop* del hilo principal), y continúa de inmediato con el siguiente paquete, sin esperar a que el envío realmente ocurra.
4. En algún momento posterior, el *event loop*, dentro del hilo principal, toma esa tarea de su cola cuando le corresponde su turno, y ejecuta el envío real por el WebSocket.

Es importante notar que estos dos hilos **nunca ejecutan código al mismo tiempo sobre el mismo dato** — no hay necesidad de candados (*locks*) ni mecanismos de sincronización adicionales, porque `run_coroutine_threadsafe` ya se encarga de que el cruce entre hilos ocurra de forma segura. El hilo secundario solo "deja el mensaje en el buzón" del *event loop*; nunca toca directamente el socket del WebSocket.

Esta misma separación es la razón por la que, mientras `sniff()` sigue bloqueado capturando paquetes en el hilo secundario, el backend sigue siendo capaz de responder de inmediato a un `POST /api/capture/stop` en el hilo principal — ambos hilos avanzan de forma independiente, y solo se comunican brevemente a través de `capture_state` (una simple lectura de variable, sin necesidad de sincronización) y de `run_coroutine_threadsafe` (para el envío de datos).

## 6. Filtrado por protocolo (BPF)

El filtrado de tráfico se implementa mediante el parámetro `filter` de `sniff()`, que acepta sintaxis BPF (Berkeley Packet Filter), la misma que usa `tcpdump`.

| Protocolo | Filtro BPF | Observación |
|---|---|---|
| ARP | `arp` | Palabra clave directa |
| ICMP | `icmp` | Palabra clave directa |
| IGMP | `igmp` | Palabra clave directa |
| TCP | `tcp` | Palabra clave directa |
| UDP | `udp` | Palabra clave directa |
| PIM | `ip proto 103` | No tiene palabra clave BPF propia; se filtra por número de protocolo IP |
| DVMRP | `igmp and igmp[0] = 0x13` | Viaja encapsulado dentro de mensajes IGMP, distinguido por el campo de tipo |
| MSDP | `tcp port 639` | No es protocolo de capa 3/4 propio; corre sobre TCP en el puerto 639 |

La validación del protocolo solicitado se refuerza en el esquema de entrada mediante un `Enum` de Pydantic (`Protocols(str, Enum)`), lo que impide que la API acepte protocolos fuera de los ocho soportados y mejora la documentación automática generada por FastAPI (`/docs`).

**Nota de prueba:** dado que PIM, DVMRP y MSDP no circulan de forma natural en redes convencionales, su validación funcional requiere generarlos explícitamente (por ejemplo, mediante una topología con routers multicast configurados en GNS3) en vez de depender de tráfico orgánico.

## 7. Detención anticipada de la captura

Se implementó mediante el parámetro `stop_filter` de Scapy, una función evaluada después de cada paquete capturado. Si devuelve `True`, Scapy detiene la captura de inmediato, sin esperar a alcanzar el `count` solicitado:

```python
def _stop_filter(pkt):
    return capture_state.stop_requested
```

El endpoint `POST /api/capture/stop` únicamente cambia esa bandera a `True`; es el propio hilo de captura, en su siguiente iteración, quien realmente detiene el proceso al revisarla. Esto implica una limitación relevante: si no hay tráfico nuevo llegando por la interfaz capturada, la detención no ocurre de inmediato, sino hasta que llega el siguiente paquete que dispare la evaluación del filtro.

## 8. Infraestructura de red para captura real

La captura de tráfico físico desde un contenedor Docker presentó una limitación de plataforma: en Docker Desktop (Windows/Mac), los contenedores corren dentro de una máquina virtual Linux oculta, sin acceso directo al hardware de red del equipo anfitrión, incluso usando `network_mode: host`.

La solución adoptada fue correr el backend en un contenedor Docker nativo dentro de una máquina virtual Linux (VirtualBox), donde `network_mode: host` sí otorga acceso directo a las interfaces de red reales de la VM:

```yaml
backend:
  network_mode: host
  cap_add:
    - NET_ADMIN
    - NET_RAW
```

La VM se configuró con dos adaptadores de red:

- **`enp0s3`** — modo NAT (posteriormente conectado a un nodo NAT dentro de la propia topología de GNS3), utilizado para acceso a internet durante el desarrollo (`apt`, `pip`, `npm`, etc.).
- **`enp0s8`** — modo "Solo anfitrión", conectado como nodo Cloud dentro de la topología de GNS3, y asignado con una IP dentro del segmento de red simulado. Esta es la interfaz que Scapy utiliza para capturar tráfico real generado por los dispositivos de la topología (`capture_state.iface`).

### 8.1 Por qué el frontend deja de encontrar al backend por su nombre

En una configuración normal de Docker Compose, todos los contenedores de un mismo proyecto (`backend`, `frontend`) se conectan a una **red bridge**: una red virtual privada que crea Docker, donde cada contenedor puede llamar a los demás usando su nombre de servicio como si fuera un dominio (por ejemplo, `http://backend:8000`). Es Docker quien traduce internamente ese nombre a la dirección correspondiente, de forma similar a como un DNS traduce un dominio a una IP.

El problema es que `network_mode: host` es, por definición, incompatible con pertenecer a esa red bridge: le dice al contenedor "no uses ninguna red virtual de Docker, usa directamente la red de la máquina que te contiene". Al quitar al backend de la red bridge, el nombre `backend` deja de significar algo para el `frontend` — ya no hay una traducción de nombre a dirección para ese contenedor.

### 8.2 El camino completo de una repetición del frontend al backend

Para resolver esto, se aprovechó que Docker sigue creando su red bridge normalmente para los contenedores que sí participan en ella (como `frontend`), y que esa red bridge tiene una **puerta de enlace** (*gateway*) que apunta de regreso hacia el sistema que la contiene — en este caso, la VM de Linux. Esa puerta de enlace es la IP `172.17.0.1`, obtenida con `ip addr show docker0` dentro de la VM.

El recorrido completo de una petición, por ejemplo desde el formulario de captura, queda así:

1. El navegador (cargado desde `localhost:5173`) hace una petición a una ruta relativa, como `/api/capture/start` o `/ws/capture/` — sin conocer ninguna IP interna.
2. Vite, corriendo dentro del contenedor `frontend`, intercepta esa ruta gracias a su configuración de proxy, y la reenvía hacia `172.17.0.1:8000`.
3. Esa petición sale del contenedor `frontend`, cruza la red bridge de Docker, y llega a la puerta de enlace (`172.17.0.1`) — que es, en la práctica, la propia VM de Linux.
4. Dentro de la VM, el backend (en `network_mode: host`) está escuchando directamente en el puerto 8000, sin ningún mapeo de puertos de por medio — la petición llega a `uvicorn` como si este corriera nativamente en la VM.

En resumen: **`frontend` (dentro de la red bridge) → `172.17.0.1` (la puerta de salida hacia la VM) → puerto 8000 (donde el backend, en modo host, escucha directo en la VM)**. Gracias al proxy de Vite, el navegador nunca necesita conocer esta IP intermedia — sigue usando siempre rutas relativas (`/api/...`, `/ws/...`).

### 8.3 Por qué el backend necesita permisos elevados (`cap_add`) y `libpcap-dev`

Capturar tráfico de red directamente desde una interfaz (lo que hace Scapy con `sniff()`) no es una operación que cualquier proceso pueda realizar por defecto — a nivel de sistema operativo, requiere abrir un **socket raw**, un tipo especial de socket que da acceso a las tramas de red tal como llegan, antes de que el sistema operativo las procese normalmente. Por razones de seguridad, Linux reserva esta capacidad únicamente a procesos con privilegios elevados.

Dentro de un contenedor Docker, incluso corriendo en modo host, el proceso **no hereda automáticamente** privilegios de administrador sobre la red — Docker aísla las capacidades del contenedor por defecto, aunque comparta el espacio de red con el sistema. Por eso es necesario otorgar explícitamente dos capacidades (*capabilities*) de Linux al contenedor del backend:

```yaml
cap_add:
  - NET_ADMIN
  - NET_RAW
```

- **`NET_RAW`** — permite crear sockets raw, el mecanismo de bajo nivel que Scapy necesita para leer tramas de red directamente.
- **`NET_ADMIN`** — permite operaciones administrativas de red más amplias (como configurar interfaces en modo promiscuo), necesarias para que la captura vea tráfico que no va dirigido específicamente a la VM.

Se optó deliberadamente por otorgar solo estas dos capacidades puntuales, en vez de usar `privileged: true` (que le daría al contenedor acceso completo a todo el hardware del sistema, un riesgo de seguridad innecesario para lo que realmente se necesita).

`libpcap-dev`, por su parte, resuelve un problema distinto y complementario: `NET_ADMIN`/`NET_RAW` le dan al contenedor **permiso** para capturar tráfico, pero Scapy además necesita una **herramienta** capaz de compilar los filtros BPF (como `tcp` o `arp`) a instrucciones que el kernel pueda ejecutar eficientemente — esa herramienta es la librería de sistema `libpcap`. Sin ella instalada en la imagen del contenedor, Scapy puede capturar tráfico sin filtro, pero falla en cuanto se le pide aplicar un filtro (`filter=...`), como ocurrió durante el desarrollo de este módulo (ver sección 9). En resumen: los permisos (`cap_add`) autorizan *qué* puede hacer el contenedor, mientras que `libpcap-dev` provee *con qué herramienta* Scapy cumple esa tarea de filtrado.

## 9. Manejo de errores conocidos

- **`WebSocketDisconnect`** — se captura explícitamente para distinguir una desconexión normal del cliente (usuario cierra la pestaña o navega a otra vista) de un error real, evitando tracebacks innecesarios en los logs del servidor.
- **`ImportError: libpcap is not available`** — error identificado durante el desarrollo, causado por la ausencia de la librería de sistema `libpcap-dev` en la imagen base del contenedor backend. Se resolvió agregando su instalación explícita en el `Dockerfile` mediante `apt-get install libpcap-dev`, dependencia necesaria para que Scapy compile filtros BPF.
- **`WARNING: No supported WebSocket library detected`** — causado por instalar `uvicorn` sin el extra `[standard]`, que incluye las librerías necesarias para el protocolo WebSocket. Se resolvió ajustando `requirements.txt` a `uvicorn[standard]`.

---

*Documento en desarrollo — pendiente de complementar con capturas de pantalla de la interfaz y resultados de pruebas funcionales por protocolo.*