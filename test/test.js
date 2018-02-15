const assert = require('assert');
const MessageHandler = require("./../src/MessageHandler");
const DiscordClientMock = require("./DiscordClientMock");

const MOCK_CONFIG = {
    settings: {
        commandPrefix: "$",
        commentPrefix: "!!"
    }
};

describe("MessageHandler", function() {

    it("should set the bot to idle upon construction", function() {
        const bot = new DiscordClientMock();
        const handler = new MessageHandler(bot, MOCK_CONFIG);

        assert.equal(bot.presenceState.game, null, "Presense game state should be set to null by default");
        assert.equal(typeof bot.presenceState.idle_since, "number", "Presense idle_since should be a number of milliseconds");
        assert.notEqual(bot.presenceState.idle_since, 0, "Bot idle since should be nonzero number of milliseconds");
    });

});