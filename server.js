var express = require('express');
var fs = require('fs');
var expressValidator = require('express-validator');

exports.start = function (config) {
    var app = express();
    //var access_logfile = fs.createWriteStream('./log/access.log', {flags: 'a'});
    //app.use(express.cookieParser());
    //app.use(express.bodyParser());
    //app.use(expressValidator);
    app.use(express.static( __dirname + '/htdocs'));    
    //app.use(express.logger({stream: access_logfile, immediate: true}));

    /*
    //web basic auth
    app.use(express.basicAuth(function(user, pass) {
        return user === 'testUser' && pass === 'testPass';
    }));
    */

    var env = process.env.NODE_ENV || 'development';
    if ('development' == env) {
       //app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
    }
    else {
       //app.use(express.errorHandler()); 
    }

    require('./router')(app);

    var server = app.listen(config.port, function() {
        console.log('Listening on port %d', server.address().port);
    });
}
