import { InfluxDB, WriteApi } from '@influxdata/influxdb-client';
import { delay } from './utils';

const org = 'openvpn';
const bucket = 'client-statistics';

export let client: InfluxDB;
export let writeApi: WriteApi;

export async function initInfluxClient(link: string, token: string) {
  await delay(5000);
  client = new InfluxDB({ url: link, token });
  writeApi = client.getWriteApi(org, bucket);
}
