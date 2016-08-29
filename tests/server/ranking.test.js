var chai = require('chai');
var _ = require('lodash');

var expect = chai.expect;

var submission = {"problemId":"fib", "level": 1, "elapsed_time":583.959489,"userId":"3VCeeEWmcPIyAfaj"};

describe('Ranking', function() {
    describe('score(submissions)', function() {
        var score = require('../../server/core/ranking.js').score;

        var testCases = [
            {elapsedTime: 0, score: 10},
            {elapsedTime: 1, score: 8},
            {elapsedTime: 11, score: 5},
            {elapsedTime: 101, score: 3},
            {elapsedTime: 501, score: 1}
        ];

        testCases.forEach(function(testCase) {
            it('should return ' + testCase.score + ' points when 1 easy problem is solved in ' + testCase.elapsedTime + ' ms', function() {
                var submissions = [_.assign(submission, {"elapsed_time": testCase.elapsedTime})];
                var points = score(submissions);
                expect(points).to.equal(testCase.score);
            });
        });
    });

    it('should return 25 points for 2 problems solved, 1 easy solved in 15 ms, and 1 mid solved in 0 ms', function() {
        var ranking = require('../../server/core/ranking.js').ranking;
        var submissions = [_.assign({}, submission, {level: 2, elapsed_time: 0, problemId: 'a'}), _.assign({}, submission, {level: 1, elapsed_time: 15.0})];
        var users = [{_id: submission.userId, username: 'dummy'}];

        var points = ranking(users, submissions)[0].score;
        expect(points).to.equal(25);
    });

    it('should return 3 points for twice solved easy problem considering last result, 1 solved in 155 ms, and another solved in 0 ms', function() {
        var ranking = require('../../server/core/ranking.js').ranking;
        var submissions = [_.assign({}, submission, {elapsed_time: 155.0}), _.assign({}, submission, {elapsed_time: 0})];
        var users = [{_id: submission.userId, username: 'dummy'}];

        var points = ranking(users, submissions)[0].score;
        expect(points).to.equal(3);
    });
});