var LocalStrategy   = require('passport-local').Strategy;
var passportJwt = require('passport-jwt');
var JwtStrategy = passportJwt.Strategy;
var ExtractJwt = passportJwt.ExtractJwt;
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = function(app, passport, userDb) {

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================

    passport.use(
        'local-signup',
        new LocalStrategy({
                usernameField : 'email',
                passwordField : 'password',
                session: false,
                passReqToCallback : true
            },
            function(req, email, password, done) {
                var username = req.body.username;

                userDb.findOne({username: username}, function (err, doc) {
                    if (err) {
                        return done(err);
                    }
                    if (doc) {
                        return done(null, false, {error: 'That username is already being used.'});
                    }

                    userDb.findOne({email: email},
                        function (err, doc) {
                            if (err) {
                                return done(err);
                            }
                            if (doc) {
                                return done(null, false, { error: 'That email is already being used.' });
                            } else {
                                // if there is no user with that email
                                // create the user
                                var salt = bcrypt.genSaltSync(10);
                                var passwordHash = bcrypt.hashSync(password, salt);

                                var userInfo = {
                                    username: username,
                                    email: email,
                                    password: passwordHash
                                };

                                userDb.insert(userInfo,
                                    function (err) {
                                        if (err) {
                                            done(err);
                                        } else {
                                            done(null, true);
                                        }
                                    });
                            }
                        });
                });
            })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================

    passport.use(
        'local-login',
        new LocalStrategy({
                usernameField : 'username',
                passwordField : 'password',
                session: false,
                passReqToCallback : true
            },
            function(req, username, password, done) {
                userDb.findOne({username: username},
                    function (err, doc) {
                        if (err) {
                            return done(err);
                        }

                        if (!doc) {
                            return done(null, false, {error: 'Incorrect login or password.'});
                        }

                        if (!bcrypt.compareSync( password, doc.password)){
                            return done(null, false, {error: 'Incorrect login or password.'});
                        }

                        var userObject  = {
                            id: doc._id,
                            email: doc.email,
                            username: doc.username
                        };
                        return done(null, userObject);
                    }
                );
            })
    );

    // =========================================================================
    // TOKEN ===================================================================
    // =========================================================================

    passport.use(
        new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeader(),
            secretOrKey: app.config.secret
        },
        function(payload, done) {
            userDb.findOne({_id: payload.id},
                {password: 0},
                function(err, user) {
                    if (err) {
                        return done(err, false);
                    }
                    if (user) {
                        var userObject  = {
                            id: user._id,
                            email: user.email,
                            username: user.username
                        };

                        done(null, userObject);
                    } else {
                        done(null, false);
                    }
                }
            )
        })
    );
};
