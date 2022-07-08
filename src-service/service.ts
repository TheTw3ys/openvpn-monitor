// Setting app mode - this has to happen before anything else
import fs from "fs";
import path from "path";
import http from "http";
import morgan from "morgan";
import express from "express";
import { info } from "./utils";
import { defineAllRoutes } from "./routes";
import { parseVPNStatusLogs } from "./parse-log";

const OPENVPN_LOG_PATH = process.env.OPENVPN_LOG_PATH || "./Logs";
const LISTEN_HOST = process.env.LISTEN_HOST || "0.0.0.0";
const LISTEN_PORT = process.env.LISTEN_PORT || 3000;
const PUBLIC_PATH = (
  fs.existsSync(process.env.PUBLIC_PATH || "")
    ? process.env.PUBLIC_PATH
    : path.resolve(path.normalize(__dirname + "/../public"))
) as string;
//const file = fs.readFileSync("./Files/vpn-status.log", "utf-8");
//const trimmed_log_file = file.split("\n"); //Array content

const app = express();

const webServer = http.createServer(app);

app.use(
  morgan(":date[iso] Log: :method :url for :remote-addr :response-time ms")
);
app.use(express.static(PUBLIC_PATH));

defineAllRoutes(app);

app.use((req, res) => res.sendFile(`${PUBLIC_PATH}/index.html`));
setInterval(() => parseVPNStatusLogs(OPENVPN_LOG_PATH), 4000);

webServer.listen(LISTEN_PORT, parseInt(LISTEN_HOST), () => {
  info(`The openvpn service is listening on [32m${LISTEN_HOST}[0m:[35m${LISTEN_PORT}[0m`);
  info(`|-> Serving conmtent from: [35m${PUBLIC_PATH}[0m`);
});
