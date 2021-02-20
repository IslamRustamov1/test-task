import { act, renderHook } from '@testing-library/react-hooks';
import useEventSource  from '../../src/hooks/useEventSource';
import { mockedUrl, Mode } from '../../src/utils/constants';
import WS from 'jest-websocket-mock';
import useWebSocket from '../../src/hooks/useWebSocket';

it('should return empty array of events', () => {
  const { result } = renderHook(() => useEventSource());

  expect(result.current.events.length).toBe(0);
});

it('should return live as active mode', () => {
  const { result } = renderHook(() => useEventSource());

  expect(result.current.activeMode).toBe(Mode.live);
});


it('should be able to change active mode', () => {
  const { result } = renderHook(() => useEventSource());

  act(() => {
    result.current.setActiveMode(Mode.pause);
  });

  expect(result.current.activeMode).toBe(Mode.pause);
});
