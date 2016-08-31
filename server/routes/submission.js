var passport = require('passport');
var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app, submissionDb) {

    app.post('/submissions', requireAuth, function(req, res) {
        var newSubmission = req.body;

        submissionDb.update(
            {userId: newSubmission.userId, problemId: newSubmission.problemId},
            newSubmission,
            {upsert: true},
            function (err) {
                if (err) {
                    return res.json({error: err});
                }

                submissionDb.find({userId: newSubmission.userId}, function (err, docs) {
                    if (err) {
                        return res.json({error: err});
                    }

                    return res.json(docs);
                });
            }
        );
    });

    app.get('/submissions/:userId', function(req, res) {
        var userId = req.params.userId;

        submissionDb.find({userId: userId}, function (err, docs) {
            if (err) {
                return res.json({error: err});
            }

            return res.json(docs);
        })
    });
};