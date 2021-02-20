import { EventProps } from '../components/Event';

export const isEvent = (event: EventProps): event is EventProps => {
  if (event.type && event.text && event.receivedAt){
    return true;
  }
  return false;
};
