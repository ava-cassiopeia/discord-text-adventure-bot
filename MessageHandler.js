const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');
var utf8 = require('utf8');

var spawn = require('child_process').spawn;
var stripAnsi = require('strip-ansi');

const appConfig = require("./config.json");

class MessageHandler{

    constructor(bot){
        this.bot = bot;
        this.mode = 0; // start in menu mode
        this.game = null;
        this.targetChannel = null;
        this.compiledOutput = "";
    }

    onMessage(user, userID, channelID, message, event){
        // message event will be called even on the bot's messages, so we
        // create this base-case to skip any message from this
        if(userID == this.bot.id){
            return;
        }

        // we only accept messages that start with "$"
        if(!message || message.length < 1 || message[0] !== "$"){
            return;
        }

        if(message.match(/^(\$info)/)){
            this.sendInfo(channelID);
        }else if(message.match(/^(\$targetChannel)/)){
            this.setTargetChannel(channelID, true);
        }else if(message.match(/^(\$start)/)){
            if(this.mode == 0){
                this.attemptToLoadGame(message);
            }else{
                this.reply("You cannot load a game because a game is already running!");
            }
        }else if(message.match(/^(\$quit)|^(\$q)/)){
            if(this.mode == 1){
                this.closeGame();

                this.reply("The game has been closed!");
            }else{
                this.reply("Nothing to exit from!");
            }
        }else if(message.match(/^(\$save)/)){
            // disable saving for now
            this.reply("Saving is disabled for now.");
        }else{
            // if nothing else, pass through the message to Frotz (assuming
            // Frotz is running
            this.handleMessage(message);
        }
    }

    /*
    * Automatically sends the specified message either to the default channel
    * (if no channel is specified) or the specified channel. If there is no
    * default channel set, and a channelID is not specified, then no message
    * will be sent.
    */
    reply(message, channelID){
        if(!channelID){
            if(this.targetChannel){
                channelID = this.targetChannel;
            }else{
                return;
            }
        }

        this.bot.sendMessage({
            to: channelID,
            message: message
        });
    }

    /*
    * Attempts to load a game based on the given user message. If no game is
    * found, the default channel will be notified.
    */
    attemptToLoadGame(message){
        var split = message.split(" ");

        if(split.length < 2){
            this.reply("What game do you want to start?");
        }else{
            var gameName = split[1].trim();
            var gameConfig = this.findGameConfig(gameName);

            if(gameConfig){
                this.reply("Nice, loading " + gameConfig.prettyName + "!");

                this.loadGame(gameConfig);
            }else{
                this.reply("There is no game by that name!");
            }
        }
    }

    /*
    * Sets the default channel that is used by the reply() method.
    */
    setTargetChannel(channelID, notify = false){
        this.targetChannel = channelID;

        if(notify){
            this.reply("Channel target set to this channel!", channelID);
        }
    }

    /*
    * Loads and starts the game specified by the given game config. This game
    * config should usuially come from the appConfig file.
    */
    loadGame(gameConfig){
        this.game = {
            config: gameConfig
        };

        // Create child process (we'll need to keep track of it in case we
        // need to kill it in the future.
        this.game.child = spawn('frotz', [gameConfig.path]);

        // Setup stream from frotz's stdout so that we can get its output
        this.game.child.stdout.on('data', (chunk) => {
            this.recievedGameOutput(chunk);
        });

        // Try to set the game status of the bot to the current game (this
        // won't always succeed, depending on the bot's permissions)
        this.bot.setPresence({
            idle_since: Date.now(),
            game: gameConfig.prettyName
        });

        console.log("Loaded Game: " + gameConfig.prettyName);

        // 1 == game mode
        this.mode = 1;
    }

    /*
    * Ends the current game and cleans up the process for the game.
    */
    closeGame(){
        // cleanup the child process
        if(this.game && this.game.child){
            this.game.child.kill();
        }

        // clear the game status in Discord
        this.bot.setPresence({
            idle_since: Date.now(),
            game: ""
        });

        // reset handler
        this.game = null;
        this.compiledOutput = "";
        this.mode = 0;
    }

    handleMessage(message){
        // remove the first character, because we're only listening for
        // commands that start with "$"
        var realMessage = message.substring(1, message.length);

        if(this.mode == 1 && this.game){
            this.game.child.stdin.write(realMessage + "\n");
        }
    }

    recievedGameOutput(chunk){
        var _string = decoder.write(chunk);

        if(_string.trim() === ""){
            return;
        }

        var output = stripAnsi(_string);
        output = this.cleanUpOutput(output);

        this.compiledOutput += _string;

        // this marks the end of input
        if(output.match(/(>\r)/)){
            this.sendGameOutput();
        }
    }

    sendGameOutput(){
        var final = stripAnsi(utf8.encode(this.compiledOutput));

        final.replace("\r", "\n");

        final = this.cleanUpOutput(final);

        this.reply(final);
        this.compiledOutput = "";
    }

    sendInfo(channelID){
        var response = "**Mode:** " + this.getModeName(this.mode) + "\n";

        if(!this.targetChannel){
            response += "*Target channel not set. Please set a target channel " +
                "with `$targetChannel`!*\n";
        }

        this.reply(response, channelID);
    }

    findGameConfig(name){
        var x, current;

        for(x = 0; x < appConfig.games.length; x++){
            current = appConfig.games[x];

            if(current.name === name){
                return current;
            }
        }

        return false;
    }

    getModeName(rawMode){
        switch(rawMode){
            case 0:
                return "Menu Mode";
                break;
            case 1:
                return "Game Mode";
                break;
            default:
                return "Unknown Mode";
                break;
        }
    }

    cleanUpOutput(raw){
        var splitRaw = raw.split(/[\n]|[\r]/);
        var output = "";

        for(var x = 0; x < splitRaw.length; x++){
            var curr = splitRaw[x];

            if(curr[0] === "d"){
                output += curr.substring(1, curr.length);
            }else{
                output += curr;
            }

            // Frotz uses carriage returns instead of newlines for some reason,
            // so let's just stay consistent
            output += "\r";
        }

        return output;
    }

}

module.exports = MessageHandler;
