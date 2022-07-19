import moment from 'moment';
import 'moment/locale/en-gb';
import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

type TableHeadTriggerTooltipProps = {
  TooltipString: string;
  collumnName: string;
};
type TableLineTriggerTooltipProps = {
  TooltipString: string;
  lineName: any;
};
export function TableHeadTriggerTooltip(props: TableHeadTriggerTooltipProps) {
  const renderTooltip = (
    <Tooltip id="table-tooltip" {...props}>
      {props.TooltipString}
    </Tooltip>
  );

  return (
    <OverlayTrigger placement="top" delay={{ show: 250, hide: 20 }} overlay={renderTooltip}>
      <th>{props.collumnName}</th>
    </OverlayTrigger>
  );
}
export function TableLineTriggerTooltip(props: TableLineTriggerTooltipProps) {
  const renderTooltip = (
    <Tooltip id="table-tooltip" {...props}>
      {props.TooltipString}
    </Tooltip>
  );
  moment.locale('en-gb');
  let lineName = props.lineName;
  return (
    <OverlayTrigger placement="top" delay={{ show: 250, hide: 20 }} overlay={renderTooltip}>
      <td>{lineName}</td>
    </OverlayTrigger>
  );
}
