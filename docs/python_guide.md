# 🛠️ Guía de Python y Flujo de Trabajo

Este documento contiene los comandos esencuales para trabajar con Python.

## 📥 Trabajar con un entorno virtual
Se recomienda crear un enotorno virtual para instalar los paquetes
necesarios y así no ensuciar el Python global.

```bash
# Llamamos al entorno virtual como venv por comodidad
py -m venv venv

# Activar el entorno virtual
venv/Scripts/activate

# Actualizar pip antes de instalar cualquier paquete (recomendado)
python.exe -m pip install --upgrade pip

# Instalar paquetes dentro del entorno
pip install package-name

# Instalar paquetes desde un archivo requirements.txt
pip install -r file-path

# Verificar la instalación de un paquete
py -m pip show package-name

# Guardar los paquetes instalados en un archivo de texto
pip freeze > requirements.txt

# Desactivar el entorno virtual
deactivate
```

## 📥 Trabajar con FastAPI

```bash
# 1. Instalar el servidor para FastAPI
pip install uvicorn

# 2. Correr el servidor desde el punto de entrada

uvicorn API-path:app-name --reload
```

## 📥 Trabajar con tests

```bash
# Instalar pytest
pip install pytest

# Ejecutar los tests
py -m pytest tests-path
```

*Los nombres de los archivos con los tests deben de iniciar con `test_`,*
*y la carpeta con dichos archivos debe uncluir el archivo `conftest.py`.*
