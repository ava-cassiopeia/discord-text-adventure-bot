var appConfig = require("./config.json");

const MessageHandler = require("./MessageHandler.js");

var child = null;

var readline = require('readline');

var Discord = require('discord.io');
var bot = new Discord.Client({
    token: appConfig.api.discord.token,
    autorun: true
});

var messageHandler = new MessageHandler(bot);

process.on('exit', function(){
    bot.disconnect();

    if(child){
        child.kill();
    }

    messageHandler.closeGame();
});

bot.on('ready', function() {
    console.log(bot.username + " - (" + bot.id + ")");
});

bot.on('message', function(user, userID, channelID, message, event) {
    messageHandler.onMessage(user, userID, channelID, message, event);
});
