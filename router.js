var hello = require('./application/controllers/hello');

module.exports = function(app) {
    app.get('/hello', function(req, res){
        res.send('Hello World');
    });
    app.get('/get', hello.get);

    app.post('/post', hello.post);

    app.get('/', function(req, res) {
        res.render('index.html', {
            navbar: {index: 'active'}
        });
    });

    app.get('*', notFound);
};

function notFound(req, res)
{
    res.status(404).send('Page Not Found');
}
