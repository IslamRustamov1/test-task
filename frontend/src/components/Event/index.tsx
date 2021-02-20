import React, { FC } from 'react';
import { Box } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import './styles.css';

const Event: FC<EventProps> = ({ type, text, receivedAt }) =>  {
  return (
    <Box className="event__box" pl={3}>
      <Box className="event__info">
        <CheckCircleIcon color="primary" />
        <p className="event__type-paragraph">{type}</p>
        <p className="event__text-paragraph">{text}</p>
      </Box>
      <p className="event__date-paragraph">{receivedAt}</p>
    </Box>
  );
};

export interface EventProps {
  type: string;
  text: string;
  receivedAt: string;
}

export default Event;
