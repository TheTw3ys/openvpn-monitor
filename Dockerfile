FROM node:16-slim
WORKDIR /usr/src/app/

RUN apt-get update && apt-get install -y iputils-ping curl

COPY /public ./public
COPY /.build/service.js ./
COPY .env ./
COPY /src-service ./src-service
COPY /src-app ./src-app
ENV NODE_ENV=docker
CMD [ "node", "./service.js"]