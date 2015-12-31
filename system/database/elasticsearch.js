var elasticsearch = require('elasticsearch');

exports.start = function (config) {
    var client = {
        host: config.database.host + ":" + config.database.port
    };
    if (config.server.environment == 'staging') {
        client.log = 'trace'
    }
    else {
        // client.log = {
        //     type: 'file',
        //     level: 'trace',
        //     path: './log/elasticsearch.log'
        // }
    }
    return search = elasticsearch.Client(client);
};