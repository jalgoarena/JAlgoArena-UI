var serverConfig = require('./server/config/config.js');
var session  = require('express-session');
var NedbSessionStore = require('express-nedb-session')(session);
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var port = process.env.PORT || 3000;
var morgan = require('morgan');

var app = express();
var compiler = webpack(config);

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var sessionOptions = serverConfig(NedbSessionStore);
app.use(cookieParser(sessionOptions.secret));

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo:true,
    publicPath: config.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}));

var Datastore = require('nedb');
var userDb = new Datastore({filename: 'jalgoarena.db', autoload: true});
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
