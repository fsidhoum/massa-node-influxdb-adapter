<p align="center">
  <a href="https://massa.net/" target="blank"><img src="https://massa.net/_nuxt/img/logo_massa.989057b.webp" width="300" alt="Massa Logo" /></a>
</p>

<p align="center">A module that collects some data about a <a href="https://massa.net/" target="_blank">Massa</a> node and populate an InfluxDb database.</p>

## Description

This project is part of the project [massa-node-stack](https://github.com/fsidhoum/massa-node-stack).

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start
```

## Environment variables

| Variable name        | Mandatory | Description                                                                | Default               |
|----------------------|-----------|----------------------------------------------------------------------------|-----------------------|
| MNIA_SOCKET_URL      | Yes       | The address of the web-socket that provides data                           | ws://localhost:3000   |
| MNIA_INFLUXDB_BUCKET | Yes       | The URL of the Massa node                                                  | massa                 |
| MNIA_INFLUXDB_ORG    | Yes       | The name of the organization                                               |                       |
| MNIA_INFLUXDB_TOKEN  | Yes       | The API token for the Infludb instance                                     |                       |
| MNIA_INFLUXDB_URL    | Yes       | The URL of the Influxdb instance                                           | http://localhost:8086 |
| MNIA_LOG_LEVEL       | No        | The log level (values possible : error, warn, info, verbose, debug, silly) | info                  |
