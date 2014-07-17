var express = require('express');
var fs = require('fs');
var expressValidator = require('express-validator');

exports.start = function (config) {
    var app = express();
    var access_logfile = fs.createWriteStream('./log/access.log', {flags: 'a'});


    app.configure(function() {
        app.use(express.bodyParser());
        app.use(expressValidator);
        app.use(express.static( __dirname + '/public'));
        app.use(app.router);
        app.use(express.logger({stream: access_logfile, immediate: true}));
        /*
        //web basic auth
        app.use(express.basicAuth(function(user, pass) {
            return user === 'testUser' && pass === 'testPass';
        }));
        */

    });

    app.configure('development', function() {
        app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
    });

    app.configure('production', function() {
        app.use(express.errorHandler());
    });

    require('./router')(app);

    app.listen(config.port);
}
