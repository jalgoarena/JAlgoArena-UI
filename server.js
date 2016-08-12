var opbeat = require('opbeat').start({
    appId: '92e1be46f0',
    organizationId: 'd9d560ad264b4ccc901d0ca138ba3ca8',
    secretToken: '1179a60b42a3bf26fde64bd76962621cd75a77f7'
});

var express = require('express');
var morgan = require('morgan');
var path = require('path');
var compression = require('compression');

var app = express();

app.use(compression());
app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(opbeat.middleware.express());

/**
 * Always serve the same HTML file for all requests
 */
app.get('*', function(req, res) {
    console.log('Request: [GET]', req.originalUrl);
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
    console.log('[PROD] JAlgoArena UI running on port ' + app.get('port'));
});
