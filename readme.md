# Discord Text Adventure Bot

[![Build Status](https://travis-ci.org/aeolingamenfel/discord-text-adventure-bot.svg?branch=master)](https://travis-ci.org/aeolingamenfel/discord-text-adventure-bot)
[![npm version](https://badge.fury.io/js/discord-frotz.svg)](https://badge.fury.io/js/discord-frotz)

This is a Node.js bot for [Discord](https://discordapp.com/) that allows you to
play classic text adventures (such as Zork) in Discord. It is *not* hosted for
you, so you will have to run it yourself.

---

  - [Roadmap](#roadmap)
  - [Game Support](#game-support)
  - [How to Use](#how-to-use)
    - [Installing Dumb Frotz](#installing-dumb-frotz)
  - [Installation](#installation)
    - [NPM Installation](#npm-installation)
    - [Manual Installation](#manual-installation)
  - [Creating a Bot User](#creating-a-bot-user)
  - [Bot Commands](#bot-commands)
    - [Get Bot Info](#get-bot-info)
    - [Get Bot Help](#get-bot-help)
    - [List Available Games](#list-available-games)
    - [Set Target Output Channel](#set-target-output-channel)
    - [Set Target Listening Channel](#set-target-listening-channel)
    - [Start an Adventure](#start-an-adventure)
    - [Quit an Adventure](#quit-an-adventure)
  - [Development](#development)
    - [Tests](#tests)
    - [Linting](#linting)
  - [Issues, Bugs, Questions, Suggestions](#issues-bugs-questions-suggestions)
  - [Legal](#legal)

## Roadmap

This is a list of eventual upgrades that will be made to the project.

  - [x] Host the base bot code as a NPM project, so it can be installed as a NPM global command
  - [ ] Ability to run multiple different games on different channels
  - [ ] Ability to save state of game

## Game Support

This bot uses an implementation of [Frotz](http://frotz.sourceforge.net/) as its
interpreter for text adventure games, called
[Dumb Frotz](https://gitlab.com/DavidGriffith/frotz/blob/master/DUMB). So
anything that runs in/on Frotz can be run by this bot.

Generally speaking, that means any game with a `.z[number]` file extension.
Please open an issue if you find a game that does not work well with this bot.

## How to Use

You must have
[Dumb Frotz](https://gitlab.com/DavidGriffith/frotz/blob/master/DUMB) installed
on the machine that will run the bot, so that Frotz can be run from the command
line, IE:

```
dfrotz /path/to/my/game.z5
```

Please refer to the Installing Dumb Frotz section below for more details.

You must also have [Node](https://nodejs.org/en/) and NPM installed.

Once you have Dumb Frotz and Node installed, refer to the installation section.

### Installing Dumb Frotz

If you are a Windows user, you have a pre-compiled version of `dfrotz` available
[here](http://www.ifarchive.org/indexes/if-archiveXinfocomXinterpretersXfrotz.html)
(see the `dfrotz.zip` file). All you have to do is add the `dfrotz.exe` file to
your PATH and you will be good to go!

For macOS and Linux users, you'll need to manually compile the lastest version of
Frotz in its "dumb" mode. This is well documented on the
[Frotz GitLab page](https://gitlab.com/DavidGriffith/frotz).

## Installation

See below for the two different methods on installing the actual bot. You can
either install it from NPM or manually; whatever works for you best.

### NPM Installation

You can install the bot software from NPM. You'll still need to
[install Dumb Frotz](#installing-dumb-frotz), but you can get the bot by running
the following:

```CLI
npm i -g discord-frotz
```

Then, wherever you want, create a configuration file called
`discord-frotz.config.json`, based on the `config.json.example` file available
in this repository.

Once the config file is created, just run `discort-frotz` from the same
directory as the `discord-frotz.config.json` config file, and it will use that
config file to start the bot.

If you set up everything correctly, the bot should be online in your server
and ready to play. Refer to the Bot Commands section for more information.

### Manual Installation

First, clone or download the latest version of the project from the Releases
section here on Github. Then, `cd` to project root and install all dependencies:

```CLI
npm install
```

After that, remove the `.example` from `config.json.example` and fill in the
information inside that file accordingly. You will need to create a bot user to
get the token. Refer to the "Creating a Bot User" section below for more
information.

Once your `config.json` file is set up, make sure that the bot user that you
created is added to the Discord server where you want the bot to output to.

Then, run `node app.js` or `npm run start` from project root to start the bot.

If you set up everything correctly, the bot should be online in your server
and ready to play. Refer to the Bot Commands section for more information.

## Creating a Bot User

To create a bot user, follow these steps:

1. Go to the [Discord site](https://discord.gg/) and sign in (or make an
account)
2. Once you are signed in, follow
[this link](https://discordapp.com/developers/applications/me) to get to the
developer page
3. Click on the "My Apps" section on the left side (if you aren't already in
that section), and then click "New App" and setup your new app. This app will
wrap your bot user, so name it appropriately
4. On the new app's page, click the "Create a Bot User" button
5. Click the "click to reveal" button next to the Token section in the bot user
this is the token that you will use in the `api.discord.token` field in the
`config.json`

That's all the steps to create your bot user. The last step required is adding
the bot user to your server, if you would like:

To add the bot user, following the instructions [found here](http://stackoverflow.com/questions/37689289/joining-a-server-with-the-discord-python-api).
These instructions are for a python server but they apply just the same to your
bot as well.

After the bot user is added, you can boot up the application and interact with
it normally in your server.

## Bot Commands

The bot has a set of commands that can be run to load games and play.

### Get Bot Info

**Useage:** `$info`

Will cause the bot to print out its current state.

### Get Bot Help

**Useage:** `$help`

Prints out help information on how to use the bot.

### List Available Games

**Usage:** `$list`

Lists all available games (based on your `config.json` file).

### Set Target Output Channel

**Useage:** `$targetChannel`

Will set the target output channel to the channel in which this message was
sent. You *must* set this before starting a game, or you will not see the
output of the game.

### Set Target Listening Channel

**Usage:** `$adventureListenChannel`

Will set the channel that this command is typed in the be the *only* channel
that accepts commands for the bot.

### Start an Adventure

**Useage:** `$start [gameName]`

Starts the specified gamename, which is the `name` specified in the config.json.

### Quit an Adventure

**Useage:** `$quit` or `$q`

Quits the current game. Will only work when in game mode (aka when a game has
been started with the `$start` command).

## Development

### Tests

Tests are written using [Mocha](https://mochajs.org/), and run with the
following:

```
npm run test
```

### Linting

Linting uses [eslint](https://eslint.org/) and is run with the following:

```
npm run lint
```

You can also run eslint with the automated `--fix` flag using:

```
npm run lint-fix
```

## Issues, Bugs, Questions, Suggestions

If you find a bug, have an issue with the implementation, or just have a
suggestion, please just open an issue. I'll try to respond to you as quickly
as possible. Don't bother getting frustrated, I'll happily help you set up an
instance of this bot if you get stuck.

## Legal

The name "Discord" is copyright and trademarked Discord Inc.
