import { TVPNState } from "../lib/types";

type TInfo = {
  description: string;
};

class APIClient {
  constructor() {}

  async getInfo(): Promise<TInfo> {
    return fetch("/api/info").then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }

  async getVPNNames(): Promise<Array<string>> {
    return fetch("/api/vpn_names").then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }

  async getState(vpnName: string): Promise<TVPNState> {
    return fetch(`/api/openvpn_state/${vpnName}`).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }
}
const client = new APIClient();
console.log(client.getInfo());
export const apiClient = new APIClient();
