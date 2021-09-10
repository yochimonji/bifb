FROM node:16-bullseye-slim
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN apt update && \
    apt install -y git && \
    npm install --no-audit