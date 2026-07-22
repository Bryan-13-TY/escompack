SRC_API = app.main
SRC_INSTALL = backend/requirements.txt

tree:
	tree /F > tree.txt

environment:
	py -m venv venv

upgrade-pip:
	python.exe -m pip install --upgrade pip

install:
	pip install -r $(SRC_INSTALL)

run-cli:
	cd backend && py -m $(SRC_CLI)

run-api:
	cd backend && uvicorn $(SRC_API):password_manager --reload

tests:
	py -m pytest backend/tests
