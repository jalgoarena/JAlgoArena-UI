var Datastore = require('nedb');

module.exports = function (filename) {
    var userDb = new Datastore({filename: filename, autoload: true});
    userDb.loadDatabase(function (err) {
        if (err) {
            console.log(err);
        }
    });

    return userDb;
};