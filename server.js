var opbeat = require('opbeat').start({
    appId: '92e1be46f0',
    organizationId: 'd9d560ad264b4ccc901d0ca138ba3ca8',
    secretToken: '1179a60b42a3bf26fde64bd76962621cd75a77f7'
});

var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public'), {
    dofiles: 'ignore',
    indes: false
}));
app.use(opbeat.middleware.express());

/**
 * Always serve the same HTML file for all requests
 */
app.get('*', function(req, res, next) {
    console.log('Request: [GET]', req.originalUrl);
    res.sendFile(path.resolve(path.join(__dirname, 'public'), 'index.html'));
    next();
});


/**
 * Error Handling
 */
app.use(function(req, res, next) {
    console.log('404');
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.sendStatus(err.status || 500);
    next();
});

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
    console.log('JAlgoArena UI running on port ' + app.get('port'));
});
