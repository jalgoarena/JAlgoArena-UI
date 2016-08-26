var config = require('./server/config/config.js');

var env = config.env;
var port = config.port;
var logger = require('./server/config/logger.js');

logger.debug('Env: ' + env);

var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var passport = require('passport');
var express = require('express');

var morgan = require('morgan');
var helmet = require('helmet');

var app = express();
app.config = config;
var compression = require('compression');
app.use(compression());

if (env === 'production') {
    var copyFiles = require('./server/build/copyFiles');
    copyFiles(logger);
}

app.use(morgan('tiny', {'stream': logger.stream}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
helmet(app);

var userDb = require('./server/newLocalDb.js')('users.db', logger);
require('./server/config/passport.js')(app, passport, userDb);

var submissionDb = require('./server/newLocalDb.js')('submissions.db', logger);
require('./server/routes/index')(app, passport, submissionDb, userDb);

if (env === 'dev') {
    logger.debug('Configuring DEV');
    require('./server/config/devWebpack')(app, logger);

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
            logger.error(err);
            return;
        }

        logger.info('Listening at http://localhost:' + port);
    });
} else {
    logger.debug('Configuring PROD');
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
        logger.error(err);
        next(err);
    });

    var errorHandler = require('express-error-handler');
    app.use(errorHandler({server: server}));

    app.listen(port, host, function () {
        logger.info('Server started at http://' + host + ':' + port);
    });
}
