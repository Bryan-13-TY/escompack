# Guía de Docker CLI y Docker Compose
Aquí se listan los comandos esenciales de **Docker CLI** para contenedores individuales y para orquestación con **Docker Compose** permiten administrar todo el ciclo de vida de la aplicación.

## Docker CLI
```docker
# Crea y arranca un contenedor en segundo plano
docker run -d --name <name> <image>

# Muestra los contenedores activos
docker ps

# Muestra todos los contenedores (activos y detenidos)
docker ps -a

# Detiene un contenedor activo
docker stop <name_or_id>

# Inicia un contenedor detenido
docker start <name_or_id> 

# Reinicia un contenedor
docker restart <name_or_id>

# Borra un contenedor detenido
docker rm <name_or_id>

# Revisa los registros de actividad de un contenedor
docker logs <name_or_id>

# Entra a la consola interactiva de un contenedor
docker exec -t <name> bash

# Muestra la lista de imágenes guardadas localmente
docker images

# Descarga una imagen desde un registro público
docker pull <name>

# Construye una imagen usando un Dockerfile en la ruta actual
docker build -t <name>
```

## Docker Compose
```docker
# Crea y arranca en segundo plano los servicios del archivo YAML
docker compose up -d

# Reconstruye las imágenes antes de iniciar los servicios
docker compose up -d --build

# Detiene y elimina los contenedores, redes y elementos creados
docker compose down

# Detiene los servicios y borra también los volumenes asociados
docker compose down -v

# Lista los contenedores del proyecto actual
docker compose ps

# Muestra y sigue en tiempo real los registros de todos los servicios
docker compose logs -f

# Apaga los servicios sin borrarlos
docker compose stop

# Enciende los servicios que estaban apagados
docker compose start

# Reinicia todos los servicios del entorno
docker compose restart

# Ejecuta una acción dentro del contenedor de un servicio
docker compose exec <service> <command> 
```
