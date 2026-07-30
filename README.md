# TT-APP-WEB-RC
Aplicación web para la manipulación de paquetes de red aplicado a la
unidad de aprendizaje de Redes de Computadoras en ESCOM, usando la
arquitectura MVC.

## Guías

- [Guía de Git](docs/git_guide.md)
- [Guía de Python](docs/python_guide.md)
- [Guía de React + Vite](docs/react_guide.md)

## Arquitectura de la aplicación usando Docker Compose
### 1. Configuración de los Contenedores (Dcokerfile y Compose)
Para que la aplicación funcione en cualquier computadora sin instalar
librerías locales, dividimos la arquitectura en dos servicios
independientes administrados por Docker Compose.

**El contenedor del Backend (FastAPI + Uvicorn)**

- **Función:** Ejecuta el servidor en Python y procesa la lógica de
la API.
- **Comando de inicio:**
`uvicorn app.main:app_web -- host 0.0.0.0--port 8000 --reload`
- **Puntos clave de su configuración:**
    - `--host 0.0.0.0`: Le ordena a Uvicorn que escuche peticiones
    provenientes de cualquier interfaz de red (no solo `127.0.0.1`
    dentro del contenedor).
    Esto es obligatorio para que Docker pueda reenviarle tráfico
    desde la red externa.
    - `--port 8000`: Especifica el puerto interno en el que el
    servidor escucha.
    - `environment: PYTHONUNBUFFERED=1`: Asegura que las salidas
    de `print()` y los errores de Python se muestren inmediatamente
    en la terminal de Docker.

**El contenedor del Frontend (React + Vite)**
- **Función:** Sirve los archivos del cliente en desarrolllo y
proporciona *Hot Module Replacement* (HMR) para actualizar la pantalla
al editar el código.
- **Comando de inicio:** `npm run dev` (que ejecuta el servidor de
desarrollo de Vite).
- **Puntos clave de su configuración:**
    - En el `vite.config.js` se configura
    `server: {host: '0.0.0.0', port: 5173}`. Al igual que en Uvicorn,
    expone el servidor a la red del contenedor para recibir conexiones.
    - En el `docker-compose.yml` se incluye el volumen
    `/app/node_modules` para evitar que las dependencias instaladas
    dentro del contenedor sean sobrescritas por el sistema operativo
    de tu computadora.

### 2. Comunicación entre Contenedorres y el DNS Interno de Docker
Docker Compose cre automáticamente una red privada compartida
(`app-web-network`).
Dentro de esta red ocurren dos dinámicas distintas: la comunicación
Contenedor a Contenedor y la comunicación Computadora a Contenedor.

**Relación de Puertos: Servidor de Docker vs. Tu Computadora**
Cuando defines en el `docker-compose.yml`.

```yaml
ports:
    - "5173:5173" # Frontend
    - "8000.8000" # Backend
```

Estas declarando un mapeo de puertos con la sintaxis
`PUERTO_DE_TU_PC: PUERTO_DEL_CONTENEDOR`.
- Desde tu Navegador (Máquina Física / Host):
Tu sistema operativo no está dentro de la red de Docker. Para acceder a
las aplicaciones usas `localhost` junto con el puerto expuesto a la
izquierda:
    - Frontend: `http://localhost:5173`
    - Backend (Swagger Docs): `http://localhost:8000/docs`
- Entre contenedores (Red Privada de Docker):
Dentro de la red virtual, cada contenedor es una máquina independiente
aislada con su propio `localhost`.
    - Para el contenedor `frontend`, `localhost` significa él mismo
    (donde corre Vite).
    - Para el contenedor `backend`, `localhost` significa él mismo
    (donde ocurre FastAPI).

**El servidor DNS interno**
Para que un contenedor pueda hablar con otro sin usar direcciones IP
variables, Docker asigna automáticamente a la red un
**servidor DNS interno**.

El nombre de cada dominio dentro de la red privada coincide exactamente
con el **nombre del servicio** en el archivo `docker-compose.yml`:

```
Servicio 'backend' ---> Asociado a DNS interno: http://backend:8000
Servicio 'frontend' ---> Asociado a DNS interno: http://frontend:5173
```

### 3. La implementación del Proxy en Vite y la Solución a CORS
Cuando la aplicación corre en el navegador de un usuario, todas las
peticiones nacen en `http://localhost:5173`. Si intentas hacer una
petición directa con Axios a `http://localhost:8000`, el navegador
bloquea la llamada por la **Política del Mismo Origen (SOP)** al
cambiar el puerto (`5173` != `8000`), a menos que configures cabeceras
de CORS.

Para simplificar esto y desacoplar la arquitectura, implementamos un
**Proxy Sde Desarrollo en Vite**.

```
   [ TU NAVEGADOR ]
http://localhost:5173
           |
           | 1. Petición relativa: axios.get('/api/capture')
           |
           ▼
┌---------------------┐
| CONTENEDOR FRONTEND |
| (Servidor de Vite)  |
└---------------------┘
           |
           | 2. Intercepta '/api' y reenvía por la red de Docker
           |    http://backend:8000/api/capture
           |
           ▼
┌---------------------┐
| CONTENEDOR BACKEND  |
| (FastAPI / Uvicorn) |
└---------------------┘
```

**La configuración en `vite.config.js`**

```javascript
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    host: '0.0.0.0', // Permite que Docker exponga el puerto 5173
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://backend:8000', // Docker redirige internamente
        changeOrigin: true,
      }
    }
  }
})
```

**¿Cómo Funciona la Regla y el Uso del Prefijo `/api/`?**
1. **Filtro de Peticiones:** El prefijo `/api` le sirve a Vite como una
marca de distinción.
    - Si en React pides una vista o recurso visual (ej. `/capture` o
    `/main.js`), Vite entiende que es código cliente y lo sirve
    localmente.
    - Si haces una petición HTTP que empieza con `/api/` (ej.
    `axios.get('/api/capture')`), Vite la identifica como una llamada
    a la API de datos.
2. **Reenvío Transparente (Server-to-Server):**
    - Vite toma la llamada a `/api/capture` y la reenvía internamente
    por la red de Docker a `http://backend:8000/api/capture`.
    - Como la comunicación entre el contenedor `frontend` y `backend`
    ocurre en el lado del servidor (no en el navegador web),
    **la política de CORS del navegador no aplica aquí**.
3. **Eliminación del Problema de CORS**:
Desde la perspectiva del navegador, la petición siempre se envió a
`http://localhost:5173/api/capture` (el mismo dominio y puerto desde el
que cargó la página). Al no haber cambio de origen, **el navegador
jamás bloquea la respuesta ni lanza errores de CORS**, eliminando la
necesidad de lidiar con middlewares complejos en desarrollo. 
