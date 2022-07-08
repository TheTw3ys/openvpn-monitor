import { TState } from '../lib/types';

type TInfo = {
  description: string;
};

class APIClient {
  constructor() {}

  async getInfo(): Promise<TInfo> {
    return fetch('/api/info').then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }

  async getState(): Promise<TState> {
    return fetch('/api/openvpn_state').then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }
}

export const apiClient = new APIClient();
