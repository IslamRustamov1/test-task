const eventUtils = require('../utils/eventUtils');

it('Returns string', () => {
  const testEmail = 'test@email.com';
  const event = {
    type: 'identify',
    traits: {
      email: testEmail
    }
  };

  expect(eventUtils.getEventText(event)).toBe(testEmail);
});
