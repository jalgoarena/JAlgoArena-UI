module.exports = function(app, submissionDb, userDb, ranking, problemRanking) {
    app.get('/ranking/', function(req, res, next) {

        submissionDb.find({}, function (err, submissions) {
            if (err) {
                return next(err);
            }

            userDb.find({}, function(err, users) {
                if (err) {
                    return next(err);
                }

                res.json(ranking(users, submissions));
            });
        })
    });

    app.get('/ranking/:problemId', function (req, res, next) {
        submissionDb.find({problemId: req.params.problemId}, function (err, problemSubmissions) {
            if (err) {
                return next(err);
            }

            userDb.find({}, function(err, users) {
                if (err) {
                    return next(err);
                }

                try {
                    res.json(problemRanking(users, problemSubmissions));
                } catch (err) {
                    next(err);
                }
            });
        })
    });
};
