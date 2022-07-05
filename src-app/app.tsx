import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Table } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { connected } from 'process';

const state = {
  updatedAt: "2022-07-05T12:58:27.464Z",
  clients: {
    'novum-test-rig-vpn-client-22-0294_jt_001': {
      bytesReceived: 602121,
      commonName: 'novum-test-rig-vpn-client-22-0294_jt_001',
      bytesSent: 979012,
      connectedSince: "2022-06-30T08:01:45.000Z",
      LastReference: "2022-07-05T12:58:27.464Z",
      realIPV4Address: '217.254.144.110:34124',
      Online: true
    },
    'novum-test-rig-vpn-client-22-0296_db_001': {
      bytesReceived: 601751,
      commonName: 'novum-test-rig-vpn-client-22-0296_db_001',
      bytesSent: 979036,
      connectedSince: "2022-06-30T08:01:45.000Z",
      LastReference: "2022-07-05T12:58:27.464Z",
      realIPV4Address: '217.254.144.110:54648',
      Online: true
    },
    'novum-test-rig-vpn-client-21-0282_jt_001': {
      bytesReceived: 133774,
      commonName: 'novum-test-rig-vpn-client-21-0282_jt_001',
      bytesSent: 267319,
      connectedSince: "2022-07-01T04:02:20.000Z",
      LastReference: "2022-07-05T12:58:27.464Z",
      realIPV4Address: '80.243.52.58:53698',
      Online: true
    },
    'novum-test-rig-vpn-client-novum_haupt_002': {
      bytesReceived: 10912,
      commonName: 'novum-test-rig-vpn-client-novum_haupt_002',
      bytesSent: 4997,
      connectedSince: "2022-07-01T09:40:28.000Z",
      LastReference: "2022-07-05T12:58:27.464Z",
      realIPV4Address: '217.254.144.110:56722',
      Online: true
    },
    'novum-test-rig-vpn-client-21-0282_jt_002': {
      bytesReceived: 0,
      commonName: 'novum-test-rig-vpn-client-21-0282_jt_002',
      bytesSent: 0,
      connectedSince: null,
      LastReference: "2022-06-30T08:01:46.000Z",
      realIPV4Address: '217.254.144.110:37845',
      Online: false
    }
  }
}


const App = () => {
  return (
    <div>
      <Container>
        <h2>App</h2>
        <p>Hello from my first app</p>
      </Container>
    </div>
  );
};


const App2 = () => {
  return (
    <div>
      <Container>
        <Table striped bordered responsive hover>
          <thead>
            <tr>
              <th>Common Name</th>
              <th>IPV4</th>
              <th>Received Bytes</th>
              <th>Sent Bytes</th>
              <th>Connected since</th>
              <th>Last Connection-Reference</th>
              <th>Online</th>
            </tr>
          </thead>

          <tbody>
            {
              Object.keys(state.clients).map((clientName) => {
                const client = state.clients[clientName];
                var connectedSinceString;
                const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                if (client.connectedSince != null) {
                  const connectedSince = new Date(client.connectedSince)
                  connectedSinceString = `${month[connectedSince.getMonth()]} ${connectedSince.getDate()}, ${connectedSince.getFullYear()} ${connectedSince.toLocaleTimeString().slice(0, -2)}`;
                } else { connectedSinceString = "/" }
                const lastReference = new Date(client.LastReference)

                return <tr>
                  <td align='center'>{client.commonName}</td>
                  <td align='center'>{client.realIPV4Address}</td>
                  <td align='center'>{client.bytesReceived}</td>
                  <td align='center'>{client.bytesSent}</td>
                  <td align='center'>{connectedSinceString}</td>
                  <td align='center'>{`${month[lastReference.getMonth()]} ${lastReference.getDate()}, ${lastReference.getFullYear()} ${lastReference.toLocaleTimeString()}`}</td>
                  <td align='center'>{`${client.Online}`}</td>
                </tr>
              }
              )
            }

          </tbody>
        </Table>
      </Container>
    </div>
  )
}
const OuterApp = () => {
  return (
    <BrowserRouter>
      <App />
      <App2 />
    </BrowserRouter>
  );
};

ReactDOM.render(<OuterApp />, document.getElementById('app-content'));
ReactDOM.render(<OuterApp />, document.getElementById('test'))