var express = require('express');

exports.start = function (config) {
    var app = express();
    
    app.use(function(req, res, next){
        console.log('%s %s', req.method, req.url);
        next();
    });

     app.use(express.static( __dirname + '/public'));    
    
    var env = process.env.NODE_ENV || 'development';
    if ('development' == env) {       
    }
    else {       
    }

    require('./router')(app);

    var server = app.listen(config.port, function() {
        console.log('Listening on port %d', server.address().port);
    });
}
