# Pollify App
This is a simple fullstack web application for creating online polls. The backend is written in Python using Django and the frontend is written in JavaScript using React. It uses a Postgres database, and a keycloak authentication server as well. The purpose of this project is mostly to provide myself with a playground to test out new technologies as I learn DevOps concepts. Links to DevOps projects that utilize this app will be posted here as I continue to learn. Each component is Dockerized and you can see a live demo at [pollifyapp.online](https://pollifyapp.online)

## Getting Started
### Create .env files
First you will need to create .env files in the following directories:
- root
- frontend
- backend/polling_app

You can use the envsample.txt files as a guide for what variables need to be set.  
### Installation
Next run the following command in the frontend directory:
```console
npm i
```
And the following command in the backend directory
```console
pip install -r ./requirements.txt
```

### Testing
To run everything this app needs locally, you can just run this command in the root directory
```console
docker compose up -d
```
Alternatively, if you want just the database you can run
```console
docker compose up -d keycloak
docker compose up -d db
```
to just run keycloak and the postgres database so you can run the frontend with 
```console
npm run dev
```
and the backend with 
```console
python manage.py runserver
```  

I have also set up launch profiles in vscode so you can debug each service. 
