module.exports = function(app) {

    var hello = require('./controllers/hello');
    //router
    app.get('/get', hello.get);

    app.post('/post', hello.post);

    app.get('*', notFound);
};

function notFound(req, res)
{
    res.send('404', 'Page Not Found');
}
