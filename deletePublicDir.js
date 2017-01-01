let del = require('del');

del(['public/**']).then(function () {
    console.log('/public dir is deleted');
});
