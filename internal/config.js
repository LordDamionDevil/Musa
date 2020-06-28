require('dotenv').config();
const dapi = require('discord.js');
const prefix = process.env.prefix;
const token = process.env.token;
const scid = process.env.SCID;
const sc = require('soundcloud-downloader');
const ytdl = require('ytdl-core-discord');
const pagembed = require('discord-paginationembed');

const musa = new dapi.Client();

function urlck(url) {
    var youtube = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
    var soundcloud = /^(https?\:\/\/)?(www\.)?(soundcloud\.com)\/.+$/
    if(youtube.test(url)) return 1
    if(soundcloud.test(url)) return 2
    return false
}

function msToTime(ms) {
    let sec = Math.floor(ms / 1000);
    let hrs = Math.floor(sec / 3600);
    sec -= hrs * 3600;
    let min = Math.floor(sec / 60);
    sec -= min * 60;

    sec = '' + sec;
    sec = ('00' + sec).substring(sec.length);

    if (hrs > 0) {
        min = '' + min;
        min = ('00' + min).substring(min.length);
        return hrs + ":" + min + ":" + sec;
    }
    else {
        return min + ":" + sec;
    }
}

exports.musa = musa;
exports.dapi = dapi;
exports.prefix = prefix;
exports.token = token;
exports.scid = scid;
exports.sc = sc;
exports.ytdl = ytdl;
exports.urichk = urlck;
exports.mstz = msToTime;
exports.pembed = pagembed;