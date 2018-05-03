module.exports = function() {
    const fs = require('fs-extra');
    fs.copySync('./assets/index.prod.html', 'public/assets/index.html');
    fs.copySync('./assets/app.css', 'public/assets/app.css');
    fs.copySync('./assets/favicon.ico', 'public/assets/favicon.ico');
    fs.copySync('./assets/img/logo.png', 'public/assets/img/logo.png');
    fs.copySync('./assets/img/profile.png', 'public/assets/img/profile.png');
};