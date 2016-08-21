var authenticationMiddleware = require('../middlewares/authentication.js');

module.exports = function(app, submissionDb) {

    app.post('/submissions', authenticationMiddleware.isLoggedIn, function(req, res) {
        var newSubmission = req.body;

        submissionDb.insert(newSubmission, function (err, newDoc) {
            if (err) {
                return res.json({error: err});
            }

            submissionDb.find({userId: newDoc.userId}, function (err, docs) {
                if (err) {
                    return res.json({error: err});
                }

                return res.json(docs);
            })
        })
    });

    app.get('/submissions/:userId', authenticationMiddleware.isLoggedIn, function(req, res) {
        var userId = req.params.userId;

        submissionDb.find({userId: userId}, function (err, docs) {
            if (err) {
                return res.json({error: err});
            }

            return res.json(docs);
        })
    });
};