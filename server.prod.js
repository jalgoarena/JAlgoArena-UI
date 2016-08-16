var opbeat = require('opbeat').start({
    appId: '92e1be46f0',
    organizationId: 'd9d560ad264b4ccc901d0ca138ba3ca8',
    secretToken: '1179a60b42a3bf26fde64bd76962621cd75a77f7'
});

var path = require('path');
var express = require('express');
var port = process.env.PORT || 3000;
var host = process.env.HOST || '0.0.0.0';
var app = express();
var http = require('http');
var compression = require('compression');
var cpFile = require('cp-file');
var errorHandler = require('express-error-handler');
var morgan = require('morgan');

cpFile('assets/index.prod.html', 'public/assets/index.html').then(function () {
    console.log('Copied index.html');
});

cpFile('assets/app.css', 'public/assets/app.css').then(function () {
    console.log('Copied app.css');
});

cpFile('assets/favicon.ico', 'public/assets/favicon.ico').then(function () {
    console.log('Copied favicon.ico');
});

cpFile('assets/img/logo.png', 'public/assets/img/logo.png').then(function () {
    console.log('Copied logo.png');
});

cpFile('assets/img/profile.png', 'public/assets/img/profile.png').then(function () {
    console.log('Copied profile.png');
});

// app.use(compression());
app.use(morgan('tiny'));
app.use(opbeat.middleware.express());

var serveStatic = require('serve-static');
app.use(serveStatic(path.join(__dirname, 'public', 'assets')));

var envs = require('envs');
app.set('environment', envs('NODE_ENV', 'production'));

var routes = function (app) {
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'public', 'assets', 'index.html'));
    });
};

var router = express.Router();
routes(router);
app.use(router);

const server = http.createServer(app);

app.use(function (err, req, res, next) {
    console.log(err);
    next(err);
});

app.use(errorHandler({server: server}));

app.listen(port, host, function () {
    console.log('Server started at http://' + host + ':' + port);
});
