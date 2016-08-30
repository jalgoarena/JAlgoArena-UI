var _ = require('lodash');

function ranking(users, submissions) {
    var ranking = [];

    _.forEach(users, function (user) {
        var userSubmissions = _.filter(submissions, function (submission) {
            return submission.userId === user._id;
        });

        var solvedProblems = _.map(_.uniq(userSubmissions, 'problemId'), function(submission) {
            return submission.problemId;
        });

        ranking.push(
            rankEntry(user.username, score(userSubmissions), solvedProblems)
        );
    });

    return _.orderBy(ranking, ['score'], ['desc']);
}

function problemRanking(users, submissions) {
    var ranking = [];

    _.forEach(submissions, function (submission) {
        var username = users.filter(function (user) {
            return user._id === submission.userId
        })[0].username;

        var index = _.indexOf(ranking, _.find(ranking, {hacker: username}));

        var rankingEntry = {hacker: username, score: score([submission]), elapsed_time: submission.elapsed_time};

        if (index === -1) {
            ranking.push(rankingEntry);
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