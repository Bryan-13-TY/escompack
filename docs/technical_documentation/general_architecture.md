# Documentación técnica — Arquitectura general del sistema
 
**Proyecto:** ESCOMPack — Aplicación web para la manipulación de paquetes de red aplicado a la unidad de aprendizaje de Redes de Computadoras en ESCOM
**Trabajo Terminal No.:** 2027-A020
 
---

## 1. Panorama general
 
ESCOMPack sigue el patrón arquitectónico **Modelo-Vista-Controlador (MVC)**, distribuido en tres capas físicamente separadas y comunicadas por red:

- **Vista (V)** — interfaz gráfica en React, responsable de la presentación y captura de acciones del usuario.
- **Controlador (C)** — API REST y endpoints WebSocket en FastAPI, responsable de recibir peticiones, orquestar el procesamiento y devolver resultados.
- **Modelo (M)** — capa de lógica de negocio: motor de captura de red (Scapy), procesamiento/desencapsulación de paquetes, validación de protocolos, y persistencia en MongoDB.

Esta separación permite que cada capa evolucione de forma relativamente independiente — por ejemplo, el frontend puede cambiar su diseño visual sin afectar cómo Scapy captura paquetes, siempre que el contrato de la API (los endpoints y formatos de datos) se mantenga estable.

## 2. Patrones de comunicación entre capas
 
El sistema utiliza dos patrones de comunicación distintos entre la Vista y el Controlador, elegidos según la naturaleza de cada interacción:

| Patrón | Cuándo se usa | Ejemplo en el sistema |
|---|---|---|
| **REST (HTTP request/response)** | Interacciones puntuales de solicitud única: el cliente pide algo, el servidor responde una vez y termina | Iniciar una captura, detenerla, guardar cambios de edición, solicitar una exportación |
| **WebSocket (conexión persistente bidireccional)** | Flujos de datos continuos, donde el servidor necesita enviar múltiples actualizaciones sin que el cliente las solicite una por una | Transmisión en vivo de los paquetes conforme se capturan |

Esta distinción es intencional: usar REST para todo obligaría al frontend a preguntar constantemente "¿ya hay paquetes nuevos?" (*polling*), generando tráfico innecesario y retrasos; usar WebSocket para todo agregaría complejidad de manejo de conexión persistente donde no se necesita (por ejemplo, para guardar una configuración no tiene sentido mantener un canal abierto).

## 3. Diagrama de despliegue (Docker)
 
El sistema se distribuye en dos contenedores independientes, orquestados con Docker Compose:

```
┌────────────────────────────────────────────────────────────────┐
│                     Máquina virtual (Linux)                    │
│                                                                │
│   ┌─────────────────────────┐                                  │
│   │  Contenedor: backend    │   network_mode: host             │
│   │  FastAPI + Scapy        │   (acceso directo a las          │
│   │  Puerto 8000            │    interfaces reales de la VM)   │
│   └───────────┬─────────────┘                                  │
│               │ escucha en 0.0.0.0:8000                        │
│               │                                                │
│   ┌───────────┴─────────────────────────────┐                  │
│   │        Red bridge de Docker (docker0)   │                  │
│   │        Gateway: 172.17.0.1              │                  │
│   │                                         │                  │
│   │   ┌───────────────────────┐             │                  │
│   │   │ Contenedor: frontend  │             │                  │
│   │   │ Vite + React          │             │                  │
│   │   │ Puerto 5173           │─────────────┘                  │
│   │   └───────────────────────┘             │                  │
│   └─────────────────────────────────────────┘                  │
│                                                                │
│   Interfaces de red físicas/virtuales de la VM:                │
│   • enp0s3 — NAT (acceso a internet / nodo NAT de GNS3)        │
│   • enp0s8 — Solo anfitrión (conectada a topología GNS3)       │
└────────────────────────────────────────────────────────────────┘
```

**Por qué el backend y el frontend tienen configuraciones de red distintas:** el backend necesita capturar tráfico real de red mediante Scapy, lo cual exige acceso directo a las interfaces físicas/virtuales de la VM — algo que solo `network_mode: host` permite. El frontend, en cambio, no necesita ese acceso (solo sirve archivos estáticos y hace peticiones HTTP/WS), así que puede permanecer en la red bridge estándar de Docker, más simple y aislada. El detalle completo de por qué esta diferencia genera la necesidad del proxy de Vite y la IP `172.17.0.1` está documentado en la sección 8 de `documentacion_modulo_captura.md`.

## 4. Estructura de directorios del backend

```
backend/
├── app/
│   ├── main.py                  # Punto de entrada; registra los routers
│   ├── api/
│   │   └── v1/
│   │       ├── routers/         # Endpoints agrupados por módulo (capture, websocket, ...)
│   │       └── schemas/         # Modelos Pydantic de entrada/salida (CaptureRequest, etc.)
│   ├── capture_state.py         # Estado compartido en memoria del módulo de captura
│   └── protocol_filters.py      # Mapeo de protocolo → filtro BPF
├── requirements.txt
└── Dockerfile
```

Esta organización agrupa el código por responsabilidad (routers, esquemas, estado) en vez de por módulo funcional completo, lo cual facilita que los dos integrantes del equipo trabajen en distintos módulos (captura, procesamiento, reenvío, exportación) sin pisarse archivos, ya que cada uno probablemente tendrá su propio router y su propio esquema, compartiendo solo la estructura base.

## 5. Estructura de directorios del frontend

```
frontend/
├── src/
│   ├── App.jsx                  # Enrutador principal (React Router)
│   ├── pages/                   # Una vista completa por archivo (Bienvenida, PackageCapture, ...)
│   ├── components/              # Piezas reutilizables entre vistas (ProtocolInput, Button, ...)
│   ├── services/                # Llamadas centralizadas a la API (axios)
│   └── hooks/                   # Lógica reutilizable entre componentes
├── package.json
├── vite.config.js               # Configuración de proxy hacia el backend
└── Dockerfile
```

## 6. Estándares de calidad adoptados

Conforme a lo establecido en la metodología del proyecto, el desarrollo se alinea con los siguientes estándares internacionales:

- **ISO/IEC 25010** — calidad del producto de software.
- **ISO/IEC/IEEE 12207** — procesos del ciclo de vida del software.
- **ISO/IEC/IEEE 29119** — pruebas de software, aplicado a la validación funcional de cada módulo.
- **ISO/IEC/IEEE 26511** — documentación técnica y de usuario, aplicado a este mismo documento y a los específicos de cada módulo.

## 7. Documentos relacionados

- `documentacion_modulo_captura.md` — detalle técnico completo del módulo de captura de paquetes (arquitectura interna, manejo de hilos, filtros BPF, infraestructura de red).
- *(Pendiente)* Documentación de los módulos de procesamiento, reenvío y exportación de paquetes, conforme avancen las siguientes iteraciones.

---

*Documento en desarrollo — se actualizará conforme se implementen los módulos restantes del sistema.*

