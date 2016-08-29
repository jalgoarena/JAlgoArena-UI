var _ = require('lodash');

function ranking(users, submissions) {
    var ranking = [];

    _.forEach(users, function (user) {
        var userSubmissions = _.filter(submissions, function (submission) {
            return submission.userId === user._id;
        });

        ranking.push(
            rankEntry(user.username, score(userSubmissions))
        );
    });

    return _.orderBy(ranking, ['score'], ['desc']);
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

function rankEntry(userName, score) {
    return {
        hacker: userName,
        score
    }
}

module.exports = {ranking, score};