const { dapi, musa } = require('./../internal/config');

async function command(msg, args) {
    var totalSeconds = (musa.uptime / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = Math.floor(totalSeconds % 60);
    var uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    var embed = new dapi.MessageEmbed()
        .setColor(7664119)
        .setAuthor('Musa | Prefix: ?', musa.user.displayAvatarURL())
        .addField('Version', '1.0.0', true)
        .addField('NodeJS', '12.13.1', true)
        .addField('Library', '[discord.js](https://discord.js.org/)', true)
        .addField('Guilds', musa.guilds.cache.size, true)
        .addField('Users', musa.users.cache.size, true)
        .addField(`Support`, `[Join Server](https://discord.gg/ayVdTbX)`, true)
        .addField('Uptime', uptime)
        .setFooter('Developed by LordDamionDevil#4964', 'https://cdn.discordapp.com/avatars/82662823523516416/ac76231c30839793766d500876553270.png');
    msg.channel.send(embed)
}

exports.command = command;