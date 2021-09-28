FROM node:16-bullseye-slim
WORKDIR /workspace
RUN apt update && \
    apt install -y git
COPY package*.json ./
RUN npm install --no-audit
RUN chmod 777 -R node_modules/