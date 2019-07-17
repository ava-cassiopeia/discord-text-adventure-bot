class DiscordClientMock {

  constructor() {
    this.presenceState = {};
    this.lastMessage = null;
  }

  /**
   * Mock method for setting the bot's precense state. Just records the state
   * to be observed by unit tests.
   * 
   * @param {Object} state
   */
  setPresence(state) {
    this.presenceState = state;
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

}

module.exports = DiscordClientMock;
