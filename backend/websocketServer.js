const eventUtils = require('./utils/eventUtils');

const onMessage = (channel, event, socket) => {
  const parsedEvent = JSON.parse(event);

  if (parsedEvent) {
    const message = {
      type: parsedEvent.type,
      text: eventUtils.getEventText(parsedEvent),
      receivedAt: parsedEvent.receivedAt,
    };

    socket.send(JSON.stringify(message));
  }
};

const onError = (error) => {
  console.log(error);
};

exports.websocketServer = {
  onMessage,
  onError,
}
