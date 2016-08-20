var router = require('express').Router();

module.exports = function (app, passport) {
    require('./authentication.js')(app, passport);
    app.use('/', router);
};
