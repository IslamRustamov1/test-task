const WebSocket = require('ws');
const redis = require('redis');
const { websocketServer } = require('./websocketServer');

const CHANNEL = 'events';
const subscriber = redis.createClient();

subscriber.subscribe(CHANNEL);

const server = new WebSocket.Server({ port: process.env.PORT || 3000 });

server.on('connection', (socket) => {
  subscriber.on('message', (channel, event) => websocketServer.onMessage(channel, event, socket));
  subscriber.on('error', websocketServer.onError);
});
