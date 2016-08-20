function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.json({error: "Not signed in"});
}

function addAuthRoute(app, passport, routePath, strategy) {
    app.post(routePath, function(req, res, next) {
        passport.authenticate(strategy, function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.json(info); }
            if (user) {
                req.logIn(user, function(err) {
                    if (err) { return next(err); }
                    return res.json(user);
                });
            }
        })(req, res, next);
    });
}

module.exports = function(app, passport) {
    addAuthRoute(app, passport, "/signup", "local-signup");

    addAuthRoute(app, passport, "/login", "local-login");

    app.post('/logout', isLoggedIn, function(req, res) {
        req.logout();
        req.session.destroy();
        return res.json('logged out :)');
    });

    app.post('/checkSession', function(req, res) {
        var isLoggedIn = req.isAuthenticated();
        if (isLoggedIn) return res.json({
            isLoggedIn: isLoggedIn,
            userObject: {
                username: req.user.username,
                id: req.user.id,
                email: req.user.email
            }
        });
        return res.json({isLoggedIn: isLoggedIn});
    });
};
