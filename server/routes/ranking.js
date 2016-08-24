var _ = require('lodash');

module.exports = function(app, submissionDb, userDb) {
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

function ranking(users, submissions) {
    var ranking = [];

    _.forEach(users, function (user) {
        var userSubmissions = _.filter(submissions, function (submission) {
            return submission.userId === user._id;
        });

        var submittedProblems = _.map(userSubmissions, function (submission) {
            return submission.result.problemId;
        });

        var score = _.uniq(submittedProblems).length;

        ranking.push(rankEntry(user.username, score));
    });

    return _.sortBy(ranking, function(rankEntry) {
        return rankEntry.score;
    })
}

function rankEntry(userName, score) {
    return {
        hacker: userName,
        score
    }
}
