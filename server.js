var config = require('./server/config/config.js');

var env = config.env;
var port = config.port;
console.log('Env: ' + env);

var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var passport = require('passport');
var express = require('express');

var morgan = require('morgan');
var helmet = require('helmet');

var app = express();
app.config = config;

if (env === 'production') {
    var copyFiles = require('./server/build/copyFiles');
    copyFiles();

    var compression = require('compression');
    app.use(compression());
}

app.use(morgan('tiny'));

if (env === 'production') {
    require('./server/config/opbeat.js')(app);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
helmet(app);

var userDb = require('./server/newLocalDb.js')('users.db');
require('./server/config/passport.js')(app, passport, userDb);

var submissionDb = require('./server/newLocalDb.js')('submissions.db');
require('./server/routes/index')(app, passport, submissionDb, userDb);

if (env === 'dev') {
    console.log('Configuring DEV');
    require('./server/config/devWebpack')(app);

    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, 'assets', 'index.html'));
    });

    app.get('*', function(req, res) {
        if (fs.existsSync(path.join(__dirname, 'assets', req.path))) {
            res.sendFile(path.join(__dirname, 'assets', req.path));
        } else {
            res.sendFile(path.join(__dirname, 'assets', 'index.html'));
        }
    });

    app.listen(port, function(err) {
        if (err) {
            console.log(err);
            return;
        }

        console.log('Listening at http://localhost:' + port);
    });
} else {
    console.log('Configuring PROD');
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

    var host = process.env.HOST || '0.0.0.0';
    var http = require('http');

    const server = http.createServer(app);

    app.use(function (err, req, res, next) {
        console.log(err);
        next(err);
    });

    var errorHandler = require('express-error-handler');
    app.use(errorHandler({server: server}));

    app.listen(port, host, function () {
        console.log('Server started at http://' + host + ':' + port);
    });
}
