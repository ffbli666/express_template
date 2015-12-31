var helloModel  = require('../models/hello');

exports.get = function(req, res) {
    res.send('Got a GET request ' + helloModel.helloWorld());
    console.log(req.query);
};

exports.post = function(req, res) {
    res.send('Got a POST request '  + helloModel.helloWorld());
    console.log(req.body);
};