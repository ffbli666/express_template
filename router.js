var async = require('async');
module.exports = function(app) {
    //router
    app.get('/hello', function(req, res){
        res.send('Hello World');
    });
    
    app.get('*', notFound);
};

function notFound(req, res)
{
    res.send('404', 'Page Not Found');
}
