var router = require('express').Router();

module.exports = function (app, passport, submissionsDb, userDb, ranking) {
    require('./authentication.js')(app, passport);
    require('./submission.js')(app, submissionsDb);
    require('./ranking.js')(app, submissionsDb, userDb, ranking);
    app.use('/', router);
};
