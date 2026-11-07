# ===== Definición de rutas ======

SRC_P_API = app.main
SRC_P_INSTALL = backend/requirements.txt

# =====================
# COMANDOS PARA PYTHON
# =====================

p-environment:
	cd backend && python3 -m venv venv

p-upgrade-pip:
	./backend/venv/bin/python3 -m pip install --upgrade pip

p-install:
	./backend/venv/bin/pip install -r $(SRC_P_INSTALL)

p-run-api:
	cd backend && uvicorn $(SRC_P_API):app_web --reload

p-tests:
	py -m pytest backend/tests

# ===========================
# COMANDOS PARA REACT + VITE
# ===========================

rv-install:
	cd frontend && npm install

rv-run:
	cd frontend && npm run dev

# ====== Comandos extra ======

tree:
	tree /F > tree.txt
