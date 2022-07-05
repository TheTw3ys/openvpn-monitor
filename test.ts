import fs from "fs";
import { State } from "history";
import { type } from "os";
import { resourceLimits } from "worker_threads";

type Header = {
  // the header of the table
  header?: Array<string>;
};

type OnlineClient = {
  // a single client
  realIPV4Address: string;
  commonName: string;
  connectedSince: Date | null;
  bytesReceived: number | null;
  bytesSent: number | null;
  LastReference: Date | "Now";
};

type TState = {
  updatedAt: Date;
  clients: { [id: string]: OnlineClient };
  //header: Header;
};

const state: TState = {
  updatedAt: new Date(),
  clients: {},
};

function get_lines(
  lines: Array<string>,
  min: number,
  max: number
): Array<string> {
  var end_lines: Array<string> = [];
  var count = max - min;
  for (let x = 0; x < Array(count).length; x++) {
    end_lines.push(lines[x + min]);
  }

  return end_lines;
}

function getWorkLines(lines: Array<string>) {
  const start_online: number = lines.indexOf("OpenVPN CLIENT LIST");
  const start_offline: number = lines.indexOf("ROUTING TABLE");

  function getOnlineWorkLines(): Array<string> {
    for (let x = 0; x < lines.length; x++) {
      if (x == start_online) {
        if (lines[x + 2].startsWith("Common")) {
          const indexstart = lines.indexOf(lines[x + 3]);
          const indexend = lines.indexOf("ROUTING TABLE") - 1;
          const worklines = get_lines(lines, indexstart, indexend + 1);
          return worklines;
        }
      }
    }
    return [];
  }

  function getOfflineWorkLines() {
    for (let x = 0; x < lines.length; x++) {
      if (x == start_offline) {
        if (lines[x + 1].startsWith("Virtual")) {
          const indexstart = lines.indexOf(lines[x + 2]);
          const indexend = lines.indexOf("GLOBAL STATS");
          const worklines: Array<string> = get_lines(
            lines,
            indexstart,
            indexend
          );
          return worklines;
        }
      }
    }
    return [];
  }

  const online_members: Array<string> = getOnlineWorkLines();
  const offline_members: Array<string> = getOfflineWorkLines();

  offline_members.forEach((member: string) => {
    const details = member.split(",");
    const name = details[1];

    state.clients[name] = {
      bytesReceived: 0,
      commonName: details[1],
      bytesSent: 0,
      connectedSince: null,
      LastReference: new Date(details[3]),
      realIPV4Address: details[2],
    };
  });

  online_members.forEach((member: string) => {
    const details = member.split(",");
    const name = details[0];

    const onlineClient = {
      bytesReceived: parseInt(details[2]),
      commonName: details[0],
      bytesSent: parseInt(details[3]),
      connectedSince: new Date(details[4]),
      LastReference: new Date(),
      realIPV4Address: details[1],
    };
    if (state.clients[name] != null) {
      state.clients[name] = { ...state.clients[name], ...onlineClient }; //overwrite in case of key being used
    } else {
      state.clients[name] = onlineClient;
    }
  });
  state.updatedAt = new Date()
}

async function execute(): Promise<void> {
  const file = await fs.readFileSync("./Files/vpn-status.log", "utf-8");
  const trimmed_log_file = file.split("\n"); //Array content
  getWorkLines(trimmed_log_file);
}

setInterval(execute, 4000);
setInterval(function(){
  console.log("*******************************")
  console.log(state)}, 4000)

var d = new Date("Thu Jun 30 10:01:46 2022");
console.log(d.toLocaleTimeString());
