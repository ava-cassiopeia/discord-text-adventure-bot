# Discord Text Adventure Bot

[![Build Status](https://travis-ci.org/aeolingamenfel/discord-text-adventure-bot.svg?branch=master)](https://travis-ci.org/aeolingamenfel/discord-text-adventure-bot)

This is a Node.js bot for [Discord](https://discordapp.com/) that allows you to
play classic text adventures (such as Zork) in Discord. It is *not* hosted for
you, so you will have to run it yourself.

## Game Support

This bot uses [Frotz](http://frotz.sourceforge.net/) as its interpreter for
text adventure games, so anything that runs in/on Frotz can be run by this bot.

Generally speaking, that means any game with a `.z[number]` file extension.
Please open an issue if you find a game that does not work well with this bot.

## How to Use

You must have [Frotz](http://frotz.sourceforge.net/) installed on the machine
that will run the bot, so that Frotz can be run from the command-line, IE:

```
frotz /path/to/my/game.z5
```

You must also have [Node](https://nodejs.org/en/) and NPM installed.

Once you have Frotz and Node installed, refer to the installation section.

## Installation

First, clone or download the latest version of the project from the Releases
section here on Github. Then, `cd` to project root and install all dependencies:

```
npm install
```

After that, remove the `.example` from `config.json.example` and fill in the
information inside that file accordingly. You will need to create a bot user to
get the token.

Once your `config.json` file is set up, make sure that the bot user that you
created is added to the Discord server where you want the bot to output to.

Then, run `node app.js` from project root to start the bot.

If you set up everything correctly, the bot should be online in your server
and ready to play. Refer to the Bot Commands section for more information.

## Bot Commands

The bot has a set of commands that can be run to load games and play.

---

#### $info

**Useage:** `$info`

Will cause the bot to print out its current state.

---

#### $targetChannel

**Useage:** `$targetChannel`

Will set the target output channel to the channel in which this message was
sent. You *must* set this before starting a game, or you will not see the
output of the game.

---

#### $start

**Useage:** `$start [gameName]`

Starts the specified gamename, which is the `name` specified in the config.json.

---

#### $quit

**Useage:** `$quit` or `$q`

Quits the current game. Will only work when in game mode (aka when a game has
been started with the `$start` command).

## Issues, Bugs, Questions, Suggestions

If you find a bug, have an issue with the implementation, or just have a
suggestion, please just open an issue. I'll try to respond to you as quickly
as possible. Don't bother getting frustrated, I'll happily help you set up an
instance of this bot if you get stuck.
