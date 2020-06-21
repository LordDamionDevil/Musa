const { musa, play } = require('./../internal/config.js');

var qsys = []

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

function remove(guid, num) {

}

exports.add = add;
exports.queue = qsys;