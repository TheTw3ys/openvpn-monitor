import fs from "fs";

type TVPNClient = {
  /* a single client */ realIPV4Address: string;
  virtualIPV4Address: string;
  commonName: string;
  lastSeenAt: Date;
  bytesReceived: number;
  bytesSend: number;
};

type TResult = {
  /* what you want to get back */ updatedAt: Date;
  clients: Array<TVPNClient>;
};

function praseStuff(lines: Array<string>): TResult {
  return {
    updatedAt: new Date(),
    clients: [],
  };
}

const content = fs.readFileSync("./Files/vpn-status.log", "utf-8");
const lines = content.split("\n");
console.log(lines);

console.log(praseStuff(lines));
