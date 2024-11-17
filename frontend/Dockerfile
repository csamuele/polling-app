FROM node:18-bookworm

WORKDIR /app

COPY ./package.json ./

RUN npm config set strict-ssl false

RUN npm install --loglevel verbose

COPY . .
