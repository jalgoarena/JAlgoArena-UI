var router = require('express').Router();

module.exports = function (app, passport, submissionsDb) {
    require('./authentication.js')(app, passport);
    require('./submission.js')(app, submissionsDb);
    app.use('/', router);
};
