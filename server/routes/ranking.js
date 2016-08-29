module.exports = function(app, submissionDb, userDb, ranking) {
    app.get('/ranking/', function(req, res) {

        submissionDb.find({}, function (err, submissions) {
            if (err) {
                return res.json({error: err});
            }

            userDb.find({}, function(err, users) {
                res.json(ranking(users, submissions));
            });
        })
    });
};
