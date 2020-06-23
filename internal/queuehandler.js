const { musa, urichk, ytdl, sc } = require('./../internal/config.js');

var qsys = []

async function play(msg, url, connection) {
    if (connection && msg) {
        if (urichk(url) === 1) {
            const song = await ytdl(url, { filter: "audioonly", highWaterMark: 1<<25 });
            const dispatcher = connection.play(song, {type: 'opus'});
            dispatcher.on('finish', () => {
                var gqueue = qsys.find(queues => queues.guid === msg.guild.id);
                if(gqueue.skip) delete gqueue.skip;
                gqueue.queue.splice(0, 1);
                if (gqueue.queue.length > 0) return play(msg, gqueue.queue[0].url, connection)
                connection.channel.leave();
                var number = qsys.map(function(guild) { return guild.guid; }).indexOf(gqueue.guid);
                qsys.splice(number, 1);
            })
        } else {
            sc.download(url, '3JLYybc5BG7YPqpXxjNj8OQMnRMGYbIm').then(stream => {
                const dispatcher = connection.play(stream);
                dispatcher.on('finish', () => {
                    var gqueue = qsys.find(queues => queues.guid === msg.guild.id);
                    if(gqueue.skip) delete gqueue.skip;
                    gqueue.queue.splice(0, 1);
                    if (gqueue.queue.length > 0) return play(msg, gqueue.queue[0].url, connection)
                    connection.channel.leave();
                    var number = qsys.map(function(guild) { return guild.guid; }).indexOf(gqueue.guid);
                    qsys.splice(number, 1);
                })
            })
        }
    }
    if(msg && msg.member.voice.channel) {
        msg.member.voice.channel.join().then(async (nconnection) => {
            if(urichk(url) === 1) {
                const song = await ytdl(url, { filter: "audioonly", highWaterMark: 1<<25 });
                const dispatcher = nconnection.play(song, {type: 'opus'});
                dispatcher.on('finish', () => {
                    var gqueue = qsys.find(queues => queues.guid === msg.guild.id);
                    if(gqueue.skip) delete gqueue.skip;
                    gqueue.queue.splice(0,1);
                    if (gqueue.queue.length > 0) return play(msg, gqueue.queue[0].url, nconnection)
                    nconnection.channel.leave();
                    var number = qsys.map(function(guild) { return guild.guid; }).indexOf(gqueue.guid);
                    qsys.splice(number, 1);
                })
            } else {
                sc.download(url, '3JLYybc5BG7YPqpXxjNj8OQMnRMGYbIm').then(stream => {
                    const dispatcher = nconnection.play(stream);
                    dispatcher.on('finish', () => {
                        var gqueue = qsys.find(queues => queues.guid === msg.guild.id);
                        if(gqueue.skip) delete gqueue.skip;
                        gqueue.queue.splice(0,1);
                        if(gqueue.queue.length > 0) return play(msg, gqueue.queue[0].url, nconnection)
                        nconnection.channel.leave();
                        var number = qsys.map(function(guild) { return guild.guid; }).indexOf(gqueue.guid);
                        qsys.splice(number, 1);
                    })
                })
            }
        })
    } else {
        msg.channel.send('You are not in a VC.')
        var number = qsys.map(function(guild) { return guild.guid; }).indexOf(msg.guild.id);
        qsys.splice(number, 1);
    }
}

function remove(msg, guid, connection) {
    var gqueue = qsys.find(queues => queues.guid === msg.guild.id);
    if(gqueue.queue.length > 1) {
        var listeners = connection.channel.members.size - 1;
        if(gqueue.skip && gqueue.skip.current.find(users => users === msg.author.id)) return msg.channel.send(`You have already voted to skip!\nVotes:\n**${gqueue.skip.current.length}/${gqueue.skip.required}**`)
        if(!gqueue.skip) gqueue.skip = { required: Math.round(listeners / 2), current: [ msg.author.id ] };
        if(!gqueue.skip.current.find(users => users === msg.author.id)) gqueue.skip.current.push(msg.author.id);
        if(gqueue.skip.current.length >= gqueue.skip.required) {
            gqueue.queue.splice(0, 1);
            delete gqueue.skip;
            play(msg, gqueue.queue[0].url, connection);
        } else {
            msg.channel.send(`You are now logged for skipping the song!\nVotes:\n**${gqueue.skip.current.length}/${gqueue.skip.required}**`);
        }
    } else {
        msg.channel.send('There is nothing left in the queue.');
    }
}

async function add(guid, url, msg) {
    var guildqueue = qsys.find(queues => queues.guid === guid);
    if(guildqueue) {
        if(guildqueue.queue.find(table => table.url === url)) {
            return console.log('Error URL already in queue')
        } else {
            switch (urichk(url)) {
                case 1:
                    await ytdl.getInfo(url, (err, info) => {
                        guildqueue.queue.push({
                            name: info.title,
                            url: url,
                            sender: msg.member.displayName
                        });
                        msg.channel.send(`**${info.title}** has been added to the queue.`);
                    }).catch(err => { return msg.channel.send('Sorry, You didn\'t provide a valid YouTube link.') });
                    break;
                case 2:
                    sc.getInfo(url, '3JLYybc5BG7YPqpXxjNj8OQMnRMGYbIm').then(info => {
                        guildqueue.queue.push({
                            name: info.title,
                            url: url,
                            sender: msg.member.displayName
                        });
                        msg.channel.send(`**${info.title}** has been added to the queue.`);
                    }).catch(err => msg.channel.send('Sorry, You didn\'t provide a valid SoundCloud link.'))
                    break;
                default:
                    console.log('An Error Occured.');
            }
        }
    } else {
        switch (urichk(url)) {
            case 1:
                await ytdl.getInfo(url, (err, info) => {
                    qsys.push({
                        guid: guid,
                        queue: [
                            {
                                name: info.title,
                                url: url,
                                sender: msg.member.displayName
                            }
                        ]
                    });
                    play(msg, url, false);
                    msg.channel.send(`**${info.title}** has been added to the queue & started playing.`);
                }).catch(err => msg.channel.send('Sorry, You didn\'t provide a valid YouTube link.'));
                break;
            case 2:
                sc.getInfo(url, '3JLYybc5BG7YPqpXxjNj8OQMnRMGYbIm').then(info => {
                    qsys.push({
                        guid: guid,
                        queue: [
                            {
                                name: info.title,
                                url: url,
                                sender: msg.member.displayName
                            }
                        ]
                    });
                    msg.channel.send(`**${info.title}** has been added to the queue & started playing.`);
                    play(msg, url, false);
                }).catch(err => msg.channel.send('Sorry, You didn\'t provide a valid SoundCloud link.'))
                break;
            default:
                console.log('An Error Occured.');
        }
    }
}

exports.add = add;
exports.queue = qsys;
exports.remove = remove;