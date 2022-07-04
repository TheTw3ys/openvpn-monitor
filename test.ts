import fs from "fs";
import { type } from "os";

type Header = {
  // the header of the table
  header?: Array<string>;
};

type OnlineClient = {   // a single client  
  realIPV4Address: string;
  commonName: string;
  connectedSince: Date;
  bytesReceived: number;
  bytesSend: number;
};

type TResult = {
  /* what you want to get back */ updatedAt: Date;
  clients: Array<OnlineClient>;
  //header: Header;
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

function praseStuff(lines: Array<string>): TResult {
  console.log(lines);
  const start_online: number = lines.indexOf("OpenVPN CLIENT LIST");
  const start_offline: number = lines.indexOf("ROUTING TABLE");

  function get_online() {
    for (let x = 0; x < lines.length; x++) {
      if (x == start_online) {
        if (lines[x + 2].startsWith("Common")) {
          const clientstart = lines.indexOf(lines[x + 3]);
          const clientend = lines.indexOf("ROUTING TABLE") - 1;
          const work_lines = get_lines(lines, clientstart, clientend + 1);
          return work_lines;
        }
      }
    }
  }
  function get_offline() {
    for (let x = 0; x < lines.length; x++) {
      if (x == start_offline) {
        if (lines[x + 1].startsWith("Virtual")) {
          const offline_start = lines.indexOf(lines[x + 2]);
          const offline_end = lines.indexOf("GLOBAL STATS");
          const offline_lines: Array<string> = get_lines(
            lines,
            offline_start,
            offline_end
          );

          return offline_lines;
        }
      }
    }
  }
  const online_member: any = get_online();
  var offline_member: any = get_offline();

  function get_values(array: Array<string>) {
    const list: any = []
    for (let x = 0; x < array.length; x++) {
      const string = array[x].split(","); //no sort() because of sent and received bytes
      list.push(string);
    }
    return list
  }
  /*TODO: find out why string is not pushable to list when not type of any*/ 
  const online = get_values(online_member);
  const offline = get_values(offline_member);

  function get_clients(values): {
    for () {

    }
    
    function get_online_clients(value): OnlineClient {
        const client = [
          value[0], //IPV4
          value[4], //common name
          value[]
                        
      ]
        return client
      }
    
    clients: TResult = []
    return clients;
  }
  get_clients(online);
  return {
    updatedAt: new Date(),
    clients: [],
  };
}

const content = fs.readFileSync("./Files/vpn-status.log", "utf-8").trim(); // trimming in case of spaces
//console.log(content); //string content
const lines = content.split("\n"); //Array content
//console.log(lines);
console.log(praseStuff(lines));
//console.log(lines.values)
var d = new Date("Thu Jun 30 10:01:46 2022");
console.log(d.toLocaleTimeString());
