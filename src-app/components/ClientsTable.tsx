import React, { useState, useEffect } from "react";
import { TVPNState } from "../../lib/types";
import { apiClient } from "../apiClient";
import { Container, Table, Tabs, Tab } from "react-bootstrap";

type TableAppProps = {
  vpnName: string;
};

export const TableApp = (props: TableAppProps) => {
  const [state, setState] = useState<TVPNState>({
    updatedAt: new Date(),
    logname: "",
    clients: {},
  });

  const pollState = async () => {
    const huba = await apiClient.getState(props.vpnName);
    console.log(huba);
    setState(huba);
  };

  useEffect(() => {
    let timer = setInterval(pollState, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <p>This Table was Updated at {new Date().toLocaleTimeString()}</p>
      <Table striped responsive hover>
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
            console.log(client);
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
    </div>
  );
};
