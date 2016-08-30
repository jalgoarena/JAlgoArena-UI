var router = require('express').Router();

module.exports = function (app, passport, submissionsDb, userDb, ranking, problemRanking) {
    require('./authentication.js')(app, passport);
    require('./submission.js')(app, submissionsDb);
    require('./ranking.js')(app, submissionsDb, userDb, ranking, problemRanking);
    app.use('/', router);
};
