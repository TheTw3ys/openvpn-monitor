import { InfluxDB, WriteApi } from '@influxdata/influxdb-client';
import { delay } from './utils';
import ping from 'web-pingjs';
const org = 'openvpn';
const bucket = 'client-statistics';

export let client: InfluxDB;
export let writeApi: WriteApi;

export async function initInfluxClient(link: string, token: string) {
  await delay(3500);
  client = new InfluxDB({ url: link, token });
  writeApi = client.getWriteApi(org, bucket);
}
