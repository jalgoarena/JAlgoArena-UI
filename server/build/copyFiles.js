module.exports = function(logger) {
    var cpFile = require('cp-file');

    cpFile('assets/index.prod.html', 'public/assets/index.html').then(function () {
        logger.debug('Copied index.html');
    });

    cpFile('assets/app.css', 'public/assets/app.css').then(function () {
        logger.debug('Copied app.css');
    });

    cpFile('assets/favicon.ico', 'public/assets/favicon.ico').then(function () {
        logger.debug('Copied favicon.ico');
    });

    cpFile('assets/img/logo.png', 'public/assets/img/logo.png').then(function () {
        logger.debug('Copied logo.png');
    });

    cpFile('assets/img/profile.png', 'public/assets/img/profile.png').then(function () {
        logger.debug('Copied profile.png');
    });
};