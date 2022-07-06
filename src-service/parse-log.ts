import fs from "fs";
import { TState } from "../lib/types";

export const state: TState = {
  updatedAt: new Date(),
  clients: {},
};

function getWorkLines(lines: Array<string>) {
  const start_online: number = lines.indexOf("OpenVPN CLIENT LIST");
  const start_offline: number = lines.indexOf("ROUTING TABLE");

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

  offline_members.forEach((offlineMember: string) => {
    const details = offlineMember.split(",");
    const name = details[1];

    state.clients[name] = {
      bytesReceived: 0,
      commonName: details[1],
      bytesSent: 0,
      connectedSince: null,
      LastReference: new Date(details[3]),
      realIPV4Address: details[2] != null ? details[2].split(":")[0] : "",
      virtualAddress: details[0],
      Online: false,
    };
  });

  online_members.forEach((onlineMember: string) => {
    const details = onlineMember.split(",");
    const name = details[0];
    //console.log(state.clients[name])
    const onlineClient = {
      bytesReceived: parseInt(details[2]),
      commonName: details[0],
      bytesSent: parseInt(details[3]),
      connectedSince: new Date(details[4]),
      LastReference: new Date(),
      realIPV4Address: details[1] != null ? details[1].split(":")[0] : "",
      virtualAddress: "", //TODO 1.
      Online: true,
    };
    if (state.clients[name] != null) {
      state.clients[name] = { ...state.clients[name], ...onlineClient }; //overwrite in case of key being used
    } else {
      state.clients[name] = onlineClient;
    }
  });

  state.updatedAt = new Date();
  offline_members.forEach((offlineMember: string) => {
    // redefining because virtualAddress is not accessible for onlineClients
    const details = offlineMember.split(",");
    const name = details[1];
    const client = state.clients[name];
    const offlineClient = {
      bytesReceived: client.bytesReceived,
      commonName: client.commonName,
      bytesSent: client.bytesSent,
      connectedSince: client.connectedSince,
      LastReference: client.LastReference,
      realIPV4Address: client.realIPV4Address,
      virtualAddress: details[0],
      Online: client.Online,
    };
    if (state.clients[name] != null) {
      state.clients[name] = { ...state.clients[name], ...offlineClient }; //overwrite in case of key being used
    } else {
      state.clients[name] = offlineClient;
    }
  });
}

export function parseVPNStatusLog() {
  const file = fs.readFileSync("./Files/vpn-status.log", "utf-8");
  const trimmed_log_file = file.split("\n"); //Array content
  getWorkLines(trimmed_log_file);
}
