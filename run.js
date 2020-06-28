const { token, prefix, musa } = require('./internal/config');

musa.on('ready', () => console.log(`Logged in as ${musa.user.tag}`));

function cmdcheck(cmd, msg, args) {
    try {
        const { command } = require(`./cmds/${cmd}`);
        return command(msg, args)
    } catch (e) {
        console.log(e);
        return false
    }
}

musa.on('message', (msg) => {
    if (msg.author.bot) return;
    if (msg.content.indexOf(prefix) !== 0) return;
    if (msg.channel.type === "dm") return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    switch (cmd) {
        case 'music':
            cmdcheck(cmd, msg, args)
            break;
        case 'help':
            cmdcheck(cmd, msg, args)
            break;
        case 'info':
            cmdcheck(cmd, msg, args)
            break;
        default:
            msg.channel.send('That command doesn\'t exist.');
    }
})

musa.login(token);