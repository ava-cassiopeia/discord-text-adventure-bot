const assert = require('assert');
const MessageHandler = require("./../src/MessageHandler");
const DiscordClientMock = require("./DiscordClientMock");

const MOCK_CONFIG = {
  settings: {
    commandPrefix: "$",
    commentPrefix: "!!"
  },
  games: [
    {
      name: "testGame",
      prettyName: "Test Game",
      path: "~"
    }
  ]
};

describe("MessageHandler", function() {

  it("should set the bot to idle upon construction", function() {
    const bot = new DiscordClientMock();
    const handler = new MessageHandler(bot, MOCK_CONFIG);

    assert.equal(bot.presenceState.game, null, "Presense game state should be set to null by default");
    assert.equal(typeof bot.presenceState.idle_since, "number", "Presense idle_since should be a number of milliseconds");
    assert.notEqual(bot.presenceState.idle_since, 0, "Bot idle since should be nonzero number of milliseconds");
  });

  describe(".setBotOnline()", function() {
    const bot = new DiscordClientMock();
    const handler = new MessageHandler(bot, MOCK_CONFIG);

    handler.setBotOnline("My Cool Game");

    it("should the game name to the specified game name", function() {
      assert.equal(bot.presenceState.game.name, "My Cool Game", "Game name should match what was passed in to method");
    });

    it("should reset the idle state", function() {
      assert.equal(bot.presenceState.idle_since, null, "Idle since should be null since the state was just updated.");
    });
  });

  describe(".setBotIdle()", function() {
    const bot = new DiscordClientMock();
    const handler = new MessageHandler(bot, MOCK_CONFIG);

    handler.setBotOnline("Test");
    handler.setBotIdle();

    it("should set the idle since value to a non-zero number", function() {
      assert.equal(typeof bot.presenceState.idle_since, "number", "The idle since value should be a number");
      assert.notEqual(bot.presenceState.idle_since, 0, "The idle since value should be nonzero");
    });

    it("should clear the set game, if any", function() {
      assert.equal(bot.presenceState.game, null, "The game name/state should be null");
    });
  });

  describe(".cleanUpOutput()", function() {
    const bot = new DiscordClientMock();
    const handler = new MessageHandler(bot, MOCK_CONFIG);

    it("should remove trailing > line", function() {
      const result = handler.cleanUpOutput("Testing\n>", true);

      assert.equal(result, "Testing\n", "Did not remove trailing > character");
    });
  });

  describe(".getModeName()", function() {
    const bot = new DiscordClientMock();
    const handler = new MessageHandler(bot, MOCK_CONFIG);

    it("should return Menu Mode for mode #0", function() {
      const name = handler.getModeName(0);

      assert.equal(name, "Menu Mode", "Result was not 'Menu Mode' for mode #0");
    });

    it("should return Game Mode for mode #1", function() {
      const name = handler.getModeName(1);

      assert.equal(name, "Game Mode", "Result was not 'Game Mode' for mode #1");
    });

    it("should return Unknown Mode for other passed numbers", function() {
      const name = handler.getModeName(2);

      assert.equal(name, "Unknown Mode", "Result was not 'Unknown Mode' for mode #2");
    });
  });

  describe(".findGameConfig()", function() {
    const bot = new DiscordClientMock();
    const handler = new MessageHandler(bot, MOCK_CONFIG);

    it("should return false for a game that doesn't exist", function() {
      assert.equal(handler.findGameConfig("badName"), false);
    });

    it("should return the full game config if it exists", function() {
      const conf = handler.findGameConfig("testGame");

      assert.equal(typeof conf, "object");
      assert.equal(conf.name, "testGame");
      assert.equal(conf.prettyName, "Test Game");
      assert.equal(conf.path, "~");
    });
  });

});
