const { dapi, musa } = require('./../internal/config');

async function command(msg, args) {
    switch (args[0]) {
        case 'music':
            var embed = new dapi.MessageEmbed()
                .setColor(7664119)
                .setTitle('Musa\'s Music Section')
                .setThumbnail(musa.user.displayAvatarURL())
                .addField('?music play (URL)', 'Plays/Adds the specified URL(SoundCloud or YouTube)')
                .addField('?music queue', 'Shows the playing song and the queue.')
                .addField('?music skip', 'Starts a vote skip for the current playing song.')
                .addField('?music pause', 'Pauses the Playback.\n**Requires Administrator Permission**')
                .addField('?music resume', 'Resumes the Playback.\n**Requires Administrator Permission**');
            msg.channel.send(embed)
            break;
        default:
            var embed = new dapi.MessageEmbed()
                .setColor(7664119)
                .setTitle('Musa\'s Help Section')
                .setThumbnail(musa.user.displayAvatarURL())
                .addField('?help', 'Display all commands/utilities.')
                .addField('?music', 'Music Command e.g. **?music play (SoundCloud or YouTube URL)** do **?help music** for more information');
            return msg.channel.send(embed);
    }
}

exports.command = command;