const { musa, urichk, pembed, dapi } = require('./../internal/config.js');
const { add, remove, queue } = require('./../internal/queuehandler.js');

async function command(msg, args) {
    if(args[0] === 'play') {
        switch (urichk(args[1])) {
            case 1:
                await add(msg.guild.id, args[1], msg)
                break;
            case 2:
                await add(msg.guild.id, args[1], msg)
                //msg.channel.send(`${args[1]} is a SoundCloud link.`)
                break;
            default:
                msg.channel.send('Sorry, you didn\'t provide a SoundCloud or YouTube link.')
        }
    }
    if(args[0] === 'skip') {
        var connection = musa.voice.connections.find(vc => vc.channel.id === msg.member.voice.channelID);
        if(connection){
            remove(msg, msg.guild.id, connection)
        } else {
            msg.channel.send('Sorry, you aren\'t in a VC with me.')
        }
    }
    if(args[0] === 'queue') {
        var guild = queue.find(queues => queues.guid === msg.guild.id);
        if(guild) {
            var qclon = guild.queue.map((x) => x);
            qclon.splice(0, 1);
            if(qclon.length > 0) {
                const Pagination = new pembed.FieldsEmbed()
                    .setArray(qclon)
                    .setAuthorizedUsers([ msg.author.id ])
                    .setChannel(msg.channel)
                    .setElementsPerPage(5)
                    .setDisabledNavigationEmojis(['delete'])
                    .formatField(
                        '# - Song',
                        t =>
                            `**${qclon.indexOf(t) + 1}** - [**${t.name}**](${t.url}) requested by ${t.sender}`
                    );
                Pagination.embed
                    .setTitle('Now Playing...')
                    .setDescription([
                        `[**${guild.queue[0].name}**](${guild.queue[0].url}) requested by **${guild.queue[0].sender}**`,
                    ])
                    .setColor(0xFE9257);
                Pagination.build();
            } else {
                const embed = new dapi.MessageEmbed()
                    .setColor(0xFE9257)
                    .setTitle('Now Playing...')
                    .setDescription([
                        `[**${guild.queue[0].name}**](${guild.queue[0].url}) requested by **${guild.queue[0].sender}**`,
                    ])
                msg.channel.send(embed);
            }
        } else {
            msg.channel.send('I am not playing in this guild so there is no queue.')
        }
    }
    console.log(args);
}

exports.command = command;