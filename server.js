var express     = require('express');
var morgan      = require('morgan')
var bodyParser  = require('body-parser');
var nunjucks    = require('nunjucks');
var FileStreamRotator = require('file-stream-rotator')

exports.start = function (config) {
    var app = express();
    //var env = process.env.NODE_ENV || 'development';
    console.log("Environment: " + config.environment);
    var accessLogStream;
    if (config.environment == 'staging') {
        nunjucks.configure('application/views', {
            autoescape : true,
            express    : app,
            noCache    : true
        });
        app.use(morgan('combined'))
    }
    else {
        nunjucks.configure('application/views', {
            autoescape : true,
            express    : app
        });
        // create a rotating write stream
        accessLogStream = FileStreamRotator.getStream({
            filename  : __dirname + '/log/access-%DATE%.log',
            frequency : 'daily',
            verbose   : false
        });
        app.use(morgan('combined', {stream: accessLogStream}))
    }

    app.use(bodyParser.json({type: 'application/json', limit: config.post_json_limit}));
    app.use(bodyParser.urlencoded({type: 'application/x-www-form-urlencoded', extended:false}));
    app.use(express.static( __dirname + '/application/public'));
    require('./router')(app);

    var server = app.listen(config.port, function() {
        console.log('Listening on port %d', server.address().port);
    });
}
