const { musa, urichk } = require('./../internal/config.js');
const { add, remove, queue } = require('./../internal/queuehandler.js');

async function command(msg, args) {
    if(args[0] === 'play') {
        switch (urichk(args[1])) {
            case 1:
                add(msg.guild.id, args[1], msg)
                //msg.channel.send(`${args[1]} is a YouTube link.`)
                break;
            case 2:
                add(msg.guild.id, args[1], msg)
                //msg.channel.send(`${args[1]} is a SoundCloud link.`)
                break;
            default:
                msg.channel.send('Sorry, you didn\'t provide a SoundCloud or YouTube link.')
        }
    }
    console.log(args);
}

exports.command = command;