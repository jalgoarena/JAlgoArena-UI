module.exports = function() {
    var cpFile = require('cp-file');

    cpFile('assets/index.prod.html', 'public/assets/index.html');
    cpFile('assets/app.css', 'public/assets/app.css');
    cpFile('assets/favicon.ico', 'public/assets/favicon.ico');
    cpFile('assets/img/logo.png', 'public/assets/img/logo.png');
    cpFile('assets/img/profile.png', 'public/assets/img/profile.png');
};