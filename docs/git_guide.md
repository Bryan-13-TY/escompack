# 🛠️ Guía de Git y Flujo de Trabajo

Este documento contiene los comandos esenciales que usamos para mantener
el código sincronizado y evitar conflictos.

## 📥 1. Al iniciar (Descargar cambios)
Antes de escribir cualquier línea de código, primero asegurate de descargar las
últimas actualizaciones.

```bash
# 1. Cambia a la rama principal
git checkout main

# 2. Descarga las últimas actualizaciones
git pull origin main
```

## 🌿 2. Crear una nueva rama (Rama propia)
Se recomienda que no trabajes sobre la rama `main`. Lo mejor es que crees una rama
para trabajar ahí las nuevas funcionalodades, de esta forma no ensuciamos la rama
principal.

```bash
# 1. Crea la rama y cambia a ella automáticamente
git checkout -b branch-name

# 2. Consulta la rama en la que te localizas
git branch
```

## 📤 3. Al terminar el trabajo (Subir cambios)
Una vezque termines tu tarea ten mucho cuidado de que lo que hayan hecho
tus compañeros no interfiera con lo que acabas de hacer.

```bash
# 1. Revisa los cambio hechos (se recomienda)
git status

# 2. Prepara TODOS los archivos modificados y nuevos
git add .

# 3. Guarda localmente los cambios
git commit -m "Título: Qué hace este cambio" -m "Descripción: Descripción
detallada"

# 4. Cambia a main y descarga las últimas actualizaciones
git checkout main
git pull origin main

# 5. Regresa a la rama de trabajo
git checkout branch-main

# 6. Fusiona lo nuevo de main dentro de tu rama
git merge main

# 7. Sube la rama a GitHub para que los demás lo vean
git push origin branch-name
```

> 💡 **Tip para descripciones largas en Commit:** 
> Para agregar más detalles, presiona `Enter` dos veces en la
> terminal de VS Code para dejar una línea en blanco y escribe los
> párrafos detallados abajo antes de hacer el commit.

*Si hay conflictos de código, VS Code avisará para que elijas*
*qué líneas conservar antes de hacer el push final.*

## 4. Continua en la web de GitHub
Dirigete a la página del repositorio [TT-APP-WEB-RC](https://github.com/Bryan-13-TY/TT-APP-WEB-RC).

### 1. Crea un *Pull Request* en la web
Después de subir tu rama a GitHub verás un botón verde que dice *Compare & pull request*.

- Un *Pull Request* es básicamente una solicitud para indicarle al resto del equipo
que ya termine mis cambios en la rama que subí y que pueden resvisarla entes de
fusionarlos con la rama `main`.

Aparecerá un botón verde que dice *Create pull request*.

### 2. Fusiona la rama subida con la rama `main`
Aparecerá un botón verde que dice *Merge pull request* y luego otro que dice *Confirm merge*.

### 3. Elimina la rama subida del servidor de GitHub
Una vez de confirmar la fusión borra la rama que subiste con el botón que dice *Delete branch*.

## 5. Elimina la rama creada localmente
Si ya no vas a trabajar sobre esa rama, no tiene sentido seguir manteniendola.

```bash
# Cambia a la rama main
git checkout main

# Borra la rama creada
git branch -d branch-name 
```

## 6. Descarga los últimas actualizaciones

```bash
git pull origin main
```
