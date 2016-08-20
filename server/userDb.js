module.exports = function () {
    var Datastore = require('nedb');
    var userDb = new Datastore({filename: 'users.db', autoload: true});
    userDb.loadDatabase(function (err) {
        if (err) {
            console.log(err);
        }
    });

    return userDb;
};