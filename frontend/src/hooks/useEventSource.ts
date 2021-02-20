import { useState, useEffect } from 'react';
import { EventProps } from '../components/Event';
import useWebSocket from './useWebSocket';
import { isEvent } from '../utils/guards';
import { hideErrorDuration, mockedUrl, Mode } from '../utils/constants';

const baseUrl = process.env.NODE_ENV === 'test' ? mockedUrl : process.env.REACT_APP_BASE_URL;

const useEventSource = (): EventSource => {
  const [rawEvents, setRawEvents] = useState<EventProps[]>([]);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState(false);
  const [activeMode, setActiveMode] = useState(Mode.live);
  const events = rawEvents.filter(event => event.text.toLowerCase().includes(filter));
  const socket = useWebSocket(baseUrl);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.onmessage = event => {
      if (activeMode === Mode.pause) {
        return;
      }
      const parsedEvent = JSON.parse(event.data);
      if (isEvent(parsedEvent)) {
        setRawEvents(events => [parsedEvent, ...events]);
      }
    };

    socket.onerror = () => {
      setError(true);
      setTimeout(() => setError(false), hideErrorDuration);
    };
  }, [activeMode, socket]);

  return { events, setFilter, activeMode, setActiveMode, error };
};

interface EventSource {
  events: EventProps[];
  setFilter: (arg0: string) => void;
  activeMode: Mode;
  setActiveMode: (arg0: Mode) => void;
  error: boolean;
}

export default useEventSource;
