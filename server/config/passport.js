var LocalStrategy   = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');

module.exports = function(passport, userDb) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and deserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, {
            id: user.id,
            email: user.email,
            username: user.username
        });
    });

    // used to deserialize the user
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================

    passport.use(
        'local-signup',
        new LocalStrategy({
                usernameField : 'email',
                passwordField : 'password',
                passReqToCallback : true // allows us to pass back the entire request to the callback
            },
            function(req, email, password, done) {
                var username = req.body.username;
                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
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
                                function (err, newDoc) {
                                    userInfo.id = newDoc._id;
                                    done(null, newDoc);
                                });
                        }
                });
            })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================

    passport.use(
        'local-login',
        new LocalStrategy({
                usernameField : 'email',
                passwordField : 'password',
                passReqToCallback : true
            },
            function(req, email, password, done) {
                userDb.findOne({email: email},
                    function (err, doc) {
                        if (err) {
                            return done(err);
                        }

                        if (!doc) {
                            console.log("no user found...");
                            return done(null, false, {error: 'Incorrect login or password.'});
                        }

                        if (!bcrypt.compareSync( password, doc.password)){
                            return done(null, false, {error: 'Incorrect login or password.'});
                        }

                        var userObject  = {
                            id: doc._id,
                            email: doc.email,
                            username: doc.username};
                        return done(null, userObject);
                    }
                );
            })
    );
};
