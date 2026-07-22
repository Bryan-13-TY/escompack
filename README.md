# TT-APP-WEB-RC
Aplicación web para la manipulación de paquetes de red aplicado a la unidad de aprendizaje de Redes
de Computadoras en ESCOM, usando la arquitectura MVC.

## Alumnos

- García Escamilla Bryan Alexis
- Meléndez Macedonio Rodrigo
- Castillo Bonilla Angel Eduardo

## Guías

- [Guía de Git](docs/git_guide.md)
- [Guía de Python](docs/python_guide.md)
- [Guía de React + Vite](docs/react_guide.md)

## Arquitectura del proyecto
Para la aplicación web se usa la arquitetcura MVC:

* Vista: Se usa la bibllioteca de JS, React.
* Controlador: Se usa el framework FastAPI.
* Modelo: Se usa la biblioteca Scapy y el sistema de base de datos NoSQL, MongoDB.

## Flujo actual para trabajar con FastAPI y React + Vite
Desde la raíz de la aplicación ejecuta los siguientes comandos.

### Backend en Python con FastAPI
Primero necesitas descargar los paquetes necesarios.

```bash
# 1. Crea un entorno virtual
mingw32-make p-environment

# 2. Actualiza el pip del entorno virtual
mingw32-make p-upgrade-pip

# 3. Instala los paquetes necesarios
mingw32-make p-install
```

Luego ejecutamos la API con FastAPI.

```bash
mingw32-make p-run-api
```

Y dirigete a la dirección [FastAPI](http://127.0.0.1:8000/) o
[FastAPIDocs](http://127.0.0.1:8000/docs) para ver la documentación.

### Frontend con React + Vite
Primero necesitas instalar las dependencias necesarias.

```bash
mingw32-make rv-install
```

Luego ejecutamos el proyecto de React + Vite.

```bash
mingw32-make rv-run
```

Y diregete a la dirección [ReactVite](http://localhost:5173/).
