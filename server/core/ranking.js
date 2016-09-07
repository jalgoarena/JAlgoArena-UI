var _ = require('lodash');

function ranking(users, submissions) {
    var ranking = [];

    _.forEach(users, function (user) {
        var userSubmissions = _.filter(submissions, function (submission) {
            return submission.userId === user._id;
        });

        var solvedProblems = _.map(userSubmissions, function(submission) {
            return submission.problemId;
        });

        ranking.push(
            rankEntry(user.username, score(userSubmissions), solvedProblems)
        );
    });

    return _.orderBy(ranking, ['score'], ['desc']);
}

function problemRanking(users, submissions, logger) {
    var ranking = [];

    _.forEach(submissions, function (submission) {
        var user = users.filter(function (user) {
            return user._id === submission.userId
        });

        if (user) {
            var username = user[0].username;
            ranking.push({hacker: username, score: score([submission]), elapsed_time: submission.elapsed_time});
        } else {
            logger.error('User does not exist: ' + submission.userId);
        }
    });

    return _.orderBy(ranking, ['elapsed_time']);
}

function score(userSubmissions) {
    var uniqueProblems = _.uniqBy(userSubmissions, 'problemId');

    function timeFactor(elapsedTime) {
        if (elapsedTime > 500) {
            return 1;
        }

        if (elapsedTime > 100) {
            return 3;
        }

        if (elapsedTime > 10) {
            return 5;
        }

        if (elapsedTime >= 1) {
            return 8;
        }

        return 10;
    }

    return _.sumBy(uniqueProblems, function(problem) {
        return problem.level * timeFactor(problem.elapsed_time);
    });
}

function rankEntry(userName, score, solvedProblems) {
    return {
        hacker: userName,
        score,
        solvedProblems
    }
}

module.exports = {ranking, score, problemRanking};