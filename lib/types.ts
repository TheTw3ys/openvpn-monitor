export type OnlineClient = {
  // a single client
  realIPV4Address: string;
  virtualAddress: string;
  commonName: string;
  connectedSince: Date | null;
  bytesReceived: number | null;
  bytesSent: number | null;
  LastReference: Date | 'Now';
  Online: boolean;
};

export type TState = {
  updatedAt: Date;
  clients: { [id: string]: OnlineClient };
  //header: Header;
};
