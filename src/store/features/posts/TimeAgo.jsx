import { formatDistanceToNow, parseISO } from 'date-fns';
import React from 'react';

const TimeAgo = ({ timestamp }) => {
  let timeAgo = '';
  if (timestamp) {
    const parsedTimeStamp = parseISO(timestamp);
    timeAgo = formatDistanceToNow(parsedTimeStamp);
  }
  return (
    <div>
      <span>{`Posted ${timeAgo} Ago`}</span>
    </div>
  );
};

export default TimeAgo;
