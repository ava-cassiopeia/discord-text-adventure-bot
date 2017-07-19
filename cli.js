#!/usr/bin/env node

const spawnClient = require("./client-spawner.js");

// name of config file to find
const CONFIG_FILE_NAME = "discord-frotz.config.json";

// Grab the working directory for the command
const WORKING_DIRECTORY = process.cwd();

let appConfig = null;

try {
    appConfig = require(WORKING_DIRECTORY + "/" + CONFIG_FILE_NAME);
} catch(e) {
    console.warn("No configuration file found! Please create a proper " + CONFIG_FILE_NAME + " file.");
    process.exit(1);
}

spawnClient(appConfig);
