var env = process.env.NODE_ENV || 'dev';

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
    var cpFile = require('cp-file');

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

    var compression = require('compression');
    app.use(compression());
}

app.use(morgan('tiny'));

if (env === 'production') {
    var opbeat = require('opbeat').start({
        appId: '92e1be46f0',
        organizationId: 'd9d560ad264b4ccc901d0ca138ba3ca8',
        secretToken: '1179a60b42a3bf26fde64bd76962621cd75a77f7'
    });
    app.use(opbeat.middleware.express());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var sessionOptions = serverConfig(NedbSessionStore);
app.use(cookieParser(sessionOptions.secret));

var Datastore = require('nedb');
var userDb = new Datastore({filename: 'users.db', autoload: true});
userDb.loadDatabase(function (err) {
    if (err) {
        console.log(err);
    }
});

require('./server/config/passport.js')(passport, userDb);

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

require('./server/routes/index')(app, passport);


if (env === 'dev') {
    var config = require('./webpack.config.dev');
    var webpack = require('webpack');
    var compiler = webpack(config);

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));

    app.use(require("webpack-hot-middleware")(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    }));

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
