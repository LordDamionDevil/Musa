const { musa, urichk, ytdl, sc } = require('./../internal/config.js');

var qsys = []

async function play(msg, url, connection) {
    var gqueue = qsys.find(queues => queues.guid === msg.guild.id);
    if (connection && msg) {
        if (urichk(url) === 1) {
            const song = await ytdl(url);
            const dispatcher = connection.play(song, {type: 'opus'});
            dispatcher.on('finish', () => {
                var gqueue = qsys.find(queues => queues.guid === msg.guild.id);
                gqueue.queue.splice(0, 1);
                if (gqueue.queue.length > 0) return play(msg, gqueue.queue[0], connection)
                return connection.channel.leave();
            })
        } else {
            sc.download(url, '3JLYybc5BG7YPqpXxjNj8OQMnRMGYbIm').then(stream => {
                const dispatcher = connection.play(stream);
                dispatcher.on('finish', () => {
                    var gqueue = qsys.find(queues => queues.guid === msg.guild.id);
                    gqueue.queue.splice(0, 1);
                    if (gqueue.queue.length > 0) return play(msg, gqueue.queue[0], connection)
                    return connection.channel.leave();
                })
            })
        }
    }
    if(msg && msg.member.voice.channel) {
        msg.member.voice.channel.join().then(async (nconnection) => {
            if(urichk(url) === 1) {
                const song = await ytdl(url);
                const dispatcher = nconnection.play(song, {type: 'opus'});
                dispatcher.on('finish', () => {
                    var gqueue = qsys.find(queues => queues.guid === msg.guild.id);
                    gqueue.queue.splice(0,1);
                    if (gqueue.queue.length > 0) return play(msg, gqueue.queue[0], nconnection)
                    return nconnection.channel.leave();
                })
            } else {
                sc.download(url, '3JLYybc5BG7YPqpXxjNj8OQMnRMGYbIm').then(stream => {
                    const dispatcher = nconnection.play(stream);
                    dispatcher.on('finish', () => {
                        var gqueue = qsys.find(queues => queues.guid === msg.guild.id);
                        gqueue.queue.splice(0,1);
                        if(gqueue.queue.length > 0) return play(msg, gqueue.queue[0], nconnection)
                        return nconnection.channel.leave();
                    })
                })
            }
        })
    } else {
        msg.channel.send('You are not in a VC.')
    }
}

function remove(msg, guid, connection) {
    var gqueue = qsys.find(queues => queues.guid === msg.guild.id);
    if(gqueue.queue.length > 0) {
        gqueue.queue.splice(0, 1)
        play(msg, gqueue.queue[0], connection)
    } else {
        msg.channel.send('There is nothing left in the queue.')
    }
}

function add(guid, url, msg) {
    var guildqueue = qsys.find(queues => queues.guid === guid);
    if(guildqueue) {
        if(guildqueue.queue.includes(url)) {
            return console.log('Error URL already in queue')
        } else {
            guildqueue.queue.push(url);
            return console.log('URL Added')
        }
    } else {
        var push = {};
        push["guid"] = guid;
        push["queue"] = new Array(url);
        qsys.push(push);
        play(msg, url, false);
    }
}

exports.add = add;
exports.queue = qsys;
exports.remove = remove;