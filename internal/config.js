require('dotenv').config();
const dapi = require('discord.js');
const prefix = process.env.prefix;
const token = process.env.token;
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

exports.musa = musa;
exports.dapi = dapi;
exports.prefix = prefix;
exports.token = token;
exports.sc = sc;
exports.ytdl = ytdl;
exports.urichk = urlck;
exports.pembed = pagembed;