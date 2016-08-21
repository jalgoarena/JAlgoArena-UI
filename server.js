var env = process.env.NODE_ENV || 'dev';
console.log('Env: ' + env);

var serverConfig = require('./server/config/config.js');
var session  = require('express-session');
var NedbSessionStore = require('express-nedb-session')(session);
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var express = require('express');
var port = process.env.PORT || 3000;
var morgan = require('morgan');

var app = express();

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

var sessionOptions = serverConfig(NedbSessionStore);
app.use(cookieParser(sessionOptions.secret));

var userDb = require('./server/newLocalDb.js')('users.db');
require('./server/config/passport.js')(passport, userDb);

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

var submissionDb = require('./server/newLocalDb.js')('submissions.db');
require('./server/routes/index')(app, passport, submissionDb);

if (env === 'dev') {
    console.log('Configuring DEV');
    require('./server/config/devWebpack')(app);

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'assets', req.path));
    });

    app.listen(port, 'localhost', function(err) {
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
