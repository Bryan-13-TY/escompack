# ====== PARA EL BACKEND DE LA APLICACIÓN ======

# ====== Punto de partida ======
# Utiliza como base la imagen de Linux (Debian Linux)
# con la versión 3.14.4
FROM python:3.14.4-slim

# ====== Ubicación de trabajo ======
# Crea la carpeta /app dentro del contenedor
# todas las siguientes instrucciones se ejecutan
# dentro de esta carpeta
WORKDIR /app

# ====== Intalación de libpcap ======
# Instalamos libpcap para capturar y filtrar
# paquetes dentro del contenedor del backend.
# Scapy la necesita para compilar filtros BPF.
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpcap-dev \
    && rm -rf /var/lib/apt/lists/*

# ====== Copia de manifiestos ======
# Copia el archivo de depencias con la lista
# de librerías de Python desde la computadora
# al contenedor
COPY requirements.txt .

# ====== Instalación ======
# Ejecuta la instalación de todos los las
# librerías necesarias evitando que pip guarde
# los archivos descargados .whl en caché
RUN pip install --no-cache-dir -r requirements.txt

# ====== Copia del código ======
# Copia la carpeta app donde se encuentra en punto de
# entrada de la API al directorio /app/app/ en el
# contenedor
COPY app/ ./app/

# ====== Documentación del puertos ======
# La API (backend) dentro del contenedor escuchará en el
# puerto 8000
EXPOSE 8000

# ====== Comando de inicio ======

CMD ["uvicorn", "app.main:app_web", "--host", "0.0.0.0", "--port", "8000"]
