var cluster    = require('cluster');
var numCPUs    = require('os').cpus().length;
var server     = require('./server');
var fs         = require('fs');
global.async   = require('async');
global.config  = require('./config')();
//var cronjob    = require('./system/cronjob')(config.cronjob);

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    //cronjob.start();
    cluster.on('listening', function(worker, address) {
        console.log('A worker is now connected to ' + address.address + ':' + address.port);
    });
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
        cluster.fork();  //if died create new children
    });
}
else
{
    server.start(config.server);
}
