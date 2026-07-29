# ====== PARA EL FRONTEND DE LA APLICACIÓN ======

# ====== Punto de partida ======
# Utiliza como base la imagen de Linux (Alphine Linux)
# con la versión 22 de Node.js
FROM node:25.9.0-alpine

# ====== Ubicación de trabajo ======
# Crea la carpeta /app dentro del contenedor
# todas las siguientes instrucciones se ejecutan
# dentro de esta carpeta
WORKDIR /app

# ====== Copia de manifiestos ======
# Copia los archivos de configuración de dependencias
# desde la computadora al contenedor
COPY package.json package-lock.json ./

# ====== Instalación ======
# Ejecuta la instalación de todos los paquetes y
# librerías de las dependencias
RUN npm install

# ====== Copia del código ======
# Copia el resto del código del frontend desde la
# computadora al contenedor
COPY . .

# ====== Documentación de puertos ======
# El frontend dentro del contenedor escuchará en el
# puerto 5173
EXPOSE 5173

# ====== Comando de inicio ======
# Al iniciar el contenedor se ejecuta el comando
# para levantar el servidor de React + Vite
CMD ["npm", "run", "dev"]
