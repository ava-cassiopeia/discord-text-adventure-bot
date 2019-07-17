#!/usr/bin/env node

/**
 * This is the CLI entrypoint for this bot. When someone installs the bot via
 * NPM, and runs it, this is the file that is executed.
 * 
 * Below, the code attempts to locate a specific config file that indicates 
 * where the game files for particular text adventures are located, and if it 
 * finds it, spawns the bot.
 */

const spawnClient = require("./client-spawner.js");

// name of config file to find
const CONFIG_FILE_NAME = "discord-frotz.config.json";

// Grab the working directory for the command
const WORKING_DIRECTORY = process.cwd();

// Attempt to load the app config, or die trying
let appConfig = null;

try {
  appConfig = require(WORKING_DIRECTORY + "/" + CONFIG_FILE_NAME);
} catch(e) {
  console.warn("No configuration file found! Please create a proper " + CONFIG_FILE_NAME + " file.");
  process.exit(1);
}

spawnClient(appConfig);
