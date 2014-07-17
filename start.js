var cluster    = require('cluster');
var numCPUs    = require('os').cpus().length;
var server     = require('./server');
//global.mongodb = require('./mongodb');
//global.mysql = require('./mysql');

var config = {
    server: {
        port: 8888
    },
    mongodb: {
        host: 'localhost',
        port: 27017,
        db: 'mymongodb', 
        poolSize: 5
    },
    mysql: {
        host     : '127.0.0.1',
        user     : 'root',
        port     : '3306',
        password : 'mypassword',
        database : 'mydatabase',
        connectionLimit : 10,
    }
}

//server.start(config.server);
//mongodb.start(config['mongodb']);
//server.start(config['server']);

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('listening', function(worker, address) {
        console.log('A worker is now connected to ' + address.address + ':' + address.port);
    });
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
        //cluster.fork();  //if died create new children
    });
} 
else 
{
    //mysql.start(config.mysql);
    //mongodb.start(config.database);
    server.start(config.server);
}
