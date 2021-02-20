import { renderHook } from '@testing-library/react-hooks';
import { WebSocket } from 'mock-socket';
import WS from 'jest-websocket-mock';
import useWebSocket from '../../src/hooks/useWebSocket';
import { mockedUrl } from '../../src/utils/constants';

global.WebSocket = WebSocket;

it('should return websocket if url is passed', () => {
  const { result } = renderHook(() => useWebSocket(mockedUrl));

  expect(result.current).toBeTruthy();
});

it('should return nothing if url is not passed', () => {
  const { result } = renderHook(() => useWebSocket());

  expect(result.current).toBeFalsy();
});

it('should receive events from backend', async () => {
  const server = new WS(mockedUrl);
  const { result } = renderHook(() => useWebSocket(mockedUrl));
  await server.connected;

  const messages: string[] = [];
  if (result.current) {
    result.current.onmessage = (event: MessageEvent<string>) => {
      messages.push(event.data);
    };
  }

  server.send('test message');
  expect(messages).toEqual(['test message']);

  server.close();
});
