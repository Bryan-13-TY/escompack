# 🛠️ Guía de Git y Flujo de Trabajo

Este documento contiene los comandos esenciales que usamos para mantener
el código sincronizado y evitar conflictos.

## 📥 1. Al iniciar (Descargar cambios)
Antes de escribir cualquier línea de código, primero hay que asegurarnos
de cargar los cambios.

```bash
# 1. Cambiar a la rama principal
git checkout main

# 2. Descargar las últimas actualizaciones
git pull origin main
```

## 🌿 2. Crear una nueva rama (Rama propia)
Se recomienda no trabajar directamente sobre la rama `main`. Lo mejor
es crear una rama para una nueva funcionalidad, así no ensuciomos la
rama `main`.

```bash
# 1. Crear la rama y cambiar a ella automáticamente (mejor opción)
git checkout -b branch-name

# 1.1. Crear la rama (comando antiguo)
git branch branch-name

# 1.2. Cambiar a la nueva rama (comando antiguo)
git checkout branch-name

# 2. Consultar la rama en la que nos localizamos
git branch
```

## 📤 3. Al terminar el trabajo (Subir cambios)
Al terminar los cambios para guardarlos en el repositorio remoto
(GitHub).

```bash
# 1. Ver los cambio hechos (se recomienda)
gis status

# 2. Preparar TODOS los archivos modificados y nuevos
git add .

# 3. Guardar localmente los cambios
git commit -m "Título: Qué hace este cambio" -m "Descripción: Descripción
detallada"

# 4. Subir la rama a GitHub para que los demás lo vean
git push origin branch-name 
```

> 💡 **Tip para descripciones largas en Commit:** 
> Para agregar más detalles, hay que presionar `Enter` dos veces en la
> terminal de VS Code para dejar una línea en blanco y escribe los
> párrafos detallados abajo antes de hacer el commit.

## 🔄 4. Actualizar la rama antes del Push (Evitar conflictos)
Descargar los cambios en `main` antes de subir la rama.

```bash
# Cambiamos a main y descargamos los cambios
git checkout main
git pull origin main

# Regresar a la rama de trabajo
git checkout branch-name

# Fusionar lo nuevo de main dentro de la rama
git merge main
```

*Si hay conflictos de código, VS Code avisará para que elijas*
*qué líneas conservar antes de hacer el push final.*
