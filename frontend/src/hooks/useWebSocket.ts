import { useEffect, useState } from 'react';

const useWebSocket = (url?: string): WebSocket | undefined => {
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    if (!url) {
      return;
    }

    setSocket(new WebSocket(url));

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return socket;
};

export default useWebSocket;
