export type OnlineClient = {
  // a single client
  realIPV4Address: string;
  virtualAddress: string;
  commonName: string;
  connectedSince: Date | null;
  bytesReceived: number | null;
  bytesSent: number | null;
  LastReference: Date | "Now";
  Online: boolean;
};

export type TVPNState = {
  updatedAt: Date;
  logname: string;
  clients: { [id: string]: OnlineClient };
};

export type TVPNStates = {
  [vpnName: string]: TVPNState;
};
