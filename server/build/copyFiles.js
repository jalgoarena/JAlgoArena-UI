module.exports = function() {
    var cpFile = require('cp-file');

    cpFile('assets/index.prod.html', 'public/assets/index.html').then(function () {
        console.log('Copied index.html');
    });

    cpFile('assets/app.css', 'public/assets/app.css').then(function () {
        console.log('Copied app.css');
    });

    cpFile('assets/favicon.ico', 'public/assets/favicon.ico').then(function () {
        console.log('Copied favicon.ico');
    });

    cpFile('assets/img/logo.png', 'public/assets/img/logo.png').then(function () {
        console.log('Copied logo.png');
    });

    cpFile('assets/img/profile.png', 'public/assets/img/profile.png').then(function () {
        console.log('Copied profile.png');
    });
};