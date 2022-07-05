// Setting app mode - this has to happen before anything else
import fs from "fs";
import path from "path";
import http from "http";
import morgan from "morgan";
import express from "express";
import { info } from "./utils";

const LISTEN_HOST = process.env.LISTEN_HOST || "0.0.0.0";
const LISTEN_PORT = process.env.LISTEN_PORT || 3000;
const PUBLIC_PATH = (
  fs.existsSync(process.env.PUBLIC_PATH || "")
    ? process.env.PUBLIC_PATH
    : path.resolve(path.normalize(__dirname + "/../public"))
) as string;

const app = express();

const webServer = http.createServer(app);

// app.use(morgan('common'));
app.use(
  morgan(":date[iso] Log: :method :url for :remote-addr :response-time ms")
);
app.use(express.static(PUBLIC_PATH));
app.get("/api/info", (req, res) => {
  res.json({
    description:
      "This is an openvpn monitor, it sits on the logfiles an displays its content nicely.",
    version: "1.0.0.",
  });
});
app.use((req, res) => res.sendFile(`${PUBLIC_PATH}/index.html`));

webServer.listen(LISTEN_PORT, parseInt(LISTEN_HOST), () => {
  info(`The openvpn service is listening on [32m${LISTEN_HOST}[0m:[35m${LISTEN_PORT}[0m`);
  info(`|-> Serving conmtent from: [35m${PUBLIC_PATH}[0m`);
});
