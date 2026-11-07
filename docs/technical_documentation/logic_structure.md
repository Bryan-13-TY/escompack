```
backend/
├── app/
│   ├── api/v1/routers/     # captures, captures_index, health, websocket
│   ├── core/               # conexión a MongoDB y filtros BPF por protocolo
│   ├── models/             # estado compartido de la captura
│   ├── schemas/            # esquemas Pydantic de entrada y salida
│   ├── captures/           # archivos .pcap generados
│   └── main.py             # punto de entrada de la API
├── requirements.txt        # dependencias
└── Dockerfile
```

```
frontend/
├── src/
│   ├── assets/                     # iconos y fondos
│   ├── components/                 # componentes reutilizables
│   ├── hooks/                      # hooks personalizados
│   ├── pages/                      # pantallas de la aplicación
│   │   ├── Home/                   # interfaz inicial
│   │   ├── NotFound/               # pantalla 404
│   │   ├── PackageCapture/         # captura de paquetes
│   │   ├── PackageManipulation/    # manipulación de paquetes
│   │   ├── PackageExport/          # exportación de paquetes
│   │   └── PackageForwarding/      # reenvío de paquetes
│   └── styles/                     # estilos globales
├── vite.config.js                  # proxy hacia el backend
└── Dockerfile
```
