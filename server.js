var config = require('./server/config/config.js');

var env = config.env;
var port = config.port;
var logger = require('./server/config/logger.js');

logger.debug('Env: ' + env);

var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var express = require('express');

var morgan = require('morgan');
var helmet = require('helmet');
var serveStatic = require('serve-static');

var app = express();
app.config = config;
var compression = require('compression');
app.use(compression());

app.use(morgan('tiny', {'stream': logger.stream}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
helmet(app);

var userDb = require('./server/newLocalDb.js')('users.db', logger);
require('./server/config/passport.js')(app, passport, userDb);

var ranking = require('./server/core/ranking.js').ranking;
var problemRanking = require('./server/core/ranking').problemRanking;
var submissionDb = require('./server/newLocalDb.js')('submissions.db', logger);
require('./server/routes/index')(app, passport, submissionDb, userDb, ranking, problemRanking);

logger.debug('Configuring: ' + env);

var assetsDir;

if (env == 'production') {
    require('./server/build/copyFiles')(logger);
    assetsDir = path.join(__dirname, 'public', 'assets');
} else {
    require('./server/config/devWebpack')(app, logger);
    assetsDir = path.join(__dirname, 'assets');
}

app.use(serveStatic(assetsDir));

app.get('*', function (req, res) {
    res.sendFile(path.join(assetsDir, 'index.html'));
});

var http = require('http');

const server = http.createServer(app);

app.use(function (err, req, res, next) {
    logger.error(err);
    next(err);
});

var errorHandler = require('express-error-handler');
app.use(errorHandler({server: server}));

app.listen(port, function () {
    logger.info('Server started at http://localhost:' + port);
});
