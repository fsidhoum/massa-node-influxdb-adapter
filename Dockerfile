FROM node:18.6.0-alpine3.16

RUN mkdir /massa-node-influxdb-adapter

WORKDIR /massa-node-influxdb-adapter

COPY src ./src
COPY package.json package.json

RUN npm install --omit=dev

ENTRYPOINT ["npm", "start"]
