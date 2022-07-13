import { delay } from './utils';
import { InfluxDB, WriteApi } from '@influxdata/influxdb-client';

const org = 'openvpn';
const bucket = 'client-statistics';

export let client: InfluxDB;
export let writeApi: WriteApi;

export async function initInfluxClient(isUsed: boolean, url: string, token: string) {
  if (isUsed === true) {
    await delay(3500);
    client = new InfluxDB({ url, token });
    writeApi = client.getWriteApi(org, bucket);
  }
}
