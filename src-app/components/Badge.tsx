import moment from 'moment';
import React from 'react';
import { Badge } from 'react-bootstrap';
import 'moment/locale/de';
import 'moment/locale/en-gb';

type CreateReferenceBadgeProps = {
  LastReference: Date;
  ConnectionStatus: boolean;
};
type CreateSinceBadgeProps = {
  SinceDate: string;
};
type CreateStatusBadgeProps = {
  boolean: boolean;
};

export function CreateReferenceBadge(props: CreateReferenceBadgeProps): React.ReactElement {
  moment.locale('de');
  const rightNow = new Date();
  const millisBetween = rightNow.getTime() - new Date(props.LastReference).getTime();
  let badgeType = '';
  if (millisBetween <= 360000) {
    badgeType = 'success'; //below 6 min
  } else {
    if (millisBetween <= 1860000) {
      badgeType = 'warning'; //below 31 min
    } else {
      // over 31 min
      if (props.ConnectionStatus === true) {
        badgeType = 'danger';
      } else {
        badgeType = 'dark';
      }
    }
  }

  return <Badge bg={badgeType}>{moment(props.LastReference).fromNow()}</Badge>;
}

export function CreateSinceBadge(props: CreateSinceBadgeProps): React.ReactElement {
  let Since: string;
  if (props.SinceDate != '/') {
    Since = moment(new Date(props.SinceDate)).format('l LTS');
  } else {
    Since = '/';
  }

  return <Badge bg="secondary">{Since}</Badge>;
}

export function CreateStatusBadge(props: CreateStatusBadgeProps): React.ReactElement {
  let bool = props.boolean;
  let response: string;
  let badgeType: string;
  if (bool == true) {
    response = 'Online';
    badgeType = 'success';
  } else {
    response = 'Offline';
    badgeType = 'danger';
  }

  return <Badge bg={badgeType}>{response}</Badge>;
}
