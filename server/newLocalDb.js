var Datastore = require('nedb');

module.exports = function (filename, logger) {
    var userDb = new Datastore({filename: filename, autoload: true});
    userDb.loadDatabase(function (err) {
        if (err) {
            logger.error(err);
        } else {
            logger.debug("DB loaded: " + filename);
        }
    });

    return userDb;
};