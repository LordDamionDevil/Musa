const { dapi, musa } = require('./../internal/config');

async function command(msg, args) {
    switch (args[0]) {
        case 'music':
            var embed = new dapi.MessageEmbed()
                .setColor(7664119)
                .setTitle('Musa\'s Music Section')
                .setThumbnail(musa.user.displayAvatarURL())
                .addField('m?music play (URL)', 'Plays/Adds the specified URL(SoundCloud or YouTube)')
                .addField('m?music queue', 'Shows the playing song and the queue.')
                .addField('m?music skip', 'Starts a vote skip for the current playing song.')
                .addField('m?music pause', 'Pauses the Playback.\n**Requires Administrator Permission**')
                .addField('m?music resume', 'Resumes the Playback.\n**Requires Administrator Permission**');
            msg.channel.send(embed)
            break;
        default:
            var embed = new dapi.MessageEmbed()
                .setColor(7664119)
                .setTitle('Musa\'s Help Section')
                .setThumbnail(musa.user.displayAvatarURL())
                .addField('m?help', 'Display all commands/utilities.')
                .addField('m?info', 'Shows the info of the bot(Version, Library, Counts, Uptime and invite to support server)')
                .addField('m?music', 'Music Command e.g. **m?music play (SoundCloud or YouTube URL)** do **m?help music** for more information');
            return msg.channel.send(embed);
    }
}

exports.command = command;