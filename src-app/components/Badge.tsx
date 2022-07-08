import moment from 'moment';
import React from 'react';
import { Badge } from 'react-bootstrap';

type CreateBadgeProps = {
  LastReference: Date;
};

export function CreateBadge(props: CreateBadgeProps): React.ReactElement {
  console.log(props.LastReference);

  const rightNow = new Date();
  const millisBetween = rightNow.getTime() - new Date(props.LastReference).getTime();
  let badgeType = '';
  if (millisBetween <= 360000) {
    badgeType = 'success';
  } else {
    if (millisBetween <= 1860000) {
      badgeType = 'warning';
    } else {
      badgeType = 'danger';
    }
  }
  return <Badge bg={badgeType}>{moment(props.LastReference).fromNow()}</Badge>;
}
