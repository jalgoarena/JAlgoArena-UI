var opbeat = require('opbeat').start({
    appId: '92e1be46f0',
    organizationId: 'd9d560ad264b4ccc901d0ca138ba3ca8',
    secretToken: '1179a60b42a3bf26fde64bd76962621cd75a77f7'
});

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));
app.use(opbeat.middleware.express());

app.listen(app.get('port'), function() {
    console.log('JAlgoArena UI running on port ' + app.get('port'));
});
