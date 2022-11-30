import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import { Table } from 'react-bootstrap';
import { TVPNState } from '../../lib/types';
import { apiClient } from '../apiClient';
import { CreateReferenceBadge, CreateSinceBadge, CreateStatusBadge } from './Badge';
import { toReadableByteSize } from '../../lib/utils';
import { TableHeadTriggerTooltip, TableLineTriggerTooltip } from './Tooltip';
import 'moment/locale/de';
import 'moment/locale/en-gb';
moment.locale('de');

type VPNStatusTableProps = {
  vpnName: string;
};
let start  = 0; // used as test if "states" was already pulled
export const VPNStatusTable = (props: VPNStatusTableProps) => {
  const [state, setState] = useState<TVPNState>({
    updatedAt: new Date(),
    logname: '',
    clients: {},
  });
  const poll = async () => {
    const huba = await apiClient.getState(props.vpnName);
    setState(huba);
  }
  const pollState = async () => {
    const huba = await apiClient.getState(props.vpnName);
    setState(huba);
  };
  if (start === 0) {
    console.log("polled once")  
    poll();  // to let the user poll the items once (!) before interval ran through pollState
  }
  
  useEffect(() => {
    let timer = setInterval(pollState, 4000);
      start++
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <p>This Table was Updated at {moment(new Date()).tz('Europe/Berlin').format('L LTS')} </p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <TableHeadTriggerTooltip TooltipString="The name of the client" collumnName="Client name" />
            <TableHeadTriggerTooltip TooltipString="The Source IP-Address of the client" collumnName="Source IP" />
            <TableHeadTriggerTooltip TooltipString="The virtual address of the client" collumnName="VPNAddress" />
            <TableHeadTriggerTooltip
              TooltipString="Amount of data received by the server from the client"
              collumnName="Bytes received"
            />
            <TableHeadTriggerTooltip
              TooltipString="Amount of data the server has sent to the client"
              collumnName="Bytes sent"
            />
            <TableHeadTriggerTooltip
              TooltipString="The Date and time since the client is connected to the OpenVPN"
              collumnName="Connected at"
            />
            <TableHeadTriggerTooltip
              TooltipString="The time since the last connection was made between the client and the OpenVPN"
              collumnName="Last seen"
            />
            <TableHeadTriggerTooltip
              TooltipString="If the Client has a connection to the OpenVPN"
              collumnName="Status"
            />
          </tr>
        </thead>

        <tbody>
          {Object.keys(state.clients).map((clientName) => {
            const client = state.clients[clientName];
            var connectedSinceObject;
            if (client.connectedSince != null) {
              connectedSinceObject = new Date(client.connectedSince);
            } else {
              connectedSinceObject = '/';
            }

            return (
              <tr>
                <td align="center">{client.commonName}</td>
                <td align="center">{client.realIPV4Address}</td>
                <td align="center">{client.virtualAddress}</td>
                <td align="center">{toReadableByteSize(client.bytesReceived)}</td>
                <td align="center">{toReadableByteSize(client.bytesSent)}</td>

                <td align="center">
                  <h4>
                    <TableLineTriggerTooltip
                      TooltipString={`${moment(new Date(connectedSinceObject)).fromNow()}`}
                      lineName={<CreateSinceBadge SinceDate={connectedSinceObject} />}
                    />
                  </h4>
                </td>

                <td align="center">
                  <h4>
                    <CreateReferenceBadge LastReference={client.LastReference} ConnectionStatus={client.Online} />
                  </h4>
                </td>

                <td align="center">
                  <h4>
                    <CreateStatusBadge boolean={client.Online} />
                  </h4>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
