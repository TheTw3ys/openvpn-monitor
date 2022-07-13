// Setting app mode - this has to happen before anything else
import fs from 'fs';
import path from 'path';
import http from 'http';
import morgan from 'morgan';
import express from 'express';
import { info } from './utils';
import { defineAllRoutes } from './routes';
import { initInfluxClient } from './influx';
import { parseVPNStatusLogs } from './parse-log';

const OPENVPN_LOG_PATH = process.env.OPENVPN_LOG_PATH || './example-logs';
const PUBLIC_PATH = process.env.PUBLIC_PATH || path.resolve(path.normalize(__dirname + '/../public'));
const LISTEN_HOST = process.env.LISTEN_HOST || '0.0.0.0';
const LISTEN_PORT = process.env.LISTEN_PORT || 3000;
const INFLUXDB_LINK = process.env.INFLUXDB_LINK || 'http://127.0.0.1:8086';
const INFLUXDB_TOKEN =
  process.env.INFLUXDB_TOKEN ||
  'MvkXpPm-8-E9qplBb9Y-F84U4NQ6iqkr1hJZGjiKchGM6ZNq9oHE9Wdux3r3KYNgj84gLGtq4oobUc_38xWzBw==';

console.log({
  OPENVPN_LOG_PATH,
  LISTEN_HOST,
  LISTEN_PORT,
  PUBLIC_PATH,
  INFLUXDB_LINK,
  INFLUXDB_TOKEN,
});

initInfluxClient(INFLUXDB_LINK, INFLUXDB_TOKEN);

//const file = fs.readFileSync("./Files/vpn-status.log", "utf-8");
//const trimmed_log_file = file.split("\n"); //Array content

const app = express();

const webServer = http.createServer(app);
app.use(express.static(PUBLIC_PATH));

defineAllRoutes(app);
try {
  app.use((req, res) => res.sendFile(path.normalize(PUBLIC_PATH + `/index.html`)));
} catch (error) {
  app.use((req, res) => res.sendFile(path.normalize(`${__dirname}/public/index.html`)));
}

setInterval(() => parseVPNStatusLogs(OPENVPN_LOG_PATH), 4000);

webServer.listen(LISTEN_PORT, parseInt(LISTEN_HOST), () => {
  info(`The openvpn service is listening on [32m${LISTEN_HOST}[0m:[35m${LISTEN_PORT}[0m`);
  info(`|-> Serving conmtent from: [35m${PUBLIC_PATH}[0m`);
});
