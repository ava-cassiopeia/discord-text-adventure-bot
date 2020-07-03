class DiscordClientMock {

  constructor() {
    this.user = new DiscordUserMock();
    this.users = new CollectionMock();
    this.channels = new CollectionMock();
    this.lastMessage = null;
  }

  /**
   * Records the message that the bot attempted to send in the lastMessage
   * property, to be read by the testing framework.
   * 
   * @param {Object} config 
   */
  sendMessage(config) {
    this.lastMessage = config;
  }

  /**
   * @return {DiscordChannelMock}
   */
  mockChannel() {
    return new DiscordChannelMock(this);
  }

}

class CollectionMock {
  fetch() {
    return new Promise((resolve) => {
      resolve(null);
    });
  }
}

class DiscordChannelMock {
  /**
   * @param {DiscordClientMock} clientMock
   */
  constructor(clientMock) {
    this.clientMock = clientMock;
    this.lastMessage = null;
  }

  /**
   * @param {string} message
   */
  send(message) {
    this.lastMessage = message;
  }
}

class DiscordUserMock {
  constructor() {
    this.presenceState = null;
  }

  /**
   * Mock method for setting the users's precense state. Just records the state
   * to be observed by unit tests.
   * 
   * @param {Object} state
   */
  setPresence(state) {
    this.presenceState = state;
  }
}

module.exports = DiscordClientMock;
