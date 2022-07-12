// Setting app mode - this has to happen before anything else
import fs from 'fs';
import path from 'path';
import http from 'http';
import morgan from 'morgan';
import express from 'express';
import { info } from './utils';
import { defineAllRoutes } from './routes';
import { parseVPNStatusLogs } from './parse-log';
import dotenv from 'dotenv';
dotenv.config();
const OPENVPN_LOG_PATH = process.env.OPENVPN_LOG_PATH || '/example-logs';
const LISTEN_HOST = process.env.LISTEN_HOST || '0.0.0.0';
const LISTEN_PORT = process.env.LISTEN_PORT || 3000;
let PATH_SUFFIX;
PATH_SUFFIX = process.env.PATH_SUFFIX2;
if (process.env.NODE_ENV !== 'development') {
  PATH_SUFFIX = process.env.PATH_SUFFIX1;
}
console.log(PATH_SUFFIX);
const PUBLIC_PATH = (
  fs.existsSync(process.env.PUBLIC_PATH || '')
    ? process.env.PUBLIC_PATH
    : path.resolve(path.normalize(__dirname + PATH_SUFFIX))
) as string;

console.log(__dirname);

console.log(
  {
    OPENVPN_LOG_PATH,
    LISTEN_HOST,
    LISTEN_PORT,
    PUBLIC_PATH,
  },
  process.env.NODE_ENV,
);

//const file = fs.readFileSync("./Files/vpn-status.log", "utf-8");
//const trimmed_log_file = file.split("\n"); //Array content

const app = express();

const webServer = http.createServer(app);

app.use(morgan(':date[iso] Log: :method :url for :remote-addr :response-time ms'));
app.use(express.static(PUBLIC_PATH));

defineAllRoutes(app);
try {
  app.use((req, res) => res.sendFile(path.normalize(PUBLIC_PATH + `/index.html`)));
} catch (error) {
  app.use((req, res) => res.sendFile(path.normalize(`${__dirname}/public/index.html`)));
}

parseVPNStatusLogs(OPENVPN_LOG_PATH);
setInterval(() => parseVPNStatusLogs(OPENVPN_LOG_PATH), 4000);

webServer.listen(LISTEN_PORT, parseInt(LISTEN_HOST), () => {
  info(`The openvpn service is listening on [32m${LISTEN_HOST}[0m:[35m${LISTEN_PORT}[0m`);
  info(`|-> Serving conmtent from: [35m${PUBLIC_PATH}[0m`);
});
