var express = require('express');
var app = express();
app.set('view engine','ejs');
app.use('/assets', express.static('assets'));


var studentinfo = require('./routes/studentInfo.js');
var index = require('./routes/index.js')

app.use('/studentInfo',studentinfo);
app.use('/*',index);

app.listen(8080);
