const MessageHandler = require("./MessageHandler.js");
const Discord = require("discord.io");

module.exports = function(appConfig) {
  // Create Discord Bot (based on token in config)
  var bot = new Discord.Client({
    token: appConfig.api.discord.token,
    autorun: true
  });

  // Handler that will take messages and pass them through to Frotz
  var messageHandler = new MessageHandler(bot, appConfig);

  process.on("exit", function(){
    // gracefully clean up connection to Discord
    bot.disconnect();

    // we need to close the game so there is not a lingering child process
    // running in the background
    messageHandler.closeGame();
  });

  bot.on("ready", function() {
    console.log(bot.username + " - (" + bot.id + ")");

    // Set discord status
    if (messageHandler.mode == 1 && messageHandler.game){
      messageHandler.setBotOnline(messageHandler.game.config.prettyName);
    }
    else{
      messageHandler.setBotIdle();
    }
  });

  bot.on("message", function(user, userID, channelID, message, event) {
    messageHandler.onMessage(user, userID, channelID, message, event);
  });

  bot.on("disconnect", function(errMsg, code) {
    bot.connect();
  });
};
