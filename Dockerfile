FROM node:16-slim
WORKDIR /usr/src/app/

RUN apt-get update && apt-get install -y iputils-ping curl

COPY /public ./public
COPY /.build/service.js ./
CMD [ "node", "./service.js"]