module.exports = function(app, submissionDb, userDb, ranking, problemRanking) {
    app.get('/ranking/', function(req, res) {

        submissionDb.find({}, function (err, submissions) {
            if (err) {
                return res.json({error: err});
            }

            userDb.find({}, function(err, users) {
                if (err) {
                    return res.send(500).json({error: err});
                }

                res.json(ranking(users, submissions));
            });
        })
    });

    app.get('/ranking/:problemId', function (req, res) {
        submissionDb.find({problemId: req.params.problemId}, function (err, problemSubmissions) {
            if (err) {
                return res.send(500).json({error: err});
            }

            userDb.find({}, function(err, users) {
                if (err) {
                    return res.send(500).json({error: err});
                }

                res.json(problemRanking(users, problemSubmissions));
            });

        })
    })
};
