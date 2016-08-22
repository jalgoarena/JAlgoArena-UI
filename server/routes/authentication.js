

const jwt = require('jsonwebtoken');

module.exports = function(app, passport) {

    var requireAuth = passport.authenticate('jwt', { session: false });

    app.post("/signup", function(req, res, next) {
        passport.authenticate('local-signup', { session: false }, function(err, success, info) {
            if (err) { return next(err); }
            if (!success) { return res.json(info); }
            if (success) {
                return res.json({location: '/login'});
            }
        })(req, res, next);
    });

    app.post('/login', function(req, res, next) {
        passport.authenticate('local-login', { session: false }, function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.json(info); }
            if (user) {
                const token = jwt.sign(user, app.config.secret, {
                    expiresIn: 10080 // in seconds
                });
                return res.status(200).json({ user: user, token: 'JWT ' + token });
            }
        })(req, res, next);
    });

    app.post('/logout', requireAuth, function(req, res) {
        req.logout();
        return res.json('logged out :)');
    });

    app.get('/user', requireAuth, function(req, res) {
        var user = req.user;
        if (user) return res.json({
            username: req.user.username,
            id: req.user.id,
            email: req.user.email
        });
        return res.json({});
    });
};
