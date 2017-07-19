const spawnClient = require("./client-spawner.js");
const MessageHandler = require("./MessageHandler.js");
var appConfig = require("./config.json");
var Discord = require('discord.io');

spawnClient(appConfig);
