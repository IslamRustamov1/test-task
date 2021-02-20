const redis = require('redis');

let subscriber;

const CHANNEL = 'events';
subscriber = redis.createClient();

beforeEach(() => {
  subscriber.subscribe(CHANNEL);
});

it('receives events from redis', (done) => {
  subscriber.on('message', (channel, event) => {
    const parsedEvent = JSON.parse(event);
    expect(parsedEvent).toBeTruthy();
    subscriber.unsubscribe();
  }).on('unsubscribe', () => done());
});

