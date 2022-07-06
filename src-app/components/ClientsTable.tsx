import React, { useState, useEffect } from "react";
import { TState } from "../../lib/types";
import { apiClient } from "../apiClient";
import { Container, Table } from "react-bootstrap";

/*
const state = {
  updatedAt: "2022-07-06T07:17:30.182Z",
  clients: {
    "novum-test-rig-vpn-client-22-0294_jt_001": {
      bytesReceived: 602121,
      commonName: "novum-test-rig-vpn-client-22-0294_jt_001",
      bytesSent: 979012,
      connectedSince: "2022-06-30T08:01:45.000Z",
      LastReference: "2022-07-06T07:17:30.182Z",
      realIPV4Address: "217.254.144.110",
      virtualAddress: "10.40.0.12",
      Online: true,
    },
    "novum-test-rig-vpn-client-22-0296_db_001": {
      bytesReceived: 601751,
      commonName: "novum-test-rig-vpn-client-22-0296_db_001",
      bytesSent: 979036,
      connectedSince: "2022-06-30T08:01:45.000Z",
      LastReference: "2022-07-06T07:17:30.182Z",
      realIPV4Address: "217.254.144.110",
      virtualAddress: "10.40.0.16",
      Online: true,
    },
    "novum-test-rig-vpn-client-21-0282_jt_001": {
      bytesReceived: 133774,
      commonName: "novum-test-rig-vpn-client-21-0282_jt_001",
      bytesSent: 267319,
      connectedSince: "2022-07-01T04:02:20.000Z",
      LastReference: "2022-07-06T07:17:30.182Z",
      realIPV4Address: "80.243.52.58",
      virtualAddress: "10.40.0.8",
      Online: true,
    },
    "novum-test-rig-vpn-client-novum_haupt_002": {
      bytesReceived: 10912,
      commonName: "novum-test-rig-vpn-client-novum_haupt_002",
      bytesSent: 4997,
      connectedSince: "2022-07-01T09:40:28.000Z",
      LastReference: "2022-07-06T07:17:30.182Z",
      realIPV4Address: "217.254.144.110",
      virtualAddress: "10.40.0.104",
      Online: true,
    },
    "novum-test-rig-vpn-client-21-0282_jt_002": {
      bytesReceived: 599788,
      commonName: "novum-test-rig-vpn-client-21-0282_jt_002",
      bytesSent: 978883,
      connectedSince: "2022-06-30T08:01:45.000Z",
      LastReference: "2022-07-06T07:17:30.182Z",
      realIPV4Address: "217.254.144.110",
      virtualAddress: "10.40.0.4",
      Online: true,
    },
  },
};
*/

export const TableApp = () => {
  const [state, setState] = useState<TState>({
    updatedAt: "2022-07-06T07:17:30.182Z",
    clients: {},
  });

  const pollState = async () => {
    setState(await apiClient.getState());
  };

  useEffect(() => {
    let timer = setInterval(pollState, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <Container>
        <Table striped bordered responsive hover>
          <thead>
            <tr>
              <th>Common Name</th>
              <th>IPV4</th>
              <th>Virtual Address</th>
              <th>Received Bytes</th>
              <th>Sent Bytes</th>
              <th>Connected since</th>
              <th>Last Connection-Reference</th>
              <th>Online</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(state.clients).map((clientName) => {
              const client = state.clients[clientName];
              var connectedSinceString;
              const month = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ];

              if (client.connectedSince != null) {
                const connectedSince = new Date(client.connectedSince);
                connectedSinceString = `${
                  month[connectedSince.getMonth()]
                } ${connectedSince.getDate()}, ${connectedSince.getFullYear()} ${connectedSince.toLocaleTimeString()}`;
              } else {
                connectedSinceString = "/";
              }
              const lastReference = new Date(client.LastReference);

              return (
                <tr>
                  <td align="center">{client.commonName}</td>
                  <td align="center">{client.realIPV4Address}</td>
                  <td align="center">{client.virtualAddress}</td>
                  <td align="center">{client.bytesReceived}</td>
                  <td align="center">{client.bytesSent}</td>
                  <td align="center">{connectedSinceString}</td>
                  <td align="center">{`${
                    month[lastReference.getMonth()]
                  } ${lastReference.getDate()}, ${lastReference.getFullYear()} ${lastReference.toLocaleTimeString()}`}</td>
                  <td align="center">{`${client.Online}`}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};
