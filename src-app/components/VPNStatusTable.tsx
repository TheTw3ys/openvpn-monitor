import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import { Table } from 'react-bootstrap';
import { TVPNState } from '../../lib/types';
import { apiClient } from '../apiClient';
import { CreateBadge } from './Badge';

type VPNStatusTableProps = {
  vpnName: string;
};

export const VPNStatusTable = (props: VPNStatusTableProps) => {
  const [state, setState] = useState<TVPNState>({
    updatedAt: new Date(),
    logname: '',
    clients: {},
  });

  const pollState = async () => {
    const huba = await apiClient.getState(props.vpnName);
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
      <p>This Table was Updated at {new Date().toLocaleTimeString()} </p>
      <Table>
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

            if (client.connectedSince != null) {
              connectedSinceString = moment(client.connectedSince).format('ll LTS');
            } else {
              connectedSinceString = '/';
            }

            return (
              <tr>
                <td align="center">{client.commonName}</td>
                <td align="center">{client.realIPV4Address}</td>
                <td align="center">{client.virtualAddress}</td>
                <td align="center">{client.bytesReceived}</td>
                <td align="center">{client.bytesSent}</td>
                <td align="center">{connectedSinceString}</td>
                <td align="center">
                  <CreateBadge LastReference={client.LastReference} />
                </td>
                <td align="center">{`${client.Online}`}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
