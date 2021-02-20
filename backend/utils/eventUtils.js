const getEventText = (message) => {
  switch (message.type) {
    case 'identify':
      return message.traits.email;
    case 'page':
      return message.properties.title;
    case 'track':
      return message.event;
    default:
      return 'Empty message';
  }
}

exports.getEventText = getEventText;
