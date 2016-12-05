const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');

var appConfig = require("./config.json");

var child = null;

var readline = require('readline');
var spawn = require('child_process').spawn;
var stripAnsi = require('strip-ansi');

var Discord = require('discord.io');
var bot = new Discord.Client({
    token: appConfig.api.discord.token,
    autorun: true
});

var globalChannelTarget = null;
var started = false;

process.on('exit', function(){
    bot.disconnect();

    if(child){
        child.kill();
    }
});

bot.on('ready', function() {
    console.log(bot.username + " - (" + bot.id + ")");
});

bot.on('message', function(user, userID, channelID, message, event) {
    // the message event will be called even when the bot itself
    // sends a message, so we do this to stop it from proc-ing off
    // itself.
    if(userID == bot.id){
        return;
    }

    if (message === "!gl_set") {
        globalChannelTarget = channelID;

        bot.sendMessage({
            to: globalChannelTarget,
            message: "Channel target set!"
        });
    }else if(message === "!start"){
        child = spawn('frotz', ["/Users/imattie/text_adventures/zork1.z5"]);

        child.stdout.on('data', function(chunk) {
            var _string = decoder.write(chunk);

            if(_string.trim() === ""){
                return;
            }

            var output = stripAnsi(_string);
            output = cleanUpOutput(output);

            bot.sendMessage({
                to: globalChannelTarget,
                message: output
            });
        });

        started = true;
    }else if(started){
        child.stdin.write(message + "\n");

        //child.stdin.end();
    }
});

function cleanUpOutput(raw){
    var splitRaw = raw.split(/[\n]|[\r]/);
    var output = "";

    for(var x = 0; x < splitRaw.length; x++){
        var curr = splitRaw[x];

        if(curr[0] === "d"){
            output += curr.substring(1, curr.length);
        }else{
            output += curr;
        }

        output += "\r";
    }

    return output;
}
