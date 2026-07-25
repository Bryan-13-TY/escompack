FROM node:22-alpine

WORKDIR /app

# Copiar package.json
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar código
COPY . .

# Exponer puerto
EXPOSE 5173

# Ejecutar en modo desarrollo
CMD ["npm", "run", "dev"]
