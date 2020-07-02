const assert = require('assert');
const MessageHandler = require("./../src/MessageHandler");
const DiscordClientMock = require("./DiscordClientMock");
const fs = require("fs");
const {FakeLogger} = require("./LoggerMock");

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

  describe(".setBotOnline()", function() {
    const bot = new DiscordClientMock();
    const handler = new MessageHandler(bot, new FakeLogger(), MOCK_CONFIG);

    handler.setBotOnline("My Cool Game");

    it("should the game name to the specified game name", function() {
      assert.equal(bot.user.presenceState.activity.name, "My Cool Game");
    });

    it("should set the activity to a game", function() {
      assert.equal(bot.user.presenceState.activity.type, "PLAYING");
    });
  });

  describe(".setBotIdle()", function() {
    const bot = new DiscordClientMock();
    const handler = new MessageHandler(bot, new FakeLogger(), MOCK_CONFIG);

    handler.setBotOnline("Test");
    handler.setBotIdle();

    it("should clear the set game, if any", function() {
      assert.equal(bot.user.presenceState.activity, null);
    });
  });

  describe(".cleanUpOutput()", function() {
    const bot = new DiscordClientMock();
    const handler = new MessageHandler(bot, new FakeLogger(), MOCK_CONFIG);

    it("should remove trailing > line", function() {
      const result = handler.cleanUpOutput("Testing\n>", true);

      assert.equal(result, "Testing\n", "Did not remove trailing > character");
    });
  });

  describe(".getModeName()", function() {
    const bot = new DiscordClientMock();
    const handler = new MessageHandler(bot, new FakeLogger(), MOCK_CONFIG);

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
    const handler = new MessageHandler(bot, new FakeLogger(), MOCK_CONFIG);

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

  describe(".loadGame()", () => {
    const bot = new DiscordClientMock();
    const handler = new MessageHandler(bot, new FakeLogger(), MOCK_CONFIG);

    it("should print out an error and not load if the game file doesn't exist", () => {
      const channel = bot.mockChannel();
      handler.targetChannel = channel;

      handler.loadGame({
        path: "foo/bar.z5"
      });

      assert.equal(handler.mode, 0);
      assert.equal(
        channel.lastMessage,
        "Tried to locate game file on server, but failed. See server logs for more details.");
    });

    it("should load normally if a file exists", () => {
      const channel = bot.mockChannel();
      handler.targetChannel = channel;
      fs.writeFileSync("test.z5", "abcdef");

      handler.loadGame({
        path: "test.z5"
      });
      const mode = handler.mode;
      const message = channel.lastMessage;

      handler.closeGame();
      fs.unlinkSync("test.z5");

      assert.equal(mode, 1);
    });
  });

});
