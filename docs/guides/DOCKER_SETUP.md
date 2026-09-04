# Ejecutar Proyecto con Docker Compose

## Requisitos previos

- **Docker Desktop** instalado ([descargar](https://www.docker.com/products/docker-desktop))
- Acceso a la terminal/CMD

## Pasos para ejecutar

### 1. Levantar los servicios

```bash
docker-compose up --build
```

**Explicación:**
- `up` → levanta los contenedores
- `--build` → reconstruye las imágenes (solo la primera vez)

**Salida esperada:**
```
app-web-backend | Application startup complete [uvicorn]
app-web-frontend | VITE v8.x.x build ready in Xxx ms
```

### 2. Acceder a los servicios

- **Frontend (React + Vite):** http://localhost:5173
- **Backend (FastAPI):** http://localhost:8000
- **API Docs (Swagger):** http://localhost:8000/docs

### 3. Detener los servicios

```bash
docker-compose down
```

## Comandos útiles

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Ver logs específicos
docker-compose logs -f backend
docker-compose logs -f frontend

# Ejecutar en background
docker-compose up -d

# Eliminar todo (contenedores, redes, etc.)
docker-compose down -v
```

## Estructura de la red

```
┌─────────────────────────────────┐
│    app-web-network (bridge)     │
├─────────────────────────────────┤
│                                 │
│  Backend (FastAPI)              │
│  Port: 8000                     │
│  URL: http://backend:8000       │
│                                 │
│  Frontend (React + Vite)        │
│  Port: 5173                     │
│  URL: http://localhost:5173     │
│                                 │
└─────────────────────────────────┘
```

## Configurar frontend para hablar con el backend

En tu código React, usa:

```javascript
// Dentro del contenedor
const API_URL = process.env.VITE_API_URL || 'http://localhost:8000';

// Hacer requests
const response = await fetch(`${API_URL}/tu-endpoint`);
```

O en `frontend/.env`:
```
VITE_API_URL=http://backend:8000
```

## Modo desarrollo vs. producción

### Desarrollo (actual)
- **Hot reload** activado en ambos servicios
- Volúmenes sincronizados
- Ideal para desarrollo activo

### Producción (cuando lo necesites)
Modifica `docker-compose.yml` en la sección `frontend`:
```yaml
command: npm run build && npm run preview
```

## Troubleshooting

**Puerto ya en uso:**
```bash
docker-compose down  # Detener todo
docker-compose up --build
```

**Cambiar puertos:**
Edita `docker-compose.yml`:
```yaml
ports:
  - "8001:8000"  # Backend en 8001
  - "5174:5173"  # Frontend en 5174
```

**Logs de error:**
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```
