module.exports = function (NedbSessionStore) {
    return {
        secret: process.env.SECRET || 'l7IOFXseF2V6L4Vmr7zSsDCIpXHGCFug8xFKCjTBW',
        saveUninitialized: false,
        resave: false,
        store: new NedbSessionStore({filename: 'session.db'}),
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 2 * 24 * 3600 * 1000, // two days
            secure: false
        }
    }
};