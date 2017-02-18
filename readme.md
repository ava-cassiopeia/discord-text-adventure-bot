# Discord Text Adventure Bot

[![Build Status](https://travis-ci.org/aeolingamenfel/discord-text-adventure-bot.svg?branch=master)](https://travis-ci.org/aeolingamenfel/discord-text-adventure-bot)

This is a Node.js bot for [Discord](https://discordapp.com/) that allows you to
play classic text adventures (such as Zork) in Discord. It is *not* hosted for
you, so you will have to run it yourself.

![Bot Demonstration](https://static.ivanmattie.com/img/github/discord-text-adventure-bot/ZBJy77sNkz.gif "Bot Demonstration GIF")

## Game Support

This bot uses an implementation of [Frotz](http://frotz.sourceforge.net/) as its
interpreter for text adventure games, called 
[Dumb Frotz](https://github.com/DavidGriffith/frotz/blob/master/DUMB). So
anything that runs in/on Frotz can be run by this bot.

Generally speaking, that means any game with a `.z[number]` file extension.
Please open an issue if you find a game that does not work well with this bot.

## How to Use

You must have 
[Dumb Frotz](https://github.com/DavidGriffith/frotz/blob/master/DUMB) installed
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
[Frotz Github](https://github.com/DavidGriffith/frotz).

## Disclaimer for Windows Users

Due to the implementation of the Frotz port on Windows, the bot cannot be run
on Windows. The only existing workaround is the
[Windows Linux Subsystem](https://msdn.microsoft.com/en-us/commandline/wsl/install_guide)
wherein you can run my bot from a Linux/Unix system in Windows, which will work
properly. Please take a look at the link above for more information on using
that system.

On my list of things to do is a fork of Frotz specifically built for my bot,
which would fix this problem, but in the meantime, Windows users are out of
luck.

*Developer Note:* This disclaimer *may* not longer be valid now that this 
project has switched to Dumb Frotz. However, it has not yet been tested on 
Windows. Please
[drop me a line](https://github.com/aeolingamenfel/discord-text-adventure-bot/issues)
if this is no longer the case and this disclaimer will be removed.

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

#### $adventureListenChannel

**Usage:** `$adventureListenChannel`

Will set the channel that this command is typed in the be the *only* channel 
that accepts commands for the bot. 

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
