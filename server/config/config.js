module.exports = function (NedbSessionStore) {
    return {
        secret: process.env.SECRET || 'l7IOFXseF2V6L4Vmr7zSsDCIpXHGCFug8xFKCjTBW',
        saveUninitialized: false,
        resave: false,
        store: new NedbSessionStore({filename: 'session.db'}),
    }
};