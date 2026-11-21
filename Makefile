# ===== Definición de rutas ======

SRC_P_API = app.main
SRC_P_INSTALL = backend/requirements.txt

# =====================
# COMANDOS PARA PYTHON
# =====================

create-python-environment:
	cd backend && python3 -m venv venv

upgrade-python-pip:
	./backend/venv/bin/python3 -m pip install --upgrade pip

install-python-dependences:
	./backend/venv/bin/pip install -r $(SRC_P_INSTALL)

gns3-projects:
	curl -s -u "admin:YtjrdLone1XnzEW5dkuzXts0Reow7ATBZRPvhtEsZF144P9MClREZhbFims8zvsR" http://localhost:3080/v2/projects | python3 -m json.tool

gns3-computes:
	curl -s -u "admin:YtjrdLone1XnzEW5dkuzXts0Reow7ATBZRPvhtEsZF144P9MClREZhbFims8zvsR" http://localhost:3080/v2/computes | python3 -m json.tool

gns3-create-topology:
	GNS3_USER=admin GNS3_PASSWORD=YtjrdLone1XnzEW5dkuzXts0Reow7ATBZRPvhtEsZF144P9MClREZhbFims8zvsR python3 gns3_topology.py

gns3-proof-capture:
	GNS3_USER=admin GNS3_PASSWORD=YtjrdLone1XnzEW5dkuzXts0Reow7ATBZRPvhtEsZF144P9MClREZhbFims8zvsR python3 gns3_captura.py 7628d471-1596-412a-9d25-48a0bd720978 -s 25

pcap-tests:
	python3 -m pytest backend/tests

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
