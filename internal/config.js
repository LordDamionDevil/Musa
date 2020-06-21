require('dotenv').config();
const dapi = require('discord.js');
const prefix = process.env.prefix;
const token = process.env.token;
const sc = require('soundcloud-downloader');
const ytdl = require('ytdl-core-discord');
const { queue } = require('./../internal/queuehandler.js');

const musa = new dapi.Client();

function urlck(url) {
    var youtube = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
    var soundcloud = /^(https?\:\/\/)?(www\.)?(soundcloud\.com)\/.+$/
    if(youtube.test(url)) return 1
    if(soundcloud.test(url)) return 2
    return false
}

async function play(msg, url, connection) {
    if(msg.member.voice.channel) {
        msg.member.voice.channel.join().then(async (nconnection) => {
            if(urlck(url) === 1) {
                const song = await ytdl(url);
                const dispatcher = nconnection.play(song, {type: 'opus'});
                dispatcher.on('finish', () => {
                    var gqueue = queue.find(queues => queues.guid === msg.guild.id);
                    if (gqueue.queue.length > 0) return play(false, url, nconnection)
                    return nconnection.channel.leave();
                })
            } else {
                sc.download(url, '3JLYybc5BG7YPqpXxjNj8OQMnRMGYbIm').then(stream => {
                    const dispatcher = nconnection.play(stream);
                    dispatcher.on('finish', () => {
                        var gqueue = queue.find(queues => queues.guid === msg.guild.id);
                        if(gqueue.queue.length > 0) return play(false, url, nconnection)
                        return nconnection.channel.leave();
                    })
                })
            }
        })
    } else {
        msg.channel.send('You are not in a VC.')
    }
    if(connection) {
        if(urlck(url) === 1) {
            const song = await ytdl(url);
            const dispatcher = connection.play(song, {type: 'opus'});
            dispatcher.on('finish', () => {
                var gqueue = queue.find(queues => queues.guid === msg.guild.id);
                if (gqueue.queue.length > 0) return play(false, url, connection)
                return connection.channel.leave();
            })
        } else {
            sc.download(url, '3JLYybc5BG7YPqpXxjNj8OQMnRMGYbIm').then(stream => {
                const dispatcher = connection.play(stream);
                dispatcher.on('finish', () => {
                    var gqueue = queue.find(queues => queues.guid === msg.guild.id);
                    if(gqueue.queue.length > 0) return play(false, url, connection)
                    return connection.channel.leave();
                })
            })
        }
    }
}

exports.musa = musa;
exports.prefix = prefix;
exports.token = token;
exports.sc = sc;
exports.ytdl = ytdl;
exports.urichk = urlck;
exports.play = play;